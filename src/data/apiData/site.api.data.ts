/**
 * Site API Test Data Helpers
 * For creating Site API request payloads
 */

import { requireEnv } from '../../utils/require.env';

// ========================
// Site API Data Functions
// ========================

/**
 * Create API site data
 */
export function createBasicApiSiteData(): any {
  return {
    CustomerId: parseInt(requireEnv('CUSTOMER_ID')),
    CustomerName: requireEnv('CUSTOMER_NAME'),
    Name: `Site ${Date.now()}`,
  };
}

/**
 * Create API site data with custom fields
 */
export function createApiSiteData(name: string, customerId?: number, customFields: any = {}): any {
  return {
    CustomerId: customerId || parseInt(requireEnv('CUSTOMER_ID')),
    CustomerName: requireEnv('CUSTOMER_NAME'),
    Name: name,
    ...customFields
  };
}

// ========================
// Site API Data Builder
// ========================

/**
 * API Site Data Builder for complex customizations
 */
export class ApiSiteDataBuilder {
  private data: any;

  constructor() {
    this.data = {
      CustomerId: parseInt(requireEnv('CUSTOMER_ID')),
      CustomerName: requireEnv('CUSTOMER_NAME'),
      Name: `Site ${Date.now()}`,
    };
  }

  static create(): ApiSiteDataBuilder {
    return new ApiSiteDataBuilder();
  }

  name(value: string): ApiSiteDataBuilder {
    this.data.Name = value;
    return this;
  }

  customerId(value: number): ApiSiteDataBuilder {
    this.data.CustomerId = value;
    return this;
  }

  customerName(value: string): ApiSiteDataBuilder {
    this.data.CustomerName = value;
    return this;
  }

  address(value: string): ApiSiteDataBuilder {
    this.data.Address = value;
    return this;
  }

  area(value: string): ApiSiteDataBuilder {
    this.data.Area = value;
    return this;
  }

  city(value: string): ApiSiteDataBuilder {
    this.data.City = value;
    return this;
  }

  county(value: string): ApiSiteDataBuilder {
    this.data.County = value;
    return this;
  }

  postcode(value: string): ApiSiteDataBuilder {
    this.data.Postcode = value;
    return this;
  }

  telephone(value: string): ApiSiteDataBuilder {
    this.data.Telephone = value;
    return this;
  }

  custom(field: string, value: any): ApiSiteDataBuilder {
    this.data[field] = value;
    return this;
  }

  build(): any {
    return { ...this.data };
  }
}
