import type { ApiClient } from '../base/ApiClient';
import type { ApiResponse, PaginatedResponse } from '../base/ApiResponse';
import { QUOTE_ENDPOINTS } from '../endpoints/quote.endpoints';
import type { Quote, CreateQuoteRequest, CreateQuoteResponse, UpdateQuoteRequest } from '../models/Quote';
import { CREATE_QUOTE_REQUIRED_FIELDS } from '../models/Quote';
import { buildFormData } from '../utils/formBuilder';

export interface QuoteListParams {
    page?: number;
    pageSize?: number;
    customerId?: string | number;
    siteId?: string | number;
    status?: string;
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export class QuoteService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
    this.client.setHeader('content-type', 'application/x-www-form-urlencoded');
  }

  async getQuotes(params?: QuoteListParams): Promise<ApiResponse<PaginatedResponse<Quote>>> {
    return this.client.get<PaginatedResponse<Quote>>(QUOTE_ENDPOINTS.LIST, {
      params: params as Record<string, string>
    });
  }

  async getQuoteById(id: string | number): Promise<ApiResponse<Quote>> {
    return this.client.get<Quote>(QUOTE_ENDPOINTS.GET_BY_ID(id));
  }

  async getQuotesByCustomer(customerId: string | number): Promise<ApiResponse<Quote[]>> {
    return this.client.get<Quote[]>(QUOTE_ENDPOINTS.GET_BY_CUSTOMER(customerId));
  }

  async getQuotesBySite(siteId: string | number): Promise<ApiResponse<Quote[]>> {
    return this.client.get<Quote[]>(QUOTE_ENDPOINTS.GET_BY_SITE(siteId));
  }

  async createQuote(data: CreateQuoteRequest): Promise<ApiResponse<CreateQuoteResponse>> {
    const form = buildFormData(data, CREATE_QUOTE_REQUIRED_FIELDS);
    return this.client.post<CreateQuoteResponse>(QUOTE_ENDPOINTS.CREATE, { form });
  }

  async updateQuote(id: string | number, data: UpdateQuoteRequest): Promise<ApiResponse<Quote>> {
    return this.client.put<Quote>(QUOTE_ENDPOINTS.UPDATE(id), {
      data
    });
  }

  async deleteQuote(id: string | number): Promise<ApiResponse<void>> {
    return this.client.delete<void>(QUOTE_ENDPOINTS.DELETE(id));
  }

  async searchQuotes(searchTerm: string, customerId?: string | number, siteId?: string | number): Promise<ApiResponse<Quote[]>> {
    const params: Record<string, string> = { searchTerm };

    if (customerId) params.customerId = String(customerId);
    if (siteId) params.siteId = String(siteId);
    return this.client.get<Quote[]>(QUOTE_ENDPOINTS.SEARCH, { params });
  }

}
