import { SiteData } from '../../pages/Sites/SitePage';

/**
 * Site Data Builder - Fluent API for creating site test data
 * 
 * @example
 * // Simple site
 * const site = SiteBuilder.create('ABC Corp', 'Main Office').build();
 * 
 * // With more fields
 * const site = SiteBuilder.create('ABC Corp', 'Main Office')
 *   .address('123 Main Street')
 *   .city('London')
 *   .postcode('SW1A 1AA')
 *   .contact('John', 'Doe', 'john@abc.com')
 *   .build();
 */
export class SiteBuilder {
  private data: SiteData;

  private constructor(customerName: string, siteName: string) {
    this.data = {
      customerName,
      siteName,
    };
  }

  /**
   * Create a new SiteBuilder with required fields
   */
  static create(customerName: string, siteName: string): SiteBuilder {
    return new SiteBuilder(customerName, siteName);
  }

  // ========================
  // Details
  // ========================

  tags(value: string[]): SiteBuilder {
    this.data.tags = value;
    return this;
  }

  accountManager(value: string): SiteBuilder {
    this.data.accountManager = value;
    return this;
  }

  postcode(value: string): SiteBuilder {
    this.data.postcode = value;
    return this;
  }

  telephone(value: string, countryCode?: string): SiteBuilder {
    this.data.telephone = value;
    if (countryCode) this.data.countryCode = countryCode;
    return this;
  }

  area(value: string): SiteBuilder {
    this.data.area = value;
    return this;
  }

  siteReferenceNumber(value: string): SiteBuilder {
    this.data.siteReferenceNumber = value;
    return this;
  }

  // ========================
  // Address
  // ========================

  address(value: string): SiteBuilder {
    this.data.address = value;
    return this;
  }

  addressArea(value: string): SiteBuilder {
    this.data.addressArea = value;
    return this;
  }

  city(value: string): SiteBuilder {
    this.data.city = value;
    return this;
  }

  county(value: string): SiteBuilder {
    this.data.county = value;
    return this;
  }

  // ========================
  // Main Contact
  // ========================

  firstName(value: string): SiteBuilder {
    this.data.firstName = value;
    return this;
  }

  lastName(value: string): SiteBuilder {
    this.data.lastName = value;
    return this;
  }

  /**
   * Set contact name (firstName + lastName)
   */
  contactName(firstName: string, lastName: string): SiteBuilder {
    this.data.firstName = firstName;
    this.data.lastName = lastName;
    return this;
  }

  email(value: string): SiteBuilder {
    this.data.email = value;
    return this;
  }

  jobPosition(value: string): SiteBuilder {
    this.data.jobPosition = value;
    return this;
  }

  contactTelephone(value: string, countryCode?: string): SiteBuilder {
    this.data.contactTelephone = value;
    if (countryCode) this.data.contactCountryCode = countryCode;
    return this;
  }

  /**
   * Set all main contact fields at once
   */
  contact(firstName: string, lastName: string, email?: string): SiteBuilder {
    this.data.firstName = firstName;
    this.data.lastName = lastName;
    if (email) this.data.email = email;
    return this;
  }

  // ========================
  // Build
  // ========================

  /**
   * Build and return the SiteData object
   */
  build(): SiteData {
    return { ...this.data };
  }
}

// ========================
// Helper Functions
// ========================

/**
 * Generate unique site name with timestamp
 */
export function generateSiteName(prefix: string = 'Test Site'): string {
  return `${prefix} ${Date.now()}`;
}

/**
 * Generate unique site reference number
 */
export function generateSiteRef(prefix: string = 'SITE'): string {
  return `${prefix}-${Date.now()}`;
}
