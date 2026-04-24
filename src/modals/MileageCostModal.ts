import type { Page } from '@playwright/test';
import { BaseCostModal } from './BaseCostModal';
import { CostType, type MileageCostModel } from '../models/CostModel';
export { PriceType } from '../models/CostModel';
export type { MileageCostModel };

export class MileageCostModal extends BaseCostModal {
  constructor(page: Page) {
    super(page, CostType.MILEAGE);
  }

  async clickAddMileage(): Promise<void> {
    return this.clickAdd();
  }

  async fillAddMileageCostModal(data: MileageCostModel): Promise<void> {
    return this.fillModal(data);
  }

  async clickEditMileageRecord(description: string): Promise<void> {
    return this.clickEditRecord(description);
  }
}
