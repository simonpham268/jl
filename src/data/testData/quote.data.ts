import { QuoteData } from '../../pages/Quotes/QuotePage';

/**
 * Quote Data Builder - Fluent API for creating quote test data
 * 
 * @example
 * // Simple quote
 * const quote = QuoteBuilder.create('ABC Corp', 'Main Office', 'HVAC Maintenance Quote').build();
 * 
 * // With more fields
 * const quote = QuoteBuilder.create('ABC Corp', 'Main Office', 'HVAC Maintenance Quote')
 *   .jobType('Maintenance')
 *   .priorityLevel('High')
 *   .expiryDate('31/12/2026')
 *   .chanceOfSale(75)
 *   .build();
 */
export class QuoteBuilder {
  private data: QuoteData;

  private constructor(customerName: string, siteName: string, description: string) {
    this.data = {
      customerName,
      siteName,
      description,
    };
  }

  /**
   * Create a new QuoteBuilder with required fields
   */
  static create(customerName: string, siteName: string, description: string): QuoteBuilder {
    return new QuoteBuilder(customerName, siteName, description);
  }

  // ========================
  // Customer & Site
  // ========================

  logFromTemplate(value: boolean = true): QuoteBuilder {
    this.data.logFromTemplate = value;
    return this;
  }

  logFromRecentQuote(value: boolean = true): QuoteBuilder {
    this.data.logFromRecentQuote = value;
    return this;
  }

  // ========================
  // Quote Details
  // ========================

  jobType(value: string): QuoteBuilder {
    this.data.jobType = value;
    return this;
  }

  jobCategory(value: string): QuoteBuilder {
    this.data.jobCategory = value;
    return this;
  }

  tags(value: string[]): QuoteBuilder {
    this.data.tags = value;
    return this;
  }

  title(value: string): QuoteBuilder {
    this.data.title = value;
    return this;
  }

  quoteReferenceNumber(value: string): QuoteBuilder {
    this.data.quoteReferenceNumber = value;
    return this;
  }

  sourceOfEnquiry(value: string): QuoteBuilder {
    this.data.sourceOfEnquiry = value;
    return this;
  }

  quoteTrade(value: string): QuoteBuilder {
    this.data.quoteTrade = value;
    return this;
  }

  priorityLevel(value: string): QuoteBuilder {
    this.data.priorityLevel = value;
    return this;
  }

  quoteRef1(value: string): QuoteBuilder {
    this.data.quoteRef1 = value;
    return this;
  }

  quoteRef2(value: string): QuoteBuilder {
    this.data.quoteRef2 = value;
    return this;
  }

  expiryDate(value: string): QuoteBuilder {
    this.data.expiryDate = value;
    return this;
  }

  quoteOwner(value: string): QuoteBuilder {
    this.data.quoteOwner = value;
    return this;
  }

  expectedSaleDate(value: string): QuoteBuilder {
    this.data.expectedSaleDate = value;
    return this;
  }

  /**
   * Set chance of sale (0, 25, 50, 75, 100)
   */
  chanceOfSale(value: number): QuoteBuilder {
    this.data.chanceOfSale = value;
    return this;
  }

  // ========================
  // Contacts
  // ========================

  contactNames(value: string[]): QuoteBuilder {
    this.data.contactNames = value;
    return this;
  }

  // ========================
  // Build
  // ========================

  /**
   * Build and return the QuoteData object
   */
  build(): QuoteData {
    return { ...this.data };
  }
}

// ========================
// Helper Functions
// ========================

/**
 * Generate unique quote description with timestamp
 */
export function generateQuoteDescription(prefix: string = 'Test Quote'): string {
  return `${prefix} ${Date.now()}`;
}

/**
 * Generate unique quote title
 */
export function generateQuoteTitle(prefix: string = 'Q'): string {
  return `${prefix}-${Date.now()}`;
}

/**
 * Generate unique quote reference number
 */
export function generateQuoteRef(prefix: string = 'QUOTE'): string {
  return `${prefix}-${Date.now()}`;
}
