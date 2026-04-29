export enum CostType {
  LABOUR = 'Labour',
  OVERTIME = 'Overtime',
  MILEAGE = 'Mileage',
  TRAVEL = 'Travel',
  MATERIAL = 'Material',
  EXPENSES = 'Expenses',
  OTHER = 'Other',
  SUBCONTRACTOR = 'Subcontractor',
  SCHEDULE_OF_RATES = 'ScheduleOfRates',
}

export enum PriceType {
  FIX_PRICE = 'Fix Price',
  ACTUAL = 'Actual',
  ESTIMATED = 'Estimated',
}

export interface BaseCostModel {
  description: string;
  costPerHour: number;
  priceType: PriceType;
  upliftPercent: number;
}

export type LabourCostModel = BaseCostModel;
export type OvertimeCostModel = BaseCostModel;
export type MileageCostModel = BaseCostModel;
export type TravelCostModel = BaseCostModel;
export type MaterialCostModel = BaseCostModel;
export type ExpensesCostModel = BaseCostModel;
export type OtherCostModel = BaseCostModel;
export type SubcontractorCostModel = BaseCostModel;
export interface PriceUsingRateSplit {
  description: string;
  cost: number;
  sell: number;
}

export interface ScheduleOfRatesCostModel extends BaseCostModel {
  scheduleOfRateLibrary: string;
  scheduleOfRateItem: string;
  priceUsingRateSplit?: PriceUsingRateSplit;
}
