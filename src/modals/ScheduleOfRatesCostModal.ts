import type { Page } from '@playwright/test';
import { BaseCostModal } from './BaseCostModal';
import { CostType, type ScheduleOfRatesCostModel } from '../models/CostModel';
export { PriceType } from '../models/CostModel';
export type { ScheduleOfRatesCostModel };

export class ScheduleOfRatesCostModal extends BaseCostModal {
  constructor(page: Page) {
    super(page, CostType.SCHEDULE_OF_RATES);
  }

  async clickAddScheduleOfRates(): Promise<void> {
    return this.clickAdd();
  }

  async fillAddScheduleOfRatesCostModal(data: ScheduleOfRatesCostModel): Promise<void> {
    return this.fillModal(data);
  }

  async clickEditScheduleOfRatesRecord(description: string): Promise<void> {
    return this.clickEditRecord(description);
  }
}
