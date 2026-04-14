import type { ApiClient } from '../base/ApiClient';
import type { ApiResponse, PaginatedResponse } from '../base/ApiResponse';
import { SITE_ENDPOINTS } from '../endpoints/site.endpoints';
import type { Site, CreateSiteRequest, CreateSiteResponse, UpdateSiteRequest } from '../models/Site';
import { CREATE_SITE_REQUIRED_FIELDS } from '../models/Site';
import { buildFormData } from '../utils/formBuilder';

export interface SiteListParams {
    page?: number;
    pageSize?: number;
    customerId?: string | number;
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export class SiteService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
    this.client.setHeader('content-type', 'application/x-www-form-urlencoded');
  }

  async getSites(params?: SiteListParams): Promise<ApiResponse<PaginatedResponse<Site>>> {
    return this.client.get<PaginatedResponse<Site>>(SITE_ENDPOINTS.LIST, {
      params: params as Record<string, string>
    });
  }

  async getSiteById(id: string | number): Promise<ApiResponse<Site>> {
    return this.client.get<Site>(SITE_ENDPOINTS.GET_BY_ID(id));
  }

  async getSitesByCustomer(customerId: string | number): Promise<ApiResponse<Site[]>> {
    return this.client.get<Site[]>(SITE_ENDPOINTS.GET_BY_CUSTOMER(customerId));
  }

  async createSite(data: CreateSiteRequest): Promise<ApiResponse<CreateSiteResponse>> {
    const form = buildFormData(data, CREATE_SITE_REQUIRED_FIELDS);
    return this.client.post<CreateSiteResponse>(SITE_ENDPOINTS.CREATE, { form });
  }

  async updateSite(id: string | number, data: UpdateSiteRequest): Promise<ApiResponse<Site>> {
    return this.client.put<Site>(SITE_ENDPOINTS.UPDATE(id), {
      data
    });
  }

  async deleteSite(id: string | number): Promise<ApiResponse<void>> {
    return this.client.delete<void>(SITE_ENDPOINTS.DELETE(id));
  }

  async searchSites(searchTerm: string, customerId?: string | number): Promise<ApiResponse<Site[]>> {
    const params: Record<string, string> = { searchTerm };

    if (customerId) params.customerId = String(customerId);
    return this.client.get<Site[]>(SITE_ENDPOINTS.SEARCH, { params });
  }
}
