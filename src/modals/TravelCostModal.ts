import type { Page } from '@playwright/test';
import { BaseCostModal } from './BaseCostModal';
import { CostType, type TravelCostModel } from '../models/CostModel';
export { PriceType } from '../models/CostModel';
export type { TravelCostModel };

export class TravelCostModal extends BaseCostModal {
  constructor(page: Page) {
    super(page, CostType.TRAVEL);
  }

  async clickAddTravel(): Promise<void> {
    return this.clickAdd();
  }

  async fillAddTravelCostModal(data: TravelCostModel): Promise<void> {
    return this.fillModal(data);
  }

  async clickEditTravelRecord(description: string): Promise<void> {
    return this.clickEditRecord(description);
  }
}
