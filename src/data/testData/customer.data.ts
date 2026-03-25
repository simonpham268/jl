import { CustomerData } from '../../pages/Customers/CustomerPage';

/**
 * Customer Data Builder - Fluent API for creating customer test data
 * 
 * @example
 * // Simple customer
 * const customer = CustomerBuilder.create('ABC Company').build();
 * 
 * // With more fields
 * const customer = CustomerBuilder.create('ABC Company')
 *   .customerType('Commercial')
 *   .address('123 Main Street')
 *   .city('London')
 *   .postcode('SW1A 1AA')
 *   .contact('John', 'Doe', 'john@abc.com')
 *   .build();
 */
export class CustomerBuilder {
  private data: CustomerData;

  private constructor(customerName: string) {
    this.data = { customerName };
  }

  /**
   * Create a new CustomerBuilder with required customer name
   */
  static create(customerName: string): CustomerBuilder {
    return new CustomerBuilder(customerName);
  }

  // ========================
  // Details
  // ========================

  tags(value: string[]): CustomerBuilder {
    this.data.tags = value;
    return this;
  }

  customerType(value: string): CustomerBuilder {
    this.data.customerType = value;
    return this;
  }

  referenceNumber(value: string): CustomerBuilder {
    this.data.referenceNumber = value;
    return this;
  }

  accountNumber(value: string): CustomerBuilder {
    this.data.accountNumber = value;
    return this;
  }

  sellingRate(value: string): CustomerBuilder {
    this.data.sellingRate = value;
    return this;
  }

  accountManager(value: string): CustomerBuilder {
    this.data.accountManager = value;
    return this;
  }

  // ========================
  // Address
  // ========================

  address(value: string): CustomerBuilder {
    this.data.address = value;
    return this;
  }

  area(value: string): CustomerBuilder {
    this.data.area = value;
    return this;
  }

  city(value: string): CustomerBuilder {
    this.data.city = value;
    return this;
  }

  county(value: string): CustomerBuilder {
    this.data.county = value;
    return this;
  }

  postcode(value: string): CustomerBuilder {
    this.data.postcode = value;
    return this;
  }

  telephone(value: string, countryCode?: string): CustomerBuilder {
    this.data.telephone = value;
    if (countryCode) this.data.countryCode = countryCode;
    return this;
  }

  // ========================
  // Main Contact
  // ========================

  firstName(value: string): CustomerBuilder {
    this.data.firstName = value;
    return this;
  }

  lastName(value: string): CustomerBuilder {
    this.data.lastName = value;
    return this;
  }

  /**
   * Set contact name (firstName + lastName)
   */
  contactName(firstName: string, lastName: string): CustomerBuilder {
    this.data.firstName = firstName;
    this.data.lastName = lastName;
    return this;
  }

  email(value: string): CustomerBuilder {
    this.data.email = value;
    return this;
  }

  jobPosition(value: string): CustomerBuilder {
    this.data.jobPosition = value;
    return this;
  }

  contactTelephone(value: string, countryCode?: string): CustomerBuilder {
    this.data.contactTelephone = value;
    if (countryCode) this.data.contactCountryCode = countryCode;
    return this;
  }

  /**
   * Set all main contact fields at once
   */
  contact(firstName: string, lastName: string, email?: string): CustomerBuilder {
    this.data.firstName = firstName;
    this.data.lastName = lastName;
    if (email) this.data.email = email;
    return this;
  }

  // ========================
  // Options
  // ========================

  autoGenerateSite(value: boolean = true): CustomerBuilder {
    this.data.autoGenerateSite = value;
    return this;
  }

  // ========================
  // Build
  // ========================

  /**
   * Build and return the CustomerData object
   */
  build(): CustomerData {
    return { ...this.data };
  }
}

// ========================
// Helper Functions
// ========================

/**
 * Generate unique customer name with timestamp
 */
export function generateCustomerName(prefix: string = 'Test Customer'): string {
  return `${prefix} ${Date.now()}`;
}

/**
 * Generate unique email
 */
export function generateEmail(prefix: string = 'test'): string {
  return `${prefix}.${Date.now()}@example.com`;
}

/**
 * Generate unique reference number
 */
export function generateCustomerRef(prefix: string = 'CUST'): string {
  return `${prefix}-${Date.now()}`;
}
