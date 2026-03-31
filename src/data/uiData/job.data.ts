import type { JobData } from '../../pages/Jobs/JobPage';

/**
 * Job Data Builder - Fluent API for creating job test data
 *
 * @example
 * // Simple job
 * const job = JobBuilder.create('Customer A', 'Site A', 'Fix AC').build();
 *
 * // With more fields
 * const job = JobBuilder.create('Customer A', 'Site A', 'Fix AC')
 *   .jobType('Maintenance')
 *   .jobCategory('AC')
 *   .priorityLevel('Urgent')
 *   .engineer('John Doe')
 *   .build();
 */
export class JobBuilder {
  private data: JobData;

  private constructor(customerName: string, siteName: string, description: string) {
    this.data = {
      customerName,
      siteName,
      description,
    };
  }

  /**
   * Create a new JobBuilder with required fields
   */
  static create(customerName: string, siteName: string, description: string): JobBuilder {
    return new JobBuilder(customerName, siteName, description);
  }

  // ========================
  // Customer & Site
  // ========================

  logFromRecentJob(value: boolean = true): JobBuilder {
    this.data.logFromRecentJob = value;
    return this;
  }

  logFromTemplate(value: boolean = true): JobBuilder {
    this.data.logFromTemplate = value;
    return this;
  }

  // ========================
  // Job Details
  // ========================

  jobType(value: string): JobBuilder {
    this.data.jobType = value;
    return this;
  }

  jobCategory(value: string): JobBuilder {
    this.data.jobCategory = value;
    return this;
  }

  tags(value: string[]): JobBuilder {
    this.data.tags = value;
    return this;
  }

  primaryJobTrade(value: string): JobBuilder {
    this.data.primaryJobTrade = value;
    return this;
  }

  secondaryJobTrades(value: string[]): JobBuilder {
    this.data.secondaryJobTrades = value;
    return this;
  }

  customerOrderNumber(value: string): JobBuilder {
    this.data.customerOrderNumber = value;
    return this;
  }

  referenceNumber(value: string): JobBuilder {
    this.data.referenceNumber = value;
    return this;
  }

  jobOwner(value: string): JobBuilder {
    this.data.jobOwner = value;
    return this;
  }

  dateLogged(value: string): JobBuilder {
    this.data.dateLogged = value;
    return this;
  }

  // ========================
  // Job KPIs
  // ========================

  priorityLevel(value: string): JobBuilder {
    this.data.priorityLevel = value;
    return this;
  }

  completionTimeFromDateLogged(value: boolean = true): JobBuilder {
    this.data.completionTimeFromDateLogged = value;
    return this;
  }

  // ========================
  // Job Allocation
  // ========================

  preferredAppointmentDate(value: string): JobBuilder {
    this.data.preferredAppointmentDate = value;
    return this;
  }

  engineer(value: string): JobBuilder {
    this.data.engineer = value;
    return this;
  }

  engineerTeam(value: string): JobBuilder {
    this.data.engineerTeam = value;
    return this;
  }

  startDate(value: string): JobBuilder {
    this.data.startDate = value;
    return this;
  }

  endDate(value: string): JobBuilder {
    this.data.endDate = value;
    return this;
  }

  appointment(value: boolean = true): JobBuilder {
    this.data.appointment = value;
    return this;
  }

  lockVisitDateTime(value: boolean = true): JobBuilder {
    this.data.lockVisitDateTime = value;
    return this;
  }

  deployToMobile(value: boolean = true): JobBuilder {
    this.data.deployToMobile = value;
    return this;
  }

  // ========================
  // Recur Job
  // ========================

  recurJob(value: boolean = true): JobBuilder {
    this.data.recurJob = value;
    return this;
  }

  // ========================
  // Contacts
  // ========================

  contactNames(value: string[]): JobBuilder {
    this.data.contactNames = value;
    return this;
  }

  // ========================
  // Build
  // ========================

  /**
   * Build and return the JobData object
   */
  build(): JobData {
    return { ...this.data };
  }
}

// ========================
// Helper Functions
// ========================

/**
 * Generate unique description with timestamp
 */
export function generateDescription(prefix: string = 'Auto Job'): string {
  return `${prefix} - ${Date.now()}`;
}

/**
 * Generate unique reference number
 */
export function generateRefNumber(prefix: string = 'REF'): string {
  return `${prefix}-${Date.now()}`;
}
