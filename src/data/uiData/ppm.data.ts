/**
 * PPM Data Module
 * Builder pattern for creating test data for PPM (Planned Preventative Maintenance) page
 */

import type { PPMContractType } from '../../pages/PPM/PPMPage';

/**
 * Data interface for creating a PPM Quote or Contract
 */
export interface PPMData {
  contractType: PPMContractType;
  customer: string;
  site: string;
  description: string;
  planReference?: string;
  jobCategory?: string;
  accountManager?: string;
  tags?: string[];
}

/**
 * PPMBuilder - Fluent builder for PPMData
 *
 * @example
 * // Create PPM Quote with required fields only
 * const ppmData = PPMBuilder
 *   .createQuote('ABC Corp', 'Main Office', 'Annual HVAC Maintenance')
 *   .build();
 *
 * @example
 * // Create PPM Contract with additional fields
 * const ppmData = PPMBuilder
 *   .createContract('ABC Corp', 'Main Office', 'Quarterly Fire Safety Inspection')
 *   .planReference('PPM-2024-001')
 *   .jobCategory('Fire Safety')
 *   .accountManager('John Smith')
 *   .tags(['Priority', 'Annual'])
 *   .build();
 */
export class PPMBuilder {
  private data: PPMData;

  private constructor(contractType: PPMContractType, customer: string, site: string, description: string) {
    this.data = {
      contractType,
      customer,
      site,
      description
    };
  }

  /**
   * Create a new PPM Quote builder with required fields
   * @param customer - Customer name (required)
   * @param site - Site name (required)
   * @param description - PPM description (required)
   */
  static createQuote(customer: string, site: string, description: string): PPMBuilder {
    return new PPMBuilder('PPM Quote', customer, site, description);
  }

  /**
   * Create a new PPM Contract builder with required fields
   * @param customer - Customer name (required)
   * @param site - Site name (required)
   * @param description - PPM description (required)
   */
  static createContract(customer: string, site: string, description: string): PPMBuilder {
    return new PPMBuilder('PPM Contract', customer, site, description);
  }

  /**
   * Set plan reference
   */
  planReference(planReference: string): PPMBuilder {
    this.data.planReference = planReference;
    return this;
  }

  /**
   * Set job category
   */
  jobCategory(jobCategory: string): PPMBuilder {
    this.data.jobCategory = jobCategory;
    return this;
  }

  /**
   * Set account manager
   */
  accountManager(accountManager: string): PPMBuilder {
    this.data.accountManager = accountManager;
    return this;
  }

  /**
   * Set tags
   */
  tags(tags: string[]): PPMBuilder {
    this.data.tags = tags;
    return this;
  }

  /**
   * Build the final PPMData object
   */
  build(): PPMData {
    return { ...this.data };
  }
}

// ========================
// Helper Functions
// ========================

/**
 * Generate unique PPM description with timestamp
 */
export function generatePPMDescription(prefix: string = 'Auto PPM'): string {
  return `${prefix} - ${Date.now()}`;
}

/**
 * Generate unique plan reference
 */
export function generatePlanReference(prefix: string = 'PPM'): string {
  return `${prefix}-${Date.now()}`;
}
