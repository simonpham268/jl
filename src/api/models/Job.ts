export interface Job {
    id: string;
    title: string;
    description: string;
    status: JobStatus;
    priority: JobPriority;
    assigneeId?: string;
    createdBy: string;
    dueDate?: string;
    completedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export type JobStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export type JobPriority = 'low' | 'medium' | 'high' | 'critical';

export interface CreateJobRequest {
    // Required fields
    JobSiteId: string | number;
    Description: string;
    JobCustomerId: string | number;
    DateLogged: string;
    JobTypeId: string | number;
    AssignedToUserId: string | number;

    // Optional - Job Details
    Appointment?: boolean;
    AssetUniqueId?: string;
    ExploreJoblogicURL?: string;
    RelatedJobId?: string | number;
    ProjectId?: string | number;
    CustomerContractId?: string | number;
    ProjectNumber?: string;
    AssetId?: string | number;
    CustomReference?: string;
    JobCategoryId?: string | number;
    OrderNumber?: string;
    TradeId?: string | number;
    IsRequireApproval?: boolean;
    IsAssigned?: boolean;
    AppointmentDate?: string;

    // Optional - Scheduling
    DeployToMobile?: boolean;
    EndDate?: string;
    StartDate?: string;
    EngineerIdNullable?: string | number;
    EngineerTeamId?: string | number;
    SubcontractorId?: string | number;
    IsMobileActive?: boolean;
    PriorityId?: string | number;

    // Optional - Job Options
    IsQuotes?: boolean;
    AssetSpecific?: boolean;
    WithinDays?: number;
    IsRecurJob?: boolean;
    FaultCodeId?: string | number;
    SubFaultCodeId?: string | number;
    FromRecentJobId?: string | number;
    IsApplyRecentJob?: boolean;
    CreateRelatedJobCarryForwardRequest?: boolean;
    CompletionTimeSinceOnSite?: boolean;
    IsApplyJobTemplate?: boolean;
    TemplateGuid?: string;
    IsAssociatedCustomer?: boolean;
    JobUserReferenceFieldValue?: string;
    JobUserReferenceDropdownListValue?: string;
    IsDateAndTimeLocked?: boolean;
    ProjectMilestoneId?: string | number;

    // Optional - Currency
    RedirectToDetailPage?: boolean;
    PreferredCurrencyId?: string | number;
    IsEnabledMultipleCurrencies?: boolean;
    BaseCurrencyCode?: string;
    BaseCurrencyName?: string;
    ToCurrencyCode?: string;
    ToCurrencyName?: string;
    ExchangeRateDate?: string;
    ConversionRate?: number;
}

export interface CreateJobResponse {
    success: boolean;
    errors: string[];
    Message: string | null;
    WarningMessage: string | null;
    redirectUrl: string | null;
}

export interface UpdateJobRequest {
    title?: string;
    description?: string;
    status?: JobStatus;
    priority?: JobPriority;
    assigneeId?: string;
    dueDate?: string;
}
