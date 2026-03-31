/**
 * Job API Test Data Helpers
 * For creating Job API request payloads
 */

import { requireEnv } from '../../utils/require.env';
import { formatDateLogged } from '../../utils/date.util';

// ========================
// Job API Data Functions
// ========================

/**
 * Basic job data for API preconditions using environment variables
 */
export function createBasicApiJobData(): any {
  return {
    JobCustomerId: parseInt(requireEnv('CUSTOMER_ID')),
    JobSiteId: parseInt(requireEnv('SITE_ID')),
    Description: `Job ${Date.now()}`,
    JobTypeId: requireEnv('JOB_TYPE_ID'),
    AssignedToUserId: parseInt(requireEnv('ASSIGNED_USER_ID')),
    DateLogged: formatDateLogged()
  };
}

/**
 * Create API job data with custom description
 */
export function createApiJobData(description: string, customFields: any = {}): any {
  const basicData = createBasicApiJobData();
  return {
    ...basicData,
    Description: description,
    ...customFields
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

  constructor() {
    this.data = {
      JobCustomerId: parseInt(requireEnv('CUSTOMER_ID')),
      JobSiteId: parseInt(requireEnv('SITE_ID')),
      Description: `Job ${Date.now()}`,
      JobTypeId: requireEnv('JOB_TYPE_ID'),
      AssignedToUserId: parseInt(requireEnv('ASSIGNED_USER_ID')),
      DateLogged: formatDateLogged()
    };
  }

  static create(): ApiJobDataBuilder {
    return new ApiJobDataBuilder();
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
