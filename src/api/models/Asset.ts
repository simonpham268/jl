export interface Asset {
    id: string | number;
    customerId: string | number;
    siteId: string | number;
    description: string;
    classId?: string | number;
    partId?: string | number;
    tradeId?: string | number;
    serviceTypeId?: string | number;
    make?: string;
    model?: string;
    serialNo?: string;
    qrCode?: string;
    location?: string;
    number?: string;
    customReference?: string;
    quantity?: number;
    installationDate?: string;
    warrantyExpiryDate?: string;
    labourWarrantyExpiryDate?: string;
    estimatedReplacementDate?: string;
    lastServiceDate?: string;
    budgetReplacementCost?: number;
    isSuspended?: boolean;
    assetConditionId?: string | number;
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateAssetRequest {
    // Required fields
    CustomerId: string | number;
    SiteId: string | number;
    Description: string;

    // Optional - Asset Info
    IsNew?: boolean;
    ForSite?: boolean;
    ForJobAsset?: boolean;
    ClassId?: string | number;
    PartId?: string | number;
    TradeId?: string | number;
    ServiceTypeId?: string | number;
    Make?: string;
    Model?: string;
    ServiceTypeFrequencies?: string;
    DocumentTypeIds?: string;

    // Optional - Refrigerant
    RefrigerantTypeEnabled?: boolean;
    RefrigerantTypeId?: string | number;
    RefrigerantCharge?: number;
    CO2?: number;
    GWP?: number;

    // Optional - Panel
    PanelInformationEnabled?: boolean;
    PanelNumber?: string;
    Width?: number;
    Height?: number;

    // Optional - Identification
    Number?: string;
    Location?: string;
    SerialNo?: string;
    QRCode?: string;
    CustomReference?: string;

    // Optional - Dates & Quantities
    InstallationDate?: string;
    Quantity?: number;
    LabourWarrantyExpiryDate?: string;
    WarrantyExpiryDate?: string;
    EstimatedReplacementDate?: string;
    LastServiceDate?: string;

    // Optional - Costs & Charges
    BudgetReplacementCost?: number;
    TrimCharge?: boolean;
    BaseCharge?: number;
    AnnualServiceFee?: number;
    HireRate?: number;
    HireRatePeriod?: string;

    // Optional - Status & Condition
    IsSuspended?: boolean;
    AssetConditionId?: string | number;
    YearOfManufacture?: string | number;
    Notes?: string;

    // Optional - Load & Safety
    Meter?: string;
    LoadCentre?: string;
    LoadCentreAttachment?: string;
    SafeWorkingLoad?: string;
    SafeWorkingLoadAttachment?: string;
    Taps?: string;
}

export interface CreateAssetResponse {
    success: boolean;
    errors: string[];
    Message: string | null;
    WarningMessage: string | null;
    AssetId?: string | number;
}

export interface UpdateAssetRequest extends Partial<CreateAssetRequest> {
    id: string | number;
}
