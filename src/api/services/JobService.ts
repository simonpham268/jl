import { ApiClient } from '../base/ApiClient';
import { ApiResponse, PaginatedResponse } from '../base/ApiResponse';
import { JOB_ENDPOINTS } from '../endpoints';
import { Job, CreateJobRequest, CreateJobResponse, UpdateJobRequest } from '../models';

export interface JobListParams {
    page?: number;
    pageSize?: number;
    status?: string;
    assigneeId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export class JobService {
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
        this.client.setHeader('content-type', 'application/x-www-form-urlencoded');
    }

    async getJobs(params?: JobListParams): Promise<ApiResponse<PaginatedResponse<Job>>> {
        return this.client.get<PaginatedResponse<Job>>(JOB_ENDPOINTS.LIST, {
            params: params as Record<string, string>
        });
    }

    async getJobById(id: string | number): Promise<ApiResponse<Job>> {
        return this.client.get<Job>(JOB_ENDPOINTS.GET_BY_ID(id));
    }

    async createJob(data: CreateJobRequest): Promise<ApiResponse<CreateJobResponse>> {
        const form: Record<string, string | number | boolean> = {
            // Required fields
            JobSiteId: data.JobSiteId,
            Description: data.Description,
            JobCustomerId: data.JobCustomerId,
            DateLogged: data.DateLogged,
            JobTypeId: data.JobTypeId,
            AssignedToUserId: data.AssignedToUserId
        };

        // Optional - Job Details
        if (data.Appointment !== undefined) form.Appointment = data.Appointment;
        if (data.AssetUniqueId) form.AssetUniqueId = data.AssetUniqueId;
        if (data.ExploreJoblogicURL) form.ExploreJoblogicURL = data.ExploreJoblogicURL;
        if (data.RelatedJobId) form.RelatedJobId = data.RelatedJobId;
        if (data.ProjectId) form.ProjectId = data.ProjectId;
        if (data.CustomerContractId) form.CustomerContractId = data.CustomerContractId;
        if (data.ProjectNumber) form.ProjectNumber = data.ProjectNumber;
        if (data.AssetId) form.AssetId = data.AssetId;
        if (data.CustomReference) form.CustomReference = data.CustomReference;
        if (data.JobCategoryId) form.JobCategoryId = data.JobCategoryId;
        if (data.OrderNumber) form.OrderNumber = data.OrderNumber;
        if (data.TradeId) form.TradeId = data.TradeId;
        if (data.IsRequireApproval !== undefined) form.IsRequireApproval = data.IsRequireApproval;
        if (data.IsAssigned !== undefined) form.IsAssigned = data.IsAssigned;
        if (data.AppointmentDate) form.AppointmentDate = data.AppointmentDate;

        // Optional - Scheduling
        if (data.DeployToMobile !== undefined) form.DeployToMobile = data.DeployToMobile;
        if (data.EndDate) form.EndDate = data.EndDate;
        if (data.StartDate) form.StartDate = data.StartDate;
        if (data.EngineerIdNullable) form.EngineerIdNullable = data.EngineerIdNullable;
        if (data.EngineerTeamId) form.EngineerTeamId = data.EngineerTeamId;
        if (data.SubcontractorId) form.SubcontractorId = data.SubcontractorId;
        if (data.IsMobileActive !== undefined) form.IsMobileActive = data.IsMobileActive;
        if (data.PriorityId) form.PriorityId = data.PriorityId;

        // Optional - Job Options
        if (data.IsQuotes !== undefined) form.IsQuotes = data.IsQuotes;
        if (data.AssetSpecific !== undefined) form.AssetSpecific = data.AssetSpecific;
        if (data.WithinDays !== undefined) form.WithinDays = data.WithinDays;
        if (data.IsRecurJob !== undefined) form.IsRecurJob = data.IsRecurJob;
        if (data.FaultCodeId) form.FaultCodeId = data.FaultCodeId;
        if (data.SubFaultCodeId) form.SubFaultCodeId = data.SubFaultCodeId;
        if (data.FromRecentJobId) form.FromRecentJobId = data.FromRecentJobId;
        if (data.IsApplyRecentJob !== undefined) form.IsApplyRecentJob = data.IsApplyRecentJob;
        if (data.CreateRelatedJobCarryForwardRequest !== undefined) form.CreateRelatedJobCarryForwardRequest = data.CreateRelatedJobCarryForwardRequest;
        if (data.CompletionTimeSinceOnSite !== undefined) form.CompletionTimeSinceOnSite = data.CompletionTimeSinceOnSite;
        if (data.IsApplyJobTemplate !== undefined) form.IsApplyJobTemplate = data.IsApplyJobTemplate;
        if (data.TemplateGuid) form.TemplateGuid = data.TemplateGuid;
        if (data.IsAssociatedCustomer !== undefined) form.IsAssociatedCustomer = data.IsAssociatedCustomer;
        if (data.JobUserReferenceFieldValue) form.JobUserReferenceFieldValue = data.JobUserReferenceFieldValue;
        if (data.JobUserReferenceDropdownListValue) form.JobUserReferenceDropdownListValue = data.JobUserReferenceDropdownListValue;
        if (data.IsDateAndTimeLocked !== undefined) form.IsDateAndTimeLocked = data.IsDateAndTimeLocked;
        if (data.ProjectMilestoneId) form.ProjectMilestoneId = data.ProjectMilestoneId;

        // Optional - Currency
        if (data.RedirectToDetailPage !== undefined) form.RedirectToDetailPage = data.RedirectToDetailPage;
        if (data.PreferredCurrencyId) form.PreferredCurrencyId = data.PreferredCurrencyId;
        if (data.IsEnabledMultipleCurrencies !== undefined) form.IsEnabledMultipleCurrencies = data.IsEnabledMultipleCurrencies;
        if (data.BaseCurrencyCode) form.BaseCurrencyCode = data.BaseCurrencyCode;
        if (data.BaseCurrencyName) form.BaseCurrencyName = data.BaseCurrencyName;
        if (data.ToCurrencyCode) form.ToCurrencyCode = data.ToCurrencyCode;
        if (data.ToCurrencyName) form.ToCurrencyName = data.ToCurrencyName;
        if (data.ExchangeRateDate) form.ExchangeRateDate = data.ExchangeRateDate;
        if (data.ConversionRate !== undefined) form.ConversionRate = data.ConversionRate;

        return this.client.post<CreateJobResponse>(JOB_ENDPOINTS.CREATE, { form });
    }

    async updateJob(id: string | number, data: UpdateJobRequest): Promise<ApiResponse<Job>> {
        return this.client.put<Job>(JOB_ENDPOINTS.UPDATE(id), {
            data
        });
    }

    async deleteJob(id: string | number): Promise<ApiResponse<void>> {
        return this.client.delete<void>(JOB_ENDPOINTS.DELETE(id));
    }

    async assignJob(id: string | number, assigneeId: string): Promise<ApiResponse<Job>> {
        return this.client.post<Job>(JOB_ENDPOINTS.ASSIGN(id), {
            data: { assigneeId }
        });
    }

    async completeJob(id: string | number): Promise<ApiResponse<Job>> {
        return this.client.post<Job>(JOB_ENDPOINTS.COMPLETE(id));
    }

    async cancelJob(id: string | number, reason?: string): Promise<ApiResponse<Job>> {
        return this.client.post<Job>(JOB_ENDPOINTS.CANCEL(id), {
            data: { reason }
        });
    }

    async searchJobs(query: string): Promise<ApiResponse<Job[]>> {
        return this.client.get<Job[]>(JOB_ENDPOINTS.SEARCH, {
            params: { q: query }
        });
    }
}
