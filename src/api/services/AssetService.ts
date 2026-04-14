import type { ApiClient } from '../base/ApiClient';
import type { ApiResponse, PaginatedResponse } from '../base/ApiResponse';
import { ASSET_ENDPOINTS } from '../endpoints/asset.endpoints';
import type { Asset, CreateAssetRequest, CreateAssetResponse, UpdateAssetRequest } from '../models/Asset';
import { CREATE_ASSET_REQUIRED_FIELDS } from '../models/Asset';
import { buildFormData } from '../utils/formBuilder';

export interface AssetListParams {
    page?: number;
    pageSize?: number;
    customerId?: string | number;
    siteId?: string | number;
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export class AssetService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
    this.client.setHeader('content-type', 'application/x-www-form-urlencoded');
  }

  async getAssets(params?: AssetListParams): Promise<ApiResponse<PaginatedResponse<Asset>>> {
    return this.client.get<PaginatedResponse<Asset>>(ASSET_ENDPOINTS.LIST, {
      params: params as Record<string, string>
    });
  }

  async getAssetById(id: string | number): Promise<ApiResponse<Asset>> {
    return this.client.get<Asset>(ASSET_ENDPOINTS.GET_BY_ID(id));
  }

  async getAssetsBySite(siteId: string | number): Promise<ApiResponse<Asset[]>> {
    return this.client.get<Asset[]>(ASSET_ENDPOINTS.GET_BY_SITE(siteId));
  }

  async getAssetsByCustomer(customerId: string | number): Promise<ApiResponse<Asset[]>> {
    return this.client.get<Asset[]>(ASSET_ENDPOINTS.GET_BY_CUSTOMER(customerId));
  }

  async createAsset(data: CreateAssetRequest): Promise<ApiResponse<CreateAssetResponse>> {
    const form = buildFormData(data, CREATE_ASSET_REQUIRED_FIELDS);
    return this.client.post<CreateAssetResponse>(ASSET_ENDPOINTS.CREATE, { form });
  }

  async updateAsset(id: string | number, data: UpdateAssetRequest): Promise<ApiResponse<Asset>> {
    return this.client.put<Asset>(ASSET_ENDPOINTS.UPDATE(id), {
      data
    });
  }

  async deleteAsset(id: string | number): Promise<ApiResponse<void>> {
    return this.client.delete<void>(ASSET_ENDPOINTS.DELETE(id));
  }

  async searchAssets(searchTerm: string, customerId?: string | number, siteId?: string | number): Promise<ApiResponse<Asset[]>> {
    const params: Record<string, string> = { searchTerm };

    if (customerId) params.customerId = String(customerId);
    if (siteId) params.siteId = String(siteId);
    return this.client.get<Asset[]>(ASSET_ENDPOINTS.SEARCH, { params });
  }
}
