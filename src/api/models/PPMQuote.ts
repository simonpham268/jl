export interface PPMQuote {
    id: string | number;
    ppmCustomerId: string | number;
    ppmSiteId: string | number;
    startDate: string;
    endDate: string;
    ppmSellingRateId: string | number;
    description?: string;
    name?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreatePPMQuoteRequest {
    // Required fields
    StartDate: string;
    EndDate: string;
    PPMCustomerId: string | number;
    PPMSiteId: string | number;
    PPMSellingRateId: string | number;

    // Optional - Contract & Reference
    CustomerContractId?: string | number;
    PlanReference?: string;
    CustomerOrderNumber?: string;

    // Optional - Job Details
    JobCategoryId?: string | number;
    Description?: string;
    Name?: string;

    // Optional - Address
    SelectedAddressType?: number;
    Address1?: string;
    Address2?: string;
    Address3?: string;
    Address4?: string;
    Postcode?: string;

    // Optional - Billing
    BillingType?: number;
    SelectedInvoiceType?: number;
    InvoiceContractValue?: number;
    NoBillingContractValue?: number;
    InvoiceFrequency?: number;
    WeekNumber?: number;
    InvoiceFirstDate?: string;

    // Optional - Visit
    VisitFirstDate?: string;
    VisitDescription?: string;
    VisitDefaultValue?: number;

    // Optional - Assignment
    DefaultEngineerId?: string | number;
    DefaultEngineerTeamId?: string | number;
    DefaultSubcontractorId?: string | number;
    AccountManagerId?: string | number;
    AccountManager?: string;

    // Optional - Costs
    Labour?: number;
    Material?: number;
    Overtime?: number;
    Expenses?: number;
    Travel?: number;
    CallOut?: number;
    Mileage?: number;
    Subcontractor?: number;

    // Optional - Invoice Header Details
    'InvoiceHeaderDetails[AccountNumber]'?: string;
    'InvoiceHeaderDetails[OrderNumber]'?: string;
    'InvoiceHeaderDetails[InvoiceHeaderId]'?: string | number;
    'InvoiceHeaderDetails[InvoiceHeaderDescription]'?: string;
    'InvoiceHeaderDetails[InvoiceHeader]'?: string;
    'InvoiceHeaderDetails[Notes]'?: string;
    'InvoiceHeaderDetails[Terms]'?: string;
    'InvoiceHeaderDetails[EmailTo]'?: string;
    'InvoiceHeaderDetails[EmailSubject]'?: string;
    'InvoiceHeaderDetails[EmailBody]'?: string;

    // Optional - Flags
    IsPPMScheduleImport?: boolean;
    GenerateTrade?: boolean;
    GenerateAssetDescription?: boolean;
    GenerateFrequency?: boolean;
    ExcludeWeekends?: boolean;
}

export interface CreatePPMQuoteResponse {
    success: boolean;
    errors: string[];
    Message: string | null;
    WarningMessage: string | null;
    Id?: string | number;
}

export interface UpdatePPMQuoteRequest {
    StartDate?: string;
    EndDate?: string;
    Description?: string;
    Name?: string;
    PPMSellingRateId?: string | number;
    DefaultEngineerId?: string | number;
    DefaultEngineerTeamId?: string | number;
}
