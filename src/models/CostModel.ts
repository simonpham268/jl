export enum CostType {
  LABOUR = 'Labour',
  OVERTIME = 'Overtime',
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
