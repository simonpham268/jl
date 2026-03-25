import { ApiClient } from '../base/ApiClient';
import { ApiResponse, PaginatedResponse } from '../base/ApiResponse';
import { SITE_ENDPOINTS } from '../endpoints/site.endpoints';
import { Site, CreateSiteRequest, CreateSiteResponse, UpdateSiteRequest } from '../models/Site';

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
        const form: Record<string, string | number> = {
            // Required fields
            CustomerId: data.CustomerId,
            CustomerName: data.CustomerName,
            Name: data.Name,
        };

        // Optional - Address
        if (data.AreaId) form.AreaId = data.AreaId;
        if (data.Address1) form.Address1 = data.Address1;
        if (data.Address2) form.Address2 = data.Address2;
        if (data.Address3) form.Address3 = data.Address3;
        if (data.Address4) form.Address4 = data.Address4;
        if (data.Postcode) form.Postcode = data.Postcode;
        if (data.Telephone) form.Telephone = data.Telephone;
        if (data.FullTelephone) form.FullTelephone = data.FullTelephone;
        if (data.Latitude) form.Latitude = data.Latitude;
        if (data.Longitude) form.Longitude = data.Longitude;

        // Optional - Contact
        if (data.ContactFirstName) form.ContactFirstName = data.ContactFirstName;
        if (data.ContactLastName) form.ContactLastName = data.ContactLastName;
        if (data.ContactPosition) form.ContactPosition = data.ContactPosition;
        if (data.ContactEmail) form.ContactEmail = data.ContactEmail;
        if (data.ContactTelephone) form.ContactTelephone = data.ContactTelephone;
        if (data.FullContactTelephone) form.FullContactTelephone = data.FullContactTelephone;

        // Optional - Other
        if (data.CustomReference) form.CustomReference = data.CustomReference;
        if (data.AccountManagerId) form.AccountManagerId = data.AccountManagerId;
        if (data.ParentSiteId) form.ParentSiteId = data.ParentSiteId;

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
