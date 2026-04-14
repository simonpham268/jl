export interface Quote {
    id: string | number;
    quoteCustomerId: string | number;
    quoteSiteId: string | number;
    description: string;
    assignedToUserId: string | number;
    jobTypeId: string | number;
    quoteNumber?: string;
    status?: string;
    totalAmount?: number;
    validUntil?: string;
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateQuoteRequest {
    // Required fields
    QuoteCustomerId: string | number;
    QuoteSiteId: string | number;
    Description: string;
    AssignedToUserId: string | number;
    JobTypeId: string | number;

    // Optional - Quote Details
    QuoteNumber?: string;
    QuoteCategoryId?: string | number;
    PriorityId?: string | number;
    TradeId?: string | number;
    CustomReference?: string;
    OrderNumber?: string;

    // Optional - Dates
    DateLogged?: string;
    ValidUntil?: string;
    PreferredAppointmentDate?: string;
    StartDate?: string;
    EndDate?: string;

    // Optional - Assignment
    EngineerIdNullable?: string | number;
    EngineerTeamId?: string | number;
    SubcontractorId?: string | number;

    // Optional - Related Entities
    AssetId?: string | number;
    AssetUniqueId?: string;
    ProjectId?: string | number;
    CustomerContractId?: string | number;
    RelatedJobId?: string | number;

    // Optional - Flags
    IsNew?: boolean;
    Appointment?: boolean;
    DeployToMobile?: boolean;
    IsMobileActive?: boolean;
    IsAssigned?: boolean;
    IsRequireApproval?: boolean;
    IsRecurJob?: boolean;
    IsApplyJobTemplate?: boolean;
    IsApplyRecentJob?: boolean;
    IsDateAndTimeLocked?: boolean;
    IsAssociatedCustomer?: boolean;
    CompletionTimeSinceOnSite?: boolean;
    RedirectToDetailPage?: boolean;
    AssetSpecific?: boolean;
    IsQuotes?: boolean;

    // Optional - Template & Recent Job
    TemplateGuid?: string;
    FromRecentJobId?: string | number;

    // Optional - Currency
    PreferredCurrencyId?: string | number;
    IsEnabledMultipleCurrencies?: boolean;
    BaseCurrencyCode?: string;
    BaseCurrencyName?: string;
    ToCurrencyCode?: string;
    ToCurrencyName?: string;
    ExchangeRateDate?: string;
    ConversionRate?: number;

    // Optional - Other
    Notes?: string;
    WithinDays?: number;
    FaultCodeId?: string | number;
    SubFaultCodeId?: string | number;
    ProjectMilestoneId?: string | number;
    JobUserReferenceFieldValue?: string;
    JobUserReferenceDropdownListValue?: string;
}

/** Required fields for CreateQuoteRequest - used by buildFormData */
export const CREATE_QUOTE_REQUIRED_FIELDS: (keyof CreateQuoteRequest)[] = [
  'QuoteCustomerId',
  'QuoteSiteId',
  'Description',
  'AssignedToUserId',
  'JobTypeId'
];

export interface CreateQuoteResponse {
    success: boolean;
    errors: string[];
    Message: string | null;
    WarningMessage: string | null;
    QuoteId?: string | number;
    AdditionalData?: {
        QuoteId?: string | number;
        quoteid?: string | number;
    };
}

export interface UpdateQuoteRequest extends Partial<CreateQuoteRequest> {
    id: string | number;
}
