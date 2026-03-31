/**
 * Quote API Test Data Helpers
 * For creating Quote API request payloads
 */

import { requireEnv } from '../../utils/require.env';

// ========================
// Quote API Data Functions
// ========================

/**
 * Create API quote data
 */
export function createBasicApiQuoteData(): any {
  return {
    QuoteCustomerId: parseInt(requireEnv('CUSTOMER_ID')),
    QuoteSiteId: parseInt(requireEnv('SITE_ID')),
    Description: `Quote ${Date.now()}`,
    JobTypeId: requireEnv('JOB_TYPE_ID'),
    AssignedToUserId: parseInt(requireEnv('ASSIGNED_USER_ID'))
  };
}

/**
 * Create API quote data with custom fields
 */
export function createApiQuoteData(description: string, customFields: any = {}): any {
  const basicData = createBasicApiQuoteData();
  return {
    ...basicData,
    Description: description,
    ...customFields
  };
}

// ========================
// Quote API Data Builder
// ========================

/**
 * API Quote Data Builder for complex customizations
 */
export class ApiQuoteDataBuilder {
  private data: any;

  constructor() {
    this.data = {
      QuoteCustomerId: parseInt(requireEnv('CUSTOMER_ID')),
      QuoteSiteId: parseInt(requireEnv('SITE_ID')),
      Description: `Quote ${Date.now()}`,
      JobTypeId: requireEnv('JOB_TYPE_ID'),
      AssignedToUserId: parseInt(requireEnv('ASSIGNED_USER_ID'))
    };
  }

  static create(): ApiQuoteDataBuilder {
    return new ApiQuoteDataBuilder();
  }

  description(value: string): ApiQuoteDataBuilder {
    this.data.Description = value;
    return this;
  }

  customerId(value: number): ApiQuoteDataBuilder {
    this.data.QuoteCustomerId = value;
    return this;
  }

  siteId(value: number): ApiQuoteDataBuilder {
    this.data.QuoteSiteId = value;
    return this;
  }

  jobType(value: string): ApiQuoteDataBuilder {
    this.data.JobTypeId = value;
    return this;
  }

  assignedUser(value: number): ApiQuoteDataBuilder {
    this.data.AssignedToUserId = value;
    return this;
  }

  validUntil(value: string): ApiQuoteDataBuilder {
    this.data.ValidUntil = value;
    return this;
  }

  terms(value: string): ApiQuoteDataBuilder {
    this.data.Terms = value;
    return this;
  }

  notes(value: string): ApiQuoteDataBuilder {
    this.data.Notes = value;
    return this;
  }

  customerOrderNumber(value: string): ApiQuoteDataBuilder {
    this.data.CustomerOrderNumber = value;
    return this;
  }

  referenceNumber(value: string): ApiQuoteDataBuilder {
    this.data.ReferenceNumber = value;
    return this;
  }

  custom(field: string, value: any): ApiQuoteDataBuilder {
    this.data[field] = value;
    return this;
  }

  build(): any {
    return { ...this.data };
  }
}
