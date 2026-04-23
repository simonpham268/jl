import type { Page } from '@playwright/test';
import { BaseCostModal } from './BaseCostModal';
import { CostType, type LabourCostModel } from '../models/CostModel';
export { PriceType } from '../models/CostModel';
export type { LabourCostModel };

export class LabourCostModal extends BaseCostModal {
  constructor(page: Page) {
    super(page, CostType.LABOUR);
  }

  async clickAddLabour(): Promise<void> {
    return this.clickAdd();
  }

  async fillAddLabourCostModal(data: LabourCostModel): Promise<void> {
    return this.fillModal(data);
  }

  async clickEditLabourRecord(description: string): Promise<void> {
    return this.clickEditRecord(description);
  }
}
