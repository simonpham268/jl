// ========================
// System Detail Settings
// ========================

export interface SystemDetailSettings {
  // Desktop
  'Desktop.CultureId'?: string;
  'Desktop.Language'?: string;
  'Desktop.TimeZoneId'?: string;
  'Desktop.TimeFormat'?: string;
  'Desktop.DateFormat'?: string;
  'Desktop.FirstDayOfWeek'?: number;
  'Desktop.CurrencyId'?: string;
  'Desktop.DistanceUnit'?: number;
  'Desktop.PriorityId'?: string;
  'Desktop.DocumentType'?: number;
  'Desktop.SellingRateId'?: number;
  'Desktop.IsPrivateFormDefault'?: boolean;
  'Desktop.RoundingType'?: number;
  'Desktop.RoundingDuration'?: number;
  'Desktop.IsPreserveEnteredUpliftDiscountPercentage'?: boolean;

  // Mobile
  'Mobile.IsEngineerTrackingOn'?: boolean;
  'Mobile.IsAutoAcceptCostsOn'?: boolean;
  'Mobile.RestrictEngineerTravel'?: boolean;
  'Mobile.AllowQuickComplete'?: boolean;
  'Mobile.EnableVisitNotesExtra'?: boolean;
  'Mobile.EnableAssetServiceTypeCompletion'?: boolean;
  'Mobile.EnableVisitAttachmentRule'?: boolean;
  'Mobile.EnableNoAccessForm'?: boolean;
  'Mobile.ShowJobKPIOnMobile'?: boolean;
  'Mobile.Mobile_ShowSiteNotesVisit'?: boolean;
  'Mobile.Mobile_EnableSiteHistorySharing'?: boolean;
  'Mobile.EnableActionClickTimeStatusUpdate'?: boolean;
  'Mobile_IsNotesSetDefaultPublic'?: boolean;

  // Non-Productive Time
  'NonProductiveTime.DeductibleDaysAllowance'?: number;
  'NonProductiveTime.DeductibleDaysAllowance_Reset'?: number;

  // General flags
  IsShowPartNumber?: boolean;
  IsShowAssetPanelInformation?: boolean;
  IsGroupPPMAssetBaseOnTrade?: boolean;
  IsAssociateTradeWithJobcategory?: boolean;
  IsShowAppointment?: boolean;
  IsEnable2FA?: boolean;
  EnablePOApproval?: boolean;
  EnableSubcontractorPOApproval?: boolean;
  IsEngineerShiftEnabled?: boolean;
  EnableGRNs?: boolean;
  IsOnCallEnabled?: boolean;
  IsShowMultipleCostLineGroupedInvoices?: boolean;
  IsMatchingSubcontractorPOWithIncompleteItem?: boolean;
  IsOrderNumberMandatory?: boolean;
  DefaultPOApprovalAmount?: number;
  DefaultSubcontractorPOApprovalAmount?: number;
  IsSubcontractorNotesSetDefaultPublic?: boolean;
  IsNominalMandatoryOnPO?: boolean;
  EnableInventoryAverageCost?: boolean;
  PPMMandatoryTasksColour?: string;
  DefaultNoteVisibility?: number;
  ShuntVisitAllowed?: boolean;
  IsLockPO?: boolean;
  IsLockPOItem?: boolean;
  IsLockSubcontractorPO?: boolean;
  IsLockSubcontractorPOItem?: boolean;
  PPMVisitTime?: string;
  IsAutoCompletePPMContractImportAssetTasksAndTasks?: boolean;
  IsRouteSchedulingOnPlannerEnabled?: boolean;
  IsPasswordProtectDashboardLink?: boolean;
  IsPasswordProtectPortalLink?: boolean;
  ShowTagsInCustomerPortal?: boolean;
  IsSignatureMandatoryOnComplete?: boolean;
  IsSignatureMandatoryOnLeaveSite?: boolean;
  IsSendMappingSubcontractorJobEmail?: boolean;
  DefaultMappingSubcontractorJobEmail?: string;
  EnableServiceJobs?: boolean;
  AMTimeRange?: string;
  PMTimeRange?: string;
  IsOverridePOLineVAT?: boolean;
  IsAllowRaiseInvoiceAgainstPOItem?: boolean;
  IsApplyBudgetTracking?: boolean;
  JobProfitabilityViewType?: number;
  EnableApprovalForMandatoryJobTasks?: boolean;
  EnableRaisingSubcontractorPO?: boolean;
  EnableSharingSORLibrary?: boolean;
  LimitedSORAccess?: boolean;
  EnableHireModule?: boolean;
  IsPPMAutoApproveInvoices?: boolean;
  PlannerViewType?: string;
  CostApprovalRequired?: boolean;
  IsCarryForwardVisitNotes?: boolean;
  IsPartToFitUnchecked?: boolean;
  IsRestrictEditCancelledPO?: boolean;
  IsAssetCategorisationEnabled?: boolean;
  CustomerContractBehaviour?: number;
  DisableCustomerContractsAutoRenew?: boolean;
  IsDefaultLibraryPartPriceUpdateOnPO?: boolean;
  IsUsePrimaryJobTradeInJobCostTrade?: boolean;
  IsSubcontractorPlannerViewEnabled?: boolean;
  EnableEngineerSharing?: boolean;
  EnableCustomerContractPriorityCascade?: boolean;
  PPMContractRenewalRetainOriginalVisitJobCategory?: boolean;
  CommittedSpendCalculationType?: number;
  InvoicingMethod?: number;
  SubcontractorPlanner_EnablePreferredAppointmentAsStartDate?: boolean;
  IsJobCategoryMandatory?: boolean;
}

// ========================
// Selling Rate
// ========================

export interface SellingRateRequest {
  Id: number;
  Description: string;
  IsScutumSellingRateEnabled?: string;
  IsLabourChargeable?: string;
  IsTravelChargeable?: string;
  IsMileageChargeable?: string;
  CallOutMinimumDuration_Hours?: number;
  CallOutMinimumDuration_Minutes?: number;
  MaterialUplift?: string;
  IsMaterialChargeable?: string;
  ExpensesUplift?: string;
  IsExpenseChargeable?: string;
  SubcontractorUplift?: string;
  OtherUplift?: string;
  IsScheduleOfRatesUpliftSelected?: string;
  ScheduleOfRatesUplift?: number;
  ScheduleOfRatesDiscount?: number;
  IsScheduleOfRatesChargeable?: string;
  CallOutIncludesTravel?: string;
  CallOutFeeRequired?: string;
  IsSubcontractorChargeable?: string;
  IsOtherChargeable?: string;
}
