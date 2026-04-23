import type { Page } from '@playwright/test';
import { BaseCostModal } from './BaseCostModal';
import { CostType, type OvertimeCostModel } from '../models/CostModel';
export { PriceType } from '../models/CostModel';
export type { OvertimeCostModel };

export class OvertimeCostModal extends BaseCostModal {
  constructor(page: Page) {
    super(page, CostType.OVERTIME);
  }

  async clickAddOvertime(): Promise<void> {
    return this.clickAdd();
  }

  async fillAddOvertimeCostModal(data: OvertimeCostModel): Promise<void> {
    return this.fillModal(data);
  }

  async clickEditOvertimeRecord(description: string): Promise<void> {
    return this.clickEditRecord(description);
  }
}
