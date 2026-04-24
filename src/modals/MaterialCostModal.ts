import type { Page } from '@playwright/test';
import { BaseCostModal } from './BaseCostModal';
import { CostType, type MaterialCostModel } from '../models/CostModel';
export { PriceType } from '../models/CostModel';
export type { MaterialCostModel };

export class MaterialCostModal extends BaseCostModal {
  constructor(page: Page) {
    super(page, CostType.MATERIAL);
  }

  async clickAddMaterial(): Promise<void> {
    return this.clickAdd();
  }

  async fillAddMaterialCostModal(data: MaterialCostModel): Promise<void> {
    return this.fillModal(data);
  }

  async clickEditMaterialRecord(description: string): Promise<void> {
    return this.clickEditRecord(description);
  }
}
