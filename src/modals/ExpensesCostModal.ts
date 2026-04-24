import type { Page } from '@playwright/test';
import { BaseCostModal } from './BaseCostModal';
import { CostType, type ExpensesCostModel } from '../models/CostModel';
export { PriceType } from '../models/CostModel';
export type { ExpensesCostModel };

export class ExpensesCostModal extends BaseCostModal {
  constructor(page: Page) {
    super(page, CostType.EXPENSES, 'Expense');
  }

  async clickAddExpenses(): Promise<void> {
    return this.clickAdd();
  }

  async fillAddExpensesCostModal(data: ExpensesCostModel): Promise<void> {
    return this.fillModal(data);
  }

  async clickEditExpensesRecord(description: string): Promise<void> {
    return this.clickEditRecord(description);
  }
}
