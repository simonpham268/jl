import type { ApiClient } from '../base/ApiClient';
import type { ApiResponse, PaginatedResponse } from '../base/ApiResponse';
import { PPM_QUOTE_ENDPOINTS } from '../endpoints/ppm-quote.endpoints';
import type { PPMQuote, CreatePPMQuoteRequest, CreatePPMQuoteResponse, UpdatePPMQuoteRequest } from '../models/PPMQuote';
import { CREATE_PPM_QUOTE_REQUIRED_FIELDS } from '../models/PPMQuote';
import { buildFormData } from '../utils/formBuilder';

export interface PPMQuoteListParams {
    page?: number;
    pageSize?: number;
    customerId?: string | number;
    siteId?: string | number;
    status?: string;
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export class PPMQuoteService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
    this.client.setHeader('content-type', 'application/x-www-form-urlencoded');
  }

  async getPPMQuotes(params?: PPMQuoteListParams): Promise<ApiResponse<PaginatedResponse<PPMQuote>>> {
    return this.client.get<PaginatedResponse<PPMQuote>>(PPM_QUOTE_ENDPOINTS.LIST, {
      params: params as Record<string, string>
    });
  }

  async getPPMQuoteById(id: string | number): Promise<ApiResponse<PPMQuote>> {
    return this.client.get<PPMQuote>(PPM_QUOTE_ENDPOINTS.GET_BY_ID(id));
  }

  async getPPMQuotesByCustomer(customerId: string | number): Promise<ApiResponse<PPMQuote[]>> {
    return this.client.get<PPMQuote[]>(PPM_QUOTE_ENDPOINTS.GET_BY_CUSTOMER(customerId));
  }

  async getPPMQuotesBySite(siteId: string | number): Promise<ApiResponse<PPMQuote[]>> {
    return this.client.get<PPMQuote[]>(PPM_QUOTE_ENDPOINTS.GET_BY_SITE(siteId));
  }

  async createPPMQuote(data: CreatePPMQuoteRequest): Promise<ApiResponse<CreatePPMQuoteResponse>> {
    const form = buildFormData(data, CREATE_PPM_QUOTE_REQUIRED_FIELDS);
    return this.client.post<CreatePPMQuoteResponse>(PPM_QUOTE_ENDPOINTS.CREATE, { form });
  }

  async updatePPMQuote(id: string | number, data: UpdatePPMQuoteRequest): Promise<ApiResponse<PPMQuote>> {
    return this.client.put<PPMQuote>(PPM_QUOTE_ENDPOINTS.UPDATE(id), {
      data
    });
  }

  async deletePPMQuote(id: string | number): Promise<ApiResponse<void>> {
    return this.client.delete<void>(PPM_QUOTE_ENDPOINTS.DELETE(id));
  }

  async searchPPMQuotes(searchTerm: string, customerId?: string | number, siteId?: string | number): Promise<ApiResponse<PPMQuote[]>> {
    const params: Record<string, string> = { searchTerm };

    if (customerId) params.customerId = String(customerId);
    if (siteId) params.siteId = String(siteId);
    return this.client.get<PPMQuote[]>(PPM_QUOTE_ENDPOINTS.SEARCH, { params });
  }
}
