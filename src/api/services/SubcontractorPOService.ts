import type { ApiClient } from '../base/ApiClient';
import { SUBCONTRACTOR_PO_ENDPOINTS, SUBCONTRACTOR_ENDPOINTS } from '../endpoints/subcontractor-po.endpoints';
import { TAX_CODE_ENDPOINTS } from '../endpoints/purchase-order.endpoints';

const JSON_HEADER = { 'content-type': 'application/json' };

const ddmmyyyy = (d: Date) =>
  `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;

export class SubcontractorPOService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getFirstTaxCodeId(): Promise<string> {
    const res = await this.client.get<any[]>(TAX_CODE_ENDPOINTS.GET_ALL);
    const id = Array.isArray(res.body) ? res.body[0]?.Id : undefined;
    if (!id) throw new Error(`Could not get first tax code: status=${res.status} body=${JSON.stringify(res.body)}`);
    return String(id);
  }

  async getFirstSubcontractorId(): Promise<string> {
    const res = await this.client.post<any>(SUBCONTRACTOR_ENDPOINTS.SEARCH, {
      data: { SearchTerm: '', IncludeInactive: false, OrderBy: '0' },
      headers: JSON_HEADER,
    });
    const id = res.body?.AdditionalData?.Result?.[0]?.Id;
    if (!id) throw new Error(`Could not get first subcontractor: status=${res.status} body=${JSON.stringify(res.body)}`);
    return String(id);
  }

  async createPO(jobNumericId: string, subcontractorId: string): Promise<string> {
    const tomorrow = ddmmyyyy(new Date(Date.now() + 86400000));
    const res = await this.client.post<any>(SUBCONTRACTOR_PO_ENDPOINTS.CREATE, {
      form: {
        JobId: jobNumericId,
        SubContractorId: subcontractorId,
        SubContractorId_input: '',
        EstimatedCompletionDate: tomorrow,
        AccountNumber: '',
        DeliveryName: 'Job Site',
        DeliveryAddress1: '',
        DeliveryAddress2: '',
        DeliveryAddress3: '',
        DeliveryAddress4: '',
        DeliveryPostcode: '',
        DeliveryTelephone: '',
        AssignContactId: '',
        AssignContactName: '',
        AssignContactEmail: '',
        AssignContactTelephone: '',
      },
    });
    const url: string | undefined = res.body?.redirectUrl;
    if (!url) throw new Error(`Could not create Sub PO: status=${res.status} body=${JSON.stringify(res.body)}`);
    return url.split('/').pop()!;
  }

  async addItem(subPoId: string, subcontractorId: string, pricePerUnit: number, description: string): Promise<void> {
    const taxCodeId = await this.getFirstTaxCodeId();
    const res = await this.client.post<any>(SUBCONTRACTOR_PO_ENDPOINTS.SAVE_ITEM, {
      form: {
        Id: '',
        PurchaseOrderId: subPoId,
        SubContractorId: subcontractorId,
        IsNew: 'true',
        Description: description,
        ListPrice: String(pricePerUnit),
        TaxCodeId: taxCodeId,
        TaxCodeId_input: '',
      },
    });
    if (!res.body?.success) throw new Error(`Could not add Sub PO item: status=${res.status} body=${JSON.stringify(res.body)}`);
  }

  async completeLine(subPoId: string): Promise<void> {
    const res = await this.client.post<any>(SUBCONTRACTOR_PO_ENDPOINTS.COMPLETE_LINE, {
      form: {
        Id: '',
        PurchaseOrderId: subPoId,
        CompleteAll: 'true',
        CompleteDate: ddmmyyyy(new Date()),
        SetJobComplete: 'false',
      },
    });
    if (!res.ok) throw new Error(`Could not complete Sub PO: status=${res.status} body=${JSON.stringify(res.body)}`);
  }
}
