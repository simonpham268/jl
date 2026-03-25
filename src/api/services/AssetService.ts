import { ApiClient } from '../base/ApiClient';
import { ApiResponse, PaginatedResponse } from '../base/ApiResponse';
import { ASSET_ENDPOINTS } from '../endpoints/asset.endpoints';
import { Asset, CreateAssetRequest, CreateAssetResponse, UpdateAssetRequest } from '../models/Asset';

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
        const form: Record<string, string | number | boolean> = {
            // Required fields
            CustomerId: data.CustomerId,
            SiteId: data.SiteId,
            Description: data.Description,
        };

        // Optional - Asset Info
        if (data.IsNew !== undefined) form.IsNew = data.IsNew;
        if (data.ForSite !== undefined) form.ForSite = data.ForSite;
        if (data.ForJobAsset !== undefined) form.ForJobAsset = data.ForJobAsset;
        if (data.ClassId) form.ClassId = data.ClassId;
        if (data.PartId) form.PartId = data.PartId;
        if (data.TradeId) form.TradeId = data.TradeId;
        if (data.ServiceTypeId) form.ServiceTypeId = data.ServiceTypeId;
        if (data.Make) form.Make = data.Make;
        if (data.Model) form.Model = data.Model;
        if (data.ServiceTypeFrequencies) form.ServiceTypeFrequencies = data.ServiceTypeFrequencies;
        if (data.DocumentTypeIds) form.DocumentTypeIds = data.DocumentTypeIds;

        // Optional - Refrigerant
        if (data.RefrigerantTypeEnabled !== undefined) form.RefrigerantTypeEnabled = data.RefrigerantTypeEnabled;
        if (data.RefrigerantTypeId) form.RefrigerantTypeId = data.RefrigerantTypeId;
        if (data.RefrigerantCharge !== undefined) form.RefrigerantCharge = data.RefrigerantCharge;
        if (data.CO2 !== undefined) form.CO2 = data.CO2;
        if (data.GWP !== undefined) form.GWP = data.GWP;

        // Optional - Panel
        if (data.PanelInformationEnabled !== undefined) form.PanelInformationEnabled = data.PanelInformationEnabled;
        if (data.PanelNumber) form.PanelNumber = data.PanelNumber;
        if (data.Width !== undefined) form.Width = data.Width;
        if (data.Height !== undefined) form.Height = data.Height;

        // Optional - Identification
        if (data.Number) form.Number = data.Number;
        if (data.Location) form.Location = data.Location;
        if (data.SerialNo) form.SerialNo = data.SerialNo;
        if (data.QRCode) form.QRCode = data.QRCode;
        if (data.CustomReference) form.CustomReference = data.CustomReference;

        // Optional - Dates & Quantities
        if (data.InstallationDate) form.InstallationDate = data.InstallationDate;
        if (data.Quantity !== undefined) form.Quantity = data.Quantity;
        if (data.LabourWarrantyExpiryDate) form.LabourWarrantyExpiryDate = data.LabourWarrantyExpiryDate;
        if (data.WarrantyExpiryDate) form.WarrantyExpiryDate = data.WarrantyExpiryDate;
        if (data.EstimatedReplacementDate) form.EstimatedReplacementDate = data.EstimatedReplacementDate;
        if (data.LastServiceDate) form.LastServiceDate = data.LastServiceDate;

        // Optional - Costs & Charges
        if (data.BudgetReplacementCost !== undefined) form.BudgetReplacementCost = data.BudgetReplacementCost;
        if (data.TrimCharge !== undefined) form.TrimCharge = data.TrimCharge;
        if (data.BaseCharge !== undefined) form.BaseCharge = data.BaseCharge;
        if (data.AnnualServiceFee !== undefined) form.AnnualServiceFee = data.AnnualServiceFee;
        if (data.HireRate !== undefined) form.HireRate = data.HireRate;
        if (data.HireRatePeriod) form.HireRatePeriod = data.HireRatePeriod;

        // Optional - Status & Condition
        if (data.IsSuspended !== undefined) form.IsSuspended = data.IsSuspended;
        if (data.AssetConditionId) form.AssetConditionId = data.AssetConditionId;
        if (data.YearOfManufacture) form.YearOfManufacture = data.YearOfManufacture;
        if (data.Notes) form.Notes = data.Notes;

        // Optional - Load & Safety
        if (data.Meter) form.Meter = data.Meter;
        if (data.LoadCentre) form.LoadCentre = data.LoadCentre;
        if (data.LoadCentreAttachment) form.LoadCentreAttachment = data.LoadCentreAttachment;
        if (data.SafeWorkingLoad) form.SafeWorkingLoad = data.SafeWorkingLoad;
        if (data.SafeWorkingLoadAttachment) form.SafeWorkingLoadAttachment = data.SafeWorkingLoadAttachment;
        if (data.Taps) form.Taps = data.Taps;

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
