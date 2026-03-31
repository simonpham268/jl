/**
 * Customer API Test Data Helpers
 * For creating Customer API request payloads
 */

// ========================
// Customer API Data Functions
// ========================

/**
 * Create API customer data
 */
export function createBasicApiCustomerData(): any {
  return {
    Name: `Customer ${Date.now()}`,
  };
}

/**
 * Create API customer data with custom name
 */
export function createApiCustomerData(name: string, customFields: any = {}): any {
  return {
    Name: name,
    ...customFields
  };
}

// ========================
// Customer API Data Builder
// ========================

/**
 * API Customer Data Builder for complex customizations
 */
export class ApiCustomerDataBuilder {
  private data: any;

  constructor() {
    this.data = {
      Name: `Customer ${Date.now()}`,
    };
  }

  static create(): ApiCustomerDataBuilder {
    return new ApiCustomerDataBuilder();
  }

  name(value: string): ApiCustomerDataBuilder {
    this.data.Name = value;
    return this;
  }

  email(value: string): ApiCustomerDataBuilder {
    this.data.Email = value;
    return this;
  }

  phone(value: string): ApiCustomerDataBuilder {
    this.data.Phone = value;
    return this;
  }

  address(value: string): ApiCustomerDataBuilder {
    this.data.Address = value;
    return this;
  }

  customerType(value: string): ApiCustomerDataBuilder {
    this.data.CustomerType = value;
    return this;
  }

  accountNumber(value: string): ApiCustomerDataBuilder {
    this.data.AccountNumber = value;
    return this;
  }

  referenceNumber(value: string): ApiCustomerDataBuilder {
    this.data.ReferenceNumber = value;
    return this;
  }

  custom(field: string, value: any): ApiCustomerDataBuilder {
    this.data[field] = value;
    return this;
  }

  build(): any {
    return { ...this.data };
  }
}
