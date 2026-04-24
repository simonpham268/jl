import type { Page } from '@playwright/test';
import { BaseCostModal } from './BaseCostModal';
import { CostType, type SubcontractorCostModel } from '../models/CostModel';
export { PriceType } from '../models/CostModel';
export type { SubcontractorCostModel };

export class SubcontractorCostModal extends BaseCostModal {
  constructor(page: Page) {
    super(page, CostType.SUBCONTRACTOR);
  }

  async clickAddSubcontractor(): Promise<void> {
    return this.clickAdd();
  }

  async fillAddSubcontractorCostModal(data: SubcontractorCostModel): Promise<void> {
    return this.fillModal(data);
  }

  async clickEditSubcontractorRecord(description: string): Promise<void> {
    return this.clickEditRecord(description);
  }
}
