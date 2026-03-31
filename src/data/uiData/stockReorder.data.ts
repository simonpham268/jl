/**
 * Stock Reorder Data Module
 * Builder pattern for creating test data for Stock Reorder page
 */

/**
 * Data interface for creating a Stock Reorder
 */
export interface StockReorderData {
  stockIndices: number[];
  searchQuery?: string;
  locations?: string[];
}

/**
 * StockReorderBuilder - Fluent builder for StockReorderData
 *
 * @example
 * // Create with stock indices only (select first 3 items)
 * const reorderData = StockReorderBuilder
 *   .create([0, 1, 2])
 *   .build();
 *
 * @example
 * // Create with search filter and then select
 * const reorderData = StockReorderBuilder
 *   .create([0, 1])
 *   .withSearchQuery('Widget')
 *   .withLocations(['Main Warehouse', 'Branch Stock'])
 *   .build();
 */
export class StockReorderBuilder {
  private data: StockReorderData;

  private constructor(stockIndices: number[]) {
    this.data = {
      stockIndices
    };
  }

  /**
   * Create a new builder with required fields
   * @param stockIndices - Array of stock row indices to select (0-based)
   */
  static create(stockIndices: number[]): StockReorderBuilder {
    return new StockReorderBuilder(stockIndices);
  }

  /**
   * Add search query filter
   */
  withSearchQuery(query: string): StockReorderBuilder {
    this.data.searchQuery = query;
    return this;
  }

  /**
   * Add locations filter
   */
  withLocations(locations: string[]): StockReorderBuilder {
    this.data.locations = locations;
    return this;
  }

  /**
   * Add additional stock indices to select
   */
  withAdditionalIndices(indices: number[]): StockReorderBuilder {
    this.data.stockIndices = [...this.data.stockIndices, ...indices];
    return this;
  }

  /**
   * Build the final StockReorderData object
   */
  build(): StockReorderData {
    return { ...this.data };
  }
}
