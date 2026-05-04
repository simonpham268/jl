import type { Page } from '@playwright/test';
import { BaseCostModal } from './BaseCostModal';
import { CostType, PriceType, type LabourCostModel } from '../models/CostModel';
export { PriceType } from '../models/CostModel';
export type { LabourCostModel };

export type ModalContext = 'Job' | 'Quote';

export class LabourCostModal extends BaseCostModal {
  constructor(page: Page, context: ModalContext = 'Job') {
    const nameSuffix = context === 'Job' ? `${CostType.LABOUR}-Add` : CostType.LABOUR;
    const costFieldName = context === 'Job' ? `CostPerUnit${nameSuffix}` : `CostPerHour${nameSuffix}`;
    super(page, CostType.LABOUR, CostType.LABOUR, nameSuffix, costFieldName);
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

  private normalizeInput(cost: number | LabourCostModel): LabourCostModel {
    if (typeof cost === 'number') {
      return {
        description: `Labour ${cost}`,
        costPerHour: cost,
        priceType: PriceType.FIX_PRICE,
      };
    }

    return cost;
  }

  async addLabourCosts(costs: readonly (number | LabourCostModel)[]): Promise<void> {
    for (const rawCost of costs) {
      const cost = this.normalizeInput(rawCost);
      await this.clickAddLabour();
      await this.fillAddLabourCostModal(cost);
      await this.saveModal();
    }
  }
}
