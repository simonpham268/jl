/**
 * Batch Invoice Data Module
 * Builder pattern for creating test data for Batch Invoice page
 */

import { BatchJobStatus } from '../../pages/Invoices/BatchInvoicePage';

/**
 * Data interface for creating a Batch of Invoices
 */
export interface BatchInvoiceData {
  startDate: string;
  endDate: string;
  jobNumbers: string[];
  customers?: string[];
  searchText?: string;
  statuses?: BatchJobStatus[];
  jobCategories?: string[];
}

/**
 * BatchInvoiceBuilder - Fluent builder for BatchInvoiceData
 * 
 * @example
 * // Create with required fields only  
 * const invoiceData = BatchInvoiceBuilder
 *   .create('01/01/2024', '31/12/2024', ['JOB-001', 'JOB-002'])
 *   .build();
 * 
 * @example
 * // Create with additional filters
 * const invoiceData = BatchInvoiceBuilder
 *   .create('01/01/2024', '31/12/2024', ['JOB-001'])
 *   .withCustomers(['ACME Corp', 'Tech Ltd'])
 *   .withSearchText('Maintenance')
 *   .withStatuses(['Complete'])
 *   .build();
 */
export class BatchInvoiceBuilder {
  private data: BatchInvoiceData;

  private constructor(startDate: string, endDate: string, jobNumbers: string[]) {
    this.data = {
      startDate,
      endDate,
      jobNumbers
    };
  }

  /**
   * Create a new builder with required fields
   * @param startDate - Start date for date logged filter (required)
   * @param endDate - End date for date logged filter (required)
   * @param jobNumbers - Array of job numbers to select (required, at least 1)
   */
  static create(startDate: string, endDate: string, jobNumbers: string[]): BatchInvoiceBuilder {
    return new BatchInvoiceBuilder(startDate, endDate, jobNumbers);
  }

  /**
   * Add customers filter
   */
  withCustomers(customers: string[]): BatchInvoiceBuilder {
    this.data.customers = customers;
    return this;
  }

  /**
   * Add search text filter
   */
  withSearchText(searchText: string): BatchInvoiceBuilder {
    this.data.searchText = searchText;
    return this;
  }

  /**
   * Add status filters
   */
  withStatuses(statuses: BatchJobStatus[]): BatchInvoiceBuilder {
    this.data.statuses = statuses;
    return this;
  }

  /**
   * Add job category filters
   */
  withJobCategories(jobCategories: string[]): BatchInvoiceBuilder {
    this.data.jobCategories = jobCategories;
    return this;
  }

  /**
   * Add additional job numbers to select
   */
  withAdditionalJobs(jobNumbers: string[]): BatchInvoiceBuilder {
    this.data.jobNumbers = [...this.data.jobNumbers, ...jobNumbers];
    return this;
  }

  /**
   * Build the final BatchInvoiceData object
   */
  build(): BatchInvoiceData {
    return { ...this.data };
  }
}
