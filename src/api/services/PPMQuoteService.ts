import { ApiClient } from '../base/ApiClient';
import { ApiResponse, PaginatedResponse } from '../base/ApiResponse';
import { PPM_QUOTE_ENDPOINTS } from '../endpoints/ppm-quote.endpoints';
import { PPMQuote, CreatePPMQuoteRequest, CreatePPMQuoteResponse, UpdatePPMQuoteRequest } from '../models/PPMQuote';

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
        const form: Record<string, string | number | boolean> = {
            // Required fields
            StartDate: data.StartDate,
            EndDate: data.EndDate,
            PPMCustomerId: data.PPMCustomerId,
            PPMSiteId: data.PPMSiteId,
            PPMSellingRateId: data.PPMSellingRateId,
        };

        // Optional - Contract & Reference
        if (data.CustomerContractId) form.CustomerContractId = data.CustomerContractId;
        if (data.PlanReference) form.PlanReference = data.PlanReference;
        if (data.CustomerOrderNumber) form.CustomerOrderNumber = data.CustomerOrderNumber;

        // Optional - Job Details
        if (data.JobCategoryId) form.JobCategoryId = data.JobCategoryId;
        if (data.Description) form.Description = data.Description;
        if (data.Name) form.Name = data.Name;

        // Optional - Address
        if (data.SelectedAddressType !== undefined) form.SelectedAddressType = data.SelectedAddressType;
        if (data.Address1) form.Address1 = data.Address1;
        if (data.Address2) form.Address2 = data.Address2;
        if (data.Address3) form.Address3 = data.Address3;
        if (data.Address4) form.Address4 = data.Address4;
        if (data.Postcode) form.Postcode = data.Postcode;

        // Optional - Billing
        if (data.BillingType !== undefined) form.BillingType = data.BillingType;
        if (data.SelectedInvoiceType !== undefined) form.SelectedInvoiceType = data.SelectedInvoiceType;
        if (data.InvoiceContractValue !== undefined) form.InvoiceContractValue = data.InvoiceContractValue;
        if (data.NoBillingContractValue !== undefined) form.NoBillingContractValue = data.NoBillingContractValue;
        if (data.InvoiceFrequency !== undefined) form.InvoiceFrequency = data.InvoiceFrequency;
        if (data.WeekNumber !== undefined) form.WeekNumber = data.WeekNumber;
        if (data.InvoiceFirstDate) form.InvoiceFirstDate = data.InvoiceFirstDate;

        // Optional - Visit
        if (data.VisitFirstDate) form.VisitFirstDate = data.VisitFirstDate;
        if (data.VisitDescription) form.VisitDescription = data.VisitDescription;
        if (data.VisitDefaultValue !== undefined) form.VisitDefaultValue = data.VisitDefaultValue;

        // Optional - Assignment
        if (data.DefaultEngineerId) form.DefaultEngineerId = data.DefaultEngineerId;
        if (data.DefaultEngineerTeamId) form.DefaultEngineerTeamId = data.DefaultEngineerTeamId;
        if (data.DefaultSubcontractorId) form.DefaultSubcontractorId = data.DefaultSubcontractorId;
        if (data.AccountManagerId) form.AccountManagerId = data.AccountManagerId;
        if (data.AccountManager) form.AccountManager = data.AccountManager;

        // Optional - Costs
        if (data.Labour !== undefined) form.Labour = data.Labour;
        if (data.Material !== undefined) form.Material = data.Material;
        if (data.Overtime !== undefined) form.Overtime = data.Overtime;
        if (data.Expenses !== undefined) form.Expenses = data.Expenses;
        if (data.Travel !== undefined) form.Travel = data.Travel;
        if (data.CallOut !== undefined) form.CallOut = data.CallOut;
        if (data.Mileage !== undefined) form.Mileage = data.Mileage;
        if (data.Subcontractor !== undefined) form.Subcontractor = data.Subcontractor;

        // Optional - Invoice Header Details
        if (data['InvoiceHeaderDetails[AccountNumber]']) form['InvoiceHeaderDetails[AccountNumber]'] = data['InvoiceHeaderDetails[AccountNumber]'];
        if (data['InvoiceHeaderDetails[OrderNumber]']) form['InvoiceHeaderDetails[OrderNumber]'] = data['InvoiceHeaderDetails[OrderNumber]'];
        if (data['InvoiceHeaderDetails[InvoiceHeaderId]']) form['InvoiceHeaderDetails[InvoiceHeaderId]'] = data['InvoiceHeaderDetails[InvoiceHeaderId]'];
        if (data['InvoiceHeaderDetails[InvoiceHeaderDescription]']) form['InvoiceHeaderDetails[InvoiceHeaderDescription]'] = data['InvoiceHeaderDetails[InvoiceHeaderDescription]'];
        if (data['InvoiceHeaderDetails[InvoiceHeader]']) form['InvoiceHeaderDetails[InvoiceHeader]'] = data['InvoiceHeaderDetails[InvoiceHeader]'];
        if (data['InvoiceHeaderDetails[Notes]']) form['InvoiceHeaderDetails[Notes]'] = data['InvoiceHeaderDetails[Notes]'];
        if (data['InvoiceHeaderDetails[Terms]']) form['InvoiceHeaderDetails[Terms]'] = data['InvoiceHeaderDetails[Terms]'];
        if (data['InvoiceHeaderDetails[EmailTo]']) form['InvoiceHeaderDetails[EmailTo]'] = data['InvoiceHeaderDetails[EmailTo]'];
        if (data['InvoiceHeaderDetails[EmailSubject]']) form['InvoiceHeaderDetails[EmailSubject]'] = data['InvoiceHeaderDetails[EmailSubject]'];
        if (data['InvoiceHeaderDetails[EmailBody]']) form['InvoiceHeaderDetails[EmailBody]'] = data['InvoiceHeaderDetails[EmailBody]'];

        // Optional - Flags
        if (data.IsPPMScheduleImport !== undefined) form.IsPPMScheduleImport = data.IsPPMScheduleImport;
        if (data.GenerateTrade !== undefined) form.GenerateTrade = data.GenerateTrade;
        if (data.GenerateAssetDescription !== undefined) form.GenerateAssetDescription = data.GenerateAssetDescription;
        if (data.GenerateFrequency !== undefined) form.GenerateFrequency = data.GenerateFrequency;
        if (data.ExcludeWeekends !== undefined) form.ExcludeWeekends = data.ExcludeWeekends;

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
