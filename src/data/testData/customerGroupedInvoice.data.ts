/**
 * Customer Grouped Invoice Data Module
 * Builder pattern for creating test data for Customer Grouped Invoice page
 */

import type { InvoiceJobStatus, InvoiceOrderBy } from '../../pages/Invoices/CustomerGroupedInvoicePage';

/**
 * Data interface for creating a Customer Grouped Invoice
 */
export interface CustomerGroupedInvoiceData {
  customer: string;
  jobNumbers: string[];
  searchText?: string;
  startDate?: string;
  endDate?: string;
  statuses?: InvoiceJobStatus[];
  orderBy?: InvoiceOrderBy;
}

/**
 * CustomerGroupedInvoiceBuilder - Fluent builder for CustomerGroupedInvoiceData
 *
 * @example
 * // Create with required fields only
 * const invoiceData = CustomerGroupedInvoiceBuilder
 *   .create('ACME Corp', ['JOB-001', 'JOB-002'])
 *   .build();
 *
 * @example
 * // Create with additional filters
 * const invoiceData = CustomerGroupedInvoiceBuilder
 *   .create('ACME Corp', ['JOB-001'])
 *   .withSearchText('Repair')
 *   .withDateRange('01/01/2024', '31/12/2024')
 *   .withOrderBy('Date Logged (Newest)')
 *   .build();
 */
export class CustomerGroupedInvoiceBuilder {
  private data: CustomerGroupedInvoiceData;

  private constructor(customer: string, jobNumbers: string[]) {
    this.data = {
      customer,
      jobNumbers
    };
  }

  /**
   * Create a new builder with required fields
   * @param customer - Customer name (required)
   * @param jobNumbers - Array of job numbers to select (required, at least 1)
   */
  static create(customer: string, jobNumbers: string[]): CustomerGroupedInvoiceBuilder {
    return new CustomerGroupedInvoiceBuilder(customer, jobNumbers);
  }

  /**
   * Add search text filter
   */
  withSearchText(searchText: string): CustomerGroupedInvoiceBuilder {
    this.data.searchText = searchText;
    return this;
  }

  /**
   * Add date range filter
   */
  withDateRange(startDate: string, endDate: string): CustomerGroupedInvoiceBuilder {
    this.data.startDate = startDate;
    this.data.endDate = endDate;
    return this;
  }

  /**
   * Add start date filter
   */
  withStartDate(startDate: string): CustomerGroupedInvoiceBuilder {
    this.data.startDate = startDate;
    return this;
  }

  /**
   * Add end date filter
   */
  withEndDate(endDate: string): CustomerGroupedInvoiceBuilder {
    this.data.endDate = endDate;
    return this;
  }

  /**
   * Add status filters
   */
  withStatuses(statuses: InvoiceJobStatus[]): CustomerGroupedInvoiceBuilder {
    this.data.statuses = statuses;
    return this;
  }

  /**
   * Add order by option
   */
  withOrderBy(orderBy: InvoiceOrderBy): CustomerGroupedInvoiceBuilder {
    this.data.orderBy = orderBy;
    return this;
  }

  /**
   * Add additional job numbers to select
   */
  withAdditionalJobs(jobNumbers: string[]): CustomerGroupedInvoiceBuilder {
    this.data.jobNumbers = [...this.data.jobNumbers, ...jobNumbers];
    return this;
  }

  /**
   * Build the final CustomerGroupedInvoiceData object
   */
  build(): CustomerGroupedInvoiceData {
    return { ...this.data };
  }
}
