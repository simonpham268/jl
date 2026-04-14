import type { ApiClient } from '../base/ApiClient';
import type { ApiResponse, PaginatedResponse } from '../base/ApiResponse';
import { CUSTOMER_ENDPOINTS } from '../endpoints/customer.endpoints';
import type { Customer, CreateCustomerRequest, CreateCustomerResponse, UpdateCustomerRequest } from '../models/Customer';
import { CREATE_CUSTOMER_REQUIRED_FIELDS } from '../models/Customer';
import { buildFormData } from '../utils/formBuilder';

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
    const form = buildFormData(data, CREATE_CUSTOMER_REQUIRED_FIELDS);
    return this.client.post<CreateCustomerResponse>(CUSTOMER_ENDPOINTS.CREATE, { form });
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
