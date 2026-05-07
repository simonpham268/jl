import type { ApiClient } from '../base/ApiClient';
import { PURCHASE_ORDER_ENDPOINTS, SUPPLIER_ENDPOINTS, TAX_CODE_ENDPOINTS } from '../endpoints/purchase-order.endpoints';

const JSON_HEADER = { 'content-type': 'application/json' };

const ddmmyyyy = (d: Date) =>
  `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;

export class PurchaseOrderService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getFirstSupplierId(): Promise<string> {
    const res = await this.client.post<any>(SUPPLIER_ENDPOINTS.SEARCH, {
      form: {
        SearchTerm: '',
        PageIndex: '1',
        PageSize: '50',
        pageSize: '50',
        OrderBy: '0',
        IncludeInactive: 'false',
      },
    });
    const id = res.body?.AdditionalData?.Suppliers?.[0]?.Id;
    if (!id) throw new Error(`Could not get first supplier: status=${res.status} body=${JSON.stringify(res.body)}`);
    return id;
  }

  async getFirstTaxCodeId(): Promise<string> {
    const res = await this.client.get<any[]>(TAX_CODE_ENDPOINTS.GET_ALL);
    const id = Array.isArray(res.body) ? res.body[0]?.Id : undefined;
    if (!id) throw new Error(`Could not get first tax code: status=${res.status} body=${JSON.stringify(res.body)}`);
    return String(id);
  }

  async createPO(jobNumericId: string, supplierId: string): Promise<string> {
    const res = await this.client.post<any>(PURCHASE_ORDER_ENDPOINTS.CREATE, {
      form: {
        JobId: jobNumericId,
        SupplierId: supplierId,
        SupplierId_input: '',
        Name: '',
        DeliveryName: 'Job Site',
        DeliveryAddress1: '',
        DeliveryAddress2: '',
        DeliveryAddress3: '',
        DeliveryAddress4: '',
        DeliveryPostcode: '',
        DeliveryTelephone: '',
        Address1: '',
        Address2: '',
        Address3: '',
        Address4: '',
        Postcode: '',
        Telephone: '',
        FullTelephone: '',
        DeliveryAddressType: 'JOB',
        AccountNumber: '',
        EstimatedDeliveryDate: '',
      },
    });
    const url: string | undefined = res.body?.redirectUrl;
    if (!url) throw new Error(`Could not create Supplier PO: status=${res.status} body=${JSON.stringify(res.body)}`);
    return url.split('/').pop()!;
  }

  async addLineItem(poId: string, supplierId: string, pricePerUnit: number, description: string): Promise<void> {
    const taxCodeId = await this.getFirstTaxCodeId();
    const res = await this.client.post<any>(PURCHASE_ORDER_ENDPOINTS.ADD_ITEM, {
      data: {
        PurchaseOrders: [{
          IsNew: true,
          PurchaseOrderType: 'Job',
          ForEquipmentUse: false,
          Quantity: 1,
          ListPrice: pricePerUnit,
          Discount: 0,
          Description: description,
          TagIds: [],
          UpdateItemPrice: false,
          SupplierId: supplierId,
          TaxCodeId: taxCodeId,
          SourcePrice: 1,
          LibraryType: 1,
          HireRate: 0,
          MarkupPercent: 0,
          MarkupValue: 0,
          CrossHireRate: 0,
          PurchaseOrderId: poId,
          WeightDistribution: [],
        }],
      },
      headers: JSON_HEADER,
    });
    if (!res.body?.success) throw new Error(`Could not add PO line item: status=${res.status} body=${JSON.stringify(res.body)}`);
  }

  async resolvePurchaseOrder(poId: string, reason: string = 'Resolved'): Promise<void> {
    const res = await this.client.post<any>(PURCHASE_ORDER_ENDPOINTS.RESOLVE, {
      form: { PurchaseOrderId: poId, Reason: reason },
    });
    if (!res.ok) throw new Error(`Could not resolve PO ${poId}: status=${res.status} body=${JSON.stringify(res.body)}`);
  }

  async deliverLine(poId: string): Promise<void> {
    const res = await this.client.post<any>(PURCHASE_ORDER_ENDPOINTS.DELIVER_LINE, {
      form: {
        Id: '',
        PurchaseOrderId: poId,
        DeliverAll: 'true',
        DeliverDate: ddmmyyyy(new Date()),
        QuantityDelivered: '1',
        PurchaseOrderType: '1',
        ChangeJobStatus: 'false',
        PassDiscount: 'false',
      },
    });
    if (!res.ok || res.body?.success === false) throw new Error(`Could not deliver PO line: status=${res.status} body=${JSON.stringify(res.body)}`);
  }
}
