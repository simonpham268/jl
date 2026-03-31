/**
 * Stock PO Data Module
 * Builder pattern for creating test data for Stock Purchase Order page
 */

/**
 * Data interface for creating a Stock Purchase Order
 */
export interface StockPOData {
  stockDeliveryLocation: string;
  supplier: string;
  contact?: string;
  accountNumber?: string;
  estimatedDeliveryDate?: string;
  tags?: string[];
}

/**
 * StockPOBuilder - Fluent builder for StockPOData
 *
 * @example
 * // Create with required fields only
 * const stockPOData = StockPOBuilder
 *   .create('Main Warehouse', 'ABC Supplier')
 *   .build();
 *
 * @example
 * // Create with additional fields
 * const stockPOData = StockPOBuilder
 *   .create('Main Warehouse', 'ABC Supplier')
 *   .contact('John Smith')
 *   .accountNumber('ACC-001')
 *   .estimatedDeliveryDate('31/12/2024')
 *   .tags(['Urgent', 'Priority'])
 *   .build();
 */
export class StockPOBuilder {
  private data: StockPOData;

  private constructor(stockDeliveryLocation: string, supplier: string) {
    this.data = {
      stockDeliveryLocation,
      supplier
    };
  }

  /**
   * Create a new builder with required fields
   * @param stockDeliveryLocation - Stock delivery location (required)
   * @param supplier - Supplier name (required)
   */
  static create(stockDeliveryLocation: string, supplier: string): StockPOBuilder {
    return new StockPOBuilder(stockDeliveryLocation, supplier);
  }

  /**
   * Set contact
   */
  contact(contact: string): StockPOBuilder {
    this.data.contact = contact;
    return this;
  }

  /**
   * Set account number
   */
  accountNumber(accountNumber: string): StockPOBuilder {
    this.data.accountNumber = accountNumber;
    return this;
  }

  /**
   * Set estimated delivery date
   */
  estimatedDeliveryDate(date: string): StockPOBuilder {
    this.data.estimatedDeliveryDate = date;
    return this;
  }

  /**
   * Set tags
   */
  tags(tags: string[]): StockPOBuilder {
    this.data.tags = tags;
    return this;
  }

  /**
   * Build the final StockPOData object
   */
  build(): StockPOData {
    return { ...this.data };
  }
}

// ========================
// Helper Functions
// ========================

/**
 * Generate unique account number
 */
export function generateAccountNumber(prefix: string = 'ACC'): string {
  return `${prefix}-${Date.now()}`;
}
