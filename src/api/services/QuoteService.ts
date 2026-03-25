import { ApiClient } from '../base/ApiClient';
import { ApiResponse, PaginatedResponse } from '../base/ApiResponse';
import { QUOTE_ENDPOINTS } from '../endpoints/quote.endpoints';
import { Quote, CreateQuoteRequest, CreateQuoteResponse, UpdateQuoteRequest } from '../models/Quote';

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
        const form: Record<string, string | number | boolean> = {
            // Required fields
            QuoteCustomerId: data.QuoteCustomerId,
            QuoteSiteId: data.QuoteSiteId,
            Description: data.Description,
            AssignedToUserId: data.AssignedToUserId,
            JobTypeId: data.JobTypeId,
        };

        // Optional - Quote Details
        if (data.QuoteNumber) form.QuoteNumber = data.QuoteNumber;
        if (data.QuoteCategoryId) form.QuoteCategoryId = data.QuoteCategoryId;
        if (data.PriorityId) form.PriorityId = data.PriorityId;
        if (data.TradeId) form.TradeId = data.TradeId;
        if (data.CustomReference) form.CustomReference = data.CustomReference;
        if (data.OrderNumber) form.OrderNumber = data.OrderNumber;

        // Optional - Dates
        if (data.DateLogged) form.DateLogged = data.DateLogged;
        if (data.ValidUntil) form.ValidUntil = data.ValidUntil;
        if (data.PreferredAppointmentDate) form.PreferredAppointmentDate = data.PreferredAppointmentDate;
        if (data.StartDate) form.StartDate = data.StartDate;
        if (data.EndDate) form.EndDate = data.EndDate;

        // Optional - Assignment
        if (data.EngineerIdNullable) form.EngineerIdNullable = data.EngineerIdNullable;
        if (data.EngineerTeamId) form.EngineerTeamId = data.EngineerTeamId;
        if (data.SubcontractorId) form.SubcontractorId = data.SubcontractorId;

        // Optional - Related Entities
        if (data.AssetId) form.AssetId = data.AssetId;
        if (data.AssetUniqueId) form.AssetUniqueId = data.AssetUniqueId;
        if (data.ProjectId) form.ProjectId = data.ProjectId;
        if (data.CustomerContractId) form.CustomerContractId = data.CustomerContractId;
        if (data.RelatedJobId) form.RelatedJobId = data.RelatedJobId;

        // Optional - Flags
        if (data.IsNew !== undefined) form.IsNew = data.IsNew;
        if (data.Appointment !== undefined) form.Appointment = data.Appointment;
        if (data.DeployToMobile !== undefined) form.DeployToMobile = data.DeployToMobile;
        if (data.IsMobileActive !== undefined) form.IsMobileActive = data.IsMobileActive;
        if (data.IsAssigned !== undefined) form.IsAssigned = data.IsAssigned;
        if (data.IsRequireApproval !== undefined) form.IsRequireApproval = data.IsRequireApproval;
        if (data.IsRecurJob !== undefined) form.IsRecurJob = data.IsRecurJob;
        if (data.IsApplyJobTemplate !== undefined) form.IsApplyJobTemplate = data.IsApplyJobTemplate;
        if (data.IsApplyRecentJob !== undefined) form.IsApplyRecentJob = data.IsApplyRecentJob;
        if (data.IsDateAndTimeLocked !== undefined) form.IsDateAndTimeLocked = data.IsDateAndTimeLocked;
        if (data.IsAssociatedCustomer !== undefined) form.IsAssociatedCustomer = data.IsAssociatedCustomer;
        if (data.CompletionTimeSinceOnSite !== undefined) form.CompletionTimeSinceOnSite = data.CompletionTimeSinceOnSite;
        if (data.RedirectToDetailPage !== undefined) form.RedirectToDetailPage = data.RedirectToDetailPage;
        if (data.AssetSpecific !== undefined) form.AssetSpecific = data.AssetSpecific;
        if (data.IsQuotes !== undefined) form.IsQuotes = data.IsQuotes;

        // Optional - Template & Recent Job
        if (data.TemplateGuid) form.TemplateGuid = data.TemplateGuid;
        if (data.FromRecentJobId) form.FromRecentJobId = data.FromRecentJobId;

        // Optional - Currency
        if (data.PreferredCurrencyId) form.PreferredCurrencyId = data.PreferredCurrencyId;
        if (data.IsEnabledMultipleCurrencies !== undefined) form.IsEnabledMultipleCurrencies = data.IsEnabledMultipleCurrencies;
        if (data.BaseCurrencyCode) form.BaseCurrencyCode = data.BaseCurrencyCode;
        if (data.BaseCurrencyName) form.BaseCurrencyName = data.BaseCurrencyName;
        if (data.ToCurrencyCode) form.ToCurrencyCode = data.ToCurrencyCode;
        if (data.ToCurrencyName) form.ToCurrencyName = data.ToCurrencyName;
        if (data.ExchangeRateDate) form.ExchangeRateDate = data.ExchangeRateDate;
        if (data.ConversionRate !== undefined) form.ConversionRate = data.ConversionRate;

        // Optional - Other
        if (data.Notes) form.Notes = data.Notes;
        if (data.WithinDays !== undefined) form.WithinDays = data.WithinDays;
        if (data.FaultCodeId) form.FaultCodeId = data.FaultCodeId;
        if (data.SubFaultCodeId) form.SubFaultCodeId = data.SubFaultCodeId;
        if (data.ProjectMilestoneId) form.ProjectMilestoneId = data.ProjectMilestoneId;
        if (data.JobUserReferenceFieldValue) form.JobUserReferenceFieldValue = data.JobUserReferenceFieldValue;
        if (data.JobUserReferenceDropdownListValue) form.JobUserReferenceDropdownListValue = data.JobUserReferenceDropdownListValue;

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
