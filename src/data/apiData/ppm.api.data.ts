/**
 * PPM Quote API Test Data Helpers
 * For creating PPM Quote API request payloads
 */

import { requireEnv } from '../../utils/require.env';
import { getTodayDate, getNextMonthDate } from '../../utils/date.util';

// ========================
// PPM Quote API Data Functions
// ========================

/**
 * Create API PPM quote data
 */
export function createBasicApiPPMQuoteData(): any {
  return {
    PPMCustomerId: parseInt(requireEnv('CUSTOMER_ID')),
    PPMSiteId: parseInt(requireEnv('SITE_ID')),
    PPMSellingRateId: parseInt(requireEnv('PPM_SELLING_RATE_ID')),
    StartDate: getTodayDate(),
    EndDate: getNextMonthDate(),
  };
}

/**
 * Create API PPM quote data with custom dates
 */
export function createApiPPMQuoteData(startDate?: string, endDate?: string, customFields: any = {}): any {
  const basicData = createBasicApiPPMQuoteData();
  return {
    ...basicData,
    StartDate: startDate || basicData.StartDate,
    EndDate: endDate || basicData.EndDate,
    ...customFields
  };
}

// ========================
// PPM Quote API Data Builder
// ========================

/**
 * API PPM Quote Data Builder for complex customizations
 */
export class ApiPPMQuoteDataBuilder {
  private data: any;

  constructor() {
    this.data = {
      PPMCustomerId: parseInt(requireEnv('CUSTOMER_ID')),
      PPMSiteId: parseInt(requireEnv('SITE_ID')),
      PPMSellingRateId: parseInt(requireEnv('PPM_SELLING_RATE_ID')),
      StartDate: getTodayDate(),
      EndDate: getNextMonthDate(),
    };
  }

  static create(): ApiPPMQuoteDataBuilder {
    return new ApiPPMQuoteDataBuilder();
  }

  customerId(value: number): ApiPPMQuoteDataBuilder {
    this.data.PPMCustomerId = value;
    return this;
  }

  siteId(value: number): ApiPPMQuoteDataBuilder {
    this.data.PPMSiteId = value;
    return this;
  }

  sellingRateId(value: number): ApiPPMQuoteDataBuilder {
    this.data.PPMSellingRateId = value;
    return this;
  }

  startDate(value: string): ApiPPMQuoteDataBuilder {
    this.data.StartDate = value;
    return this;
  }

  endDate(value: string): ApiPPMQuoteDataBuilder {
    this.data.EndDate = value;
    return this;
  }

  description(value: string): ApiPPMQuoteDataBuilder {
    this.data.Description = value;
    return this;
  }

  contractType(value: string): ApiPPMQuoteDataBuilder {
    this.data.ContractType = value;
    return this;
  }

  frequency(value: string): ApiPPMQuoteDataBuilder {
    this.data.Frequency = value;
    return this;
  }

  terms(value: string): ApiPPMQuoteDataBuilder {
    this.data.Terms = value;
    return this;
  }

  notes(value: string): ApiPPMQuoteDataBuilder {
    this.data.Notes = value;
    return this;
  }

  custom(field: string, value: any): ApiPPMQuoteDataBuilder {
    this.data[field] = value;
    return this;
  }

  build(): any {
    return { ...this.data };
  }
}
