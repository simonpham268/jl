import type { Page } from '@playwright/test';
import { BaseCostModal } from './BaseCostModal';
import { CostType, type OtherCostModel } from '../models/CostModel';
export { PriceType } from '../models/CostModel';
export type { OtherCostModel };

export class OtherCostModal extends BaseCostModal {
  constructor(page: Page) {
    super(page, CostType.OTHER);
  }

  async clickAddOther(): Promise<void> {
    return this.clickAdd();
  }

  async fillAddOtherCostModal(data: OtherCostModel): Promise<void> {
    return this.fillModal(data);
  }

  async clickEditOtherRecord(description: string): Promise<void> {
    return this.clickEditRecord(description);
  }
}
