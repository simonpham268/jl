import type { ApiClient } from '../base/ApiClient';
import { INVOICE_ENDPOINTS } from '../endpoints/invoice.endpoints';
import { TAX_CODE_ENDPOINTS } from '../endpoints/purchase-order.endpoints';

const ddmmyyyy = (d: Date) =>
  `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;

export class InvoiceService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  private async getFirstTaxCodeId(): Promise<string> {
    const res = await this.client.get<any[]>(TAX_CODE_ENDPOINTS.GET_ALL);
    const id = Array.isArray(res.body) ? res.body[0]?.Id : undefined;
    if (!id) throw new Error(`Could not get first tax code: status=${res.status} body=${JSON.stringify(res.body)}`);
    return String(id);
  }

  private async getPOLineIds(poId: string): Promise<string[]> {
    const res = await this.client.get<any>(INVOICE_ENDPOINTS.GET_PO_LINE_ITEMS, {
      params: { PurchaseOrderId: poId },
    });
    const items: any[] = res.body?.AdditionalData ?? [];
    if (!Array.isArray(items) || items.length === 0)
      throw new Error(`No PO line items found for poId=${poId}: status=${res.status} body=${JSON.stringify(res.body)}`);
    return items.map((item: any) => String(item.Id));
  }

  async createSupplierPOInvoice(poId: string, amount: number): Promise<void> {
    const lineIds = await this.getPOLineIds(poId);

    const form: Record<string, string | number | boolean> = {
      PurchaseOrderId: poId,
      IsNew: 'true',
      Type: '0',
      InvoiceNumber: `INV-${Date.now()}`,
      Date: ddmmyyyy(new Date()),
      Reference: '',
      IsMultiJobPO: 'false',
    };

    lineIds.forEach((lineId, i) => {
      form[`Items[${i}][POLineId]`] = lineId;
      form[`Items[${i}][InvoiceQuantity]`] = '1.00';
      form[`Items[${i}][InvoicePrice]`] = amount;
    });

    const res = await this.client.post<any>(INVOICE_ENDPOINTS.SAVE_SUPPLIER, { form });
    if (!res.body?.success) throw new Error(`Could not create Supplier invoice: status=${res.status} body=${JSON.stringify(res.body)}`);
  }

  async createCustomerInvoice(jobId: string, amount: number): Promise<string> {
    const headerRes = await this.client.post<any>(INVOICE_ENDPOINTS.CREATE_CUSTOMER_INVOICE, {
      form: { JobId: jobId },
    });
    const redirectUrl: string | undefined = headerRes.body?.redirectUrl;
    if (!redirectUrl) throw new Error(`Could not create customer invoice header: status=${headerRes.status} body=${JSON.stringify(headerRes.body)}`);
    const invoiceId = redirectUrl.split('/').pop()!;

    const taxCodeId = await this.getFirstTaxCodeId();
    const lineRes = await this.client.post<any>(INVOICE_ENDPOINTS.SAVE_CUSTOMER_INVOICE_LINE, {
      form: {
        Id: '',
        InvoiceId: invoiceId,
        Description: `Invoice line ${Date.now()}`,
        PricePerUnit: String(amount),
        Quantity: '1',
        TaxCodeId_input: '',
        TaxCodeId: taxCodeId,
        NominalCodeId_input: '',
        NominalCodeId: '',
        IsInvoiceApproved: 'false',
      },
    });
    if (!lineRes.body?.success) throw new Error(`Could not save customer invoice line: status=${lineRes.status} body=${JSON.stringify(lineRes.body)}`);

    const approveRes = await this.client.post<any>(`${INVOICE_ENDPOINTS.APPROVE_CUSTOMER_INVOICE}/${invoiceId}`, { data: {} });
    if (!approveRes.ok) throw new Error(`Could not approve customer invoice ${invoiceId}: status=${approveRes.status} body=${JSON.stringify(approveRes.body)}`);

    return invoiceId;
  }

  private async getFirstCreditReasonId(): Promise<string> {
    const res = await this.client.get<any>(INVOICE_ENDPOINTS.GET_CREDIT_REASONS, {
      params: { SearchTerm: '' },
    });
    const id = res.body?.AdditionalData?.CreditReasons?.[0]?.Id;
    if (!id) throw new Error(`Could not get first credit reason: status=${res.status} body=${JSON.stringify(res.body)}`);
    return String(id);
  }

  private async getExistingCreditLineIds(creditId: string): Promise<string[]> {
    const { text } = await this.client.getText(INVOICE_ENDPOINTS.GET_CREDIT_LINES, {
      params: { creditId },
    });
    // Response embeds invoiceCreditStandardModel JSON in a script tag with a Lines array
    const linesMatch = text.match(/"Lines"\s*:\s*(\[[\s\S]*?\])\s*,\s*"IsCreditApproved"/);
    if (!linesMatch) return [];
    const lines: { Id: number }[] = JSON.parse(linesMatch[1]);
    return lines.map(l => String(l.Id));
  }

  async createCreditInvoice(originalInvoiceId: string, amount: number): Promise<void> {
    const headerRes = await this.client.post<any>(
      `${INVOICE_ENDPOINTS.CREATE_CREDIT_INVOICE}?invoiceId=${originalInvoiceId}`,
      { form: {} },
    );
    const redirectUrl: string | undefined = headerRes.body?.redirectUrl;
    if (!redirectUrl) throw new Error(`Could not create credit invoice: status=${headerRes.status} body=${JSON.stringify(headerRes.body)}`);
    const creditId = redirectUrl.split('/').pop()!;

    const creditReasonId = await this.getFirstCreditReasonId();
    const notesRes = await this.client.post<any>(INVOICE_ENDPOINTS.EDIT_CREDIT_NOTES, {
      form: { Id: creditId, Reason: '', Notes: '', CreditReasonId: creditReasonId },
    });
    if (!notesRes.body?.success) throw new Error(`Could not set credit reason: status=${notesRes.status} body=${JSON.stringify(notesRes.body)}`);

    const existingLineIds = await this.getExistingCreditLineIds(creditId);
    for (const lineId of existingLineIds) {
      const deleteRes = await this.client.post<any>(
        `${INVOICE_ENDPOINTS.DELETE_CREDIT_LINE}?id=${lineId}&creditId=${creditId}`,
        { form: {} },
      );
      if (!deleteRes.body?.success) throw new Error(`Could not delete credit line ${lineId}: status=${deleteRes.status} body=${JSON.stringify(deleteRes.body)}`);
    }

    const taxCodeId = await this.getFirstTaxCodeId();
    const lineRes = await this.client.post<any>(INVOICE_ENDPOINTS.SAVE_CREDIT_INVOICE_LINE, {
      form: {
        Id: '',
        CreditId: creditId,
        Description: `Credit note for invoice ${originalInvoiceId}`,
        PricePerUnit: String(amount),
        Quantity: '1',
        TaxCodeId_input: '',
        TaxCodeId: taxCodeId,
        NominalCodeId_input: '',
        NominalCodeId: '',
        IsInvoiceApproved: 'false',
      },
    });
    if (!lineRes.body?.success) throw new Error(`Could not save credit line: status=${lineRes.status} body=${JSON.stringify(lineRes.body)}`);

    const approveRes = await this.client.post<any>(INVOICE_ENDPOINTS.APPROVE_CREDIT_INVOICE, {
      form: { Id: creditId },
    });
    if (!approveRes.ok || approveRes.body?.success === false) {
      throw new Error(`Could not approve credit invoice ${creditId}: status=${approveRes.status} body=${JSON.stringify(approveRes.body)}`);
    }
  }

  async createSubcontractorPOInvoice(subPoId: string, amount: number): Promise<void> {
    const headerRes = await this.client.post<any>(INVOICE_ENDPOINTS.SAVE_SUBCONTRACTOR, {
      form: {
        Id: '',
        PurchaseOrderId: subPoId,
        IsNew: 'true',
        Type: 'Invoice',
        InvoiceNumber: `INV-${Date.now()}`,
        Date: ddmmyyyy(new Date()),
        Reference: '',
      },
    });
    const redirectUrl: string | undefined = headerRes.body?.redirectUrl;
    if (!redirectUrl) throw new Error(`Could not create Sub invoice header: status=${headerRes.status} body=${JSON.stringify(headerRes.body)}`);
    const invoiceId = redirectUrl.split('/').pop()!;

    const taxCodeId = await this.getFirstTaxCodeId();
    const lineRes = await this.client.post<any>(INVOICE_ENDPOINTS.SAVE_SUBCONTRACTOR_LINE, {
      form: {
        Id: '',
        SubContractorInvoiceId: invoiceId,
        PurchaseOrderId: subPoId,
        Type: 'POInvoice',
        Description: '',
        PricePerUnit: String(amount),
        TaxCodeId_input: '',
        TaxCodeId: taxCodeId,
        NominalCodeId_input: '',
        NominalCodeId: '',
        CornfirmOption: '',
      },
    });
    if (!lineRes.body?.success) throw new Error(`Could not add Sub invoice line: status=${lineRes.status} body=${JSON.stringify(lineRes.body)}`);
  }
}
