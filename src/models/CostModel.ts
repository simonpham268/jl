export enum CostType {
  LABOUR = 'Labour',
  OVERTIME = 'Overtime',
  MILEAGE = 'Mileage',
  TRAVEL = 'Travel',
  MATERIAL = 'Material',
  EXPENSES = 'Expenses',
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
