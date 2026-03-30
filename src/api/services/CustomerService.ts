import type { ApiClient } from '../base/ApiClient';
import type { ApiResponse, PaginatedResponse } from '../base/ApiResponse';
import { CUSTOMER_ENDPOINTS } from '../endpoints/customer.endpoints';
import type { Customer, CreateCustomerRequest, CreateCustomerResponse, UpdateCustomerRequest } from '../models/Customer';

export interface CustomerListParams {
    page?: number;
    pageSize?: number;
    searchTerm?: string;
    customerTypeId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export class CustomerService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
    this.client.setHeader('content-type', 'application/x-www-form-urlencoded');
  }

  async getCustomers(params?: CustomerListParams): Promise<ApiResponse<PaginatedResponse<Customer>>> {
    return this.client.get<PaginatedResponse<Customer>>(CUSTOMER_ENDPOINTS.LIST, {
      params: params as Record<string, string>
    });
  }

  async getCustomerById(id: string | number): Promise<ApiResponse<Customer>> {
    return this.client.get<Customer>(CUSTOMER_ENDPOINTS.GET_BY_ID(id));
  }

  async createCustomer(data: CreateCustomerRequest): Promise<ApiResponse<CreateCustomerResponse>> {
    const form: Record<string, string | number> = {
      Name: data.Name,
    };

    // Add optional fields if they exist
    if (data.CustomerTypeId) form.CustomerTypeId = data.CustomerTypeId;
    if (data.CustomReference) form.CustomReference = data.CustomReference;
    if (data.AccountNumber) form.AccountNumber = data.AccountNumber;
    if (data.SellingRateId) form.SellingRateId = data.SellingRateId;
    if (data.AccountManagerId) form.AccountManagerId = data.AccountManagerId;
    if (data.IsProspectCustomer !== undefined) form.IsProspectCustomer = data.IsProspectCustomer ? 'true' : 'false';

    // Address fields
    if (data.Address1) form.Address1 = data.Address1;
    if (data.Address2) form.Address2 = data.Address2;
    if (data.Address3) form.Address3 = data.Address3;
    if (data.Address4) form.Address4 = data.Address4;
    if (data.Postcode) form.Postcode = data.Postcode;
    if (data.FullTelephone) form.FullTelephone = data.FullTelephone;
    if (data.Latitude) form.Latitude = data.Latitude;
    if (data.Longitude) form.Longitude = data.Longitude;

    // Contact fields
    if (data.ContactFirstName) form.ContactFirstName = data.ContactFirstName;
    if (data.ContactLastName) form.ContactLastName = data.ContactLastName;
    if (data.FullContactTelephone) form.FullContactTelephone = data.FullContactTelephone;
    if (data.ContactEmail) form.ContactEmail = data.ContactEmail;
    if (data.ContactPosition) form.ContactPosition = data.ContactPosition;    return this.client.post<CreateCustomerResponse>(CUSTOMER_ENDPOINTS.CREATE, { form });
  }

  async updateCustomer(id: string | number, data: UpdateCustomerRequest): Promise<ApiResponse<Customer>> {
    return this.client.put<Customer>(CUSTOMER_ENDPOINTS.UPDATE(id), {
      data
    });
  }

  async deleteCustomer(id: string | number): Promise<ApiResponse<void>> {
    return this.client.delete<void>(CUSTOMER_ENDPOINTS.DELETE(id));
  }

  async searchCustomers(searchTerm: string): Promise<ApiResponse<Customer[]>> {
    return this.client.get<Customer[]>(CUSTOMER_ENDPOINTS.SEARCH, {
      params: { searchTerm }
    });
  }
}
