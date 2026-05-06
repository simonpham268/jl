/**
 * Job API Test Data Helpers
 * For creating Job API request payloads
 */

import { formatDateLogged } from '../../utils/date.util';

// ========================
// Job API Data Functions
// ========================

/**
 * Creates test job data by resolving customerId, siteId, jobTypeId dynamically via services.
 * Use this in specs instead of createBasicApiJobData().
 */
export async function createJobTestData(
  jobService: { getDefaultJobTypeId: () => Promise<number> },
  customerService: { createCustomer: (d: { Name: string }) => Promise<{ body: { AdditionalData?: { CustomerId?: string | number; SiteId?: string | number } } | null }> },
): Promise<ReturnType<typeof createBasicApiJobData>> {
  const [jobTypeId, customerRes] = await Promise.all([
    jobService.getDefaultJobTypeId(),
    customerService.createCustomer({ Name: `Test Customer ${Date.now()}` }),
  ]);
  const customerId = Number(customerRes.body?.AdditionalData?.CustomerId);
  const siteId = Number(customerRes.body?.AdditionalData?.SiteId);
  if (!customerId || !siteId) throw new Error(`Failed to create test customer/site: ${JSON.stringify(customerRes.body)}`);
  return createBasicApiJobData(customerId, siteId, jobTypeId);
}

/**
 * Basic job data for API preconditions.
 * customerId and siteId come from CustomerService.createCustomer response.
 * jobTypeId comes from JobService.getDefaultJobTypeId().
 */
export function createBasicApiJobData(customerId: number, siteId: number, jobTypeId: number | string): any {
  return {
    JobCustomerId: customerId,
    JobSiteId: siteId,
    Description: `Job ${Date.now()}`,
    JobTypeId: jobTypeId,
    AssignedToUserId: parseInt(process.env.ASSIGNED_USER_ID ?? '2'),
    DateLogged: formatDateLogged(),
    RedirectToDetailPage: true,
  };
}

/**
 * Create API job data with custom description
 */
export function createApiJobData(customerId: number, siteId: number, jobTypeId: number | string, description: string, customFields: any = {}): any {
  return {
    ...createBasicApiJobData(customerId, siteId, jobTypeId),
    Description: description,
    ...customFields,
  };
}

// ========================
// Job API Data Builder
// ========================

/**
 * API Job Data Builder for complex customizations
 */
export class ApiJobDataBuilder {
  private data: any;

  constructor(customerId: number, siteId: number, jobTypeId: number | string) {
    this.data = {
      JobCustomerId: customerId,
      JobSiteId: siteId,
      Description: `Job ${Date.now()}`,
      JobTypeId: jobTypeId,
      DateLogged: formatDateLogged(),
    };
  }

  static create(customerId: number, siteId: number, jobTypeId: number | string): ApiJobDataBuilder {
    return new ApiJobDataBuilder(customerId, siteId, jobTypeId);
  }

  description(value: string): ApiJobDataBuilder {
    this.data.Description = value;
    return this;
  }

  customerId(value: number): ApiJobDataBuilder {
    this.data.JobCustomerId = value;
    return this;
  }

  siteId(value: number): ApiJobDataBuilder {
    this.data.JobSiteId = value;
    return this;
  }

  jobType(value: string): ApiJobDataBuilder {
    this.data.JobTypeId = value;
    return this;
  }

  assignedUser(value: number): ApiJobDataBuilder {
    this.data.AssignedToUserId = value;
    return this;
  }

  priority(value: string): ApiJobDataBuilder {
    this.data.Priority = value;
    return this;
  }

  customerOrderNumber(value: string): ApiJobDataBuilder {
    this.data.CustomerOrderNumber = value;
    return this;
  }

  referenceNumber(value: string): ApiJobDataBuilder {
    this.data.ReferenceNumber = value;
    return this;
  }

  tags(value: string[]): ApiJobDataBuilder {
    this.data.Tags = value;
    return this;
  }

  dateLogged(value: string): ApiJobDataBuilder {
    this.data.DateLogged = value;
    return this;
  }

  custom(field: string, value: any): ApiJobDataBuilder {
    this.data[field] = value;
    return this;
  }

  build(): any {
    return { ...this.data };
  }
}
