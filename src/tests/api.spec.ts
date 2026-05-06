import {
  createBasicApiAssetData
} from '../data/apiData/asset.api.data';
import {
  ApiCustomerDataBuilder,
  createBasicApiCustomerData
} from '../data/apiData/customer.api.data';
import {
  ApiJobDataBuilder,
  createJobTestData,
} from '../data/apiData/job.api.data';
import {
  createBasicApiPPMQuoteData
} from '../data/apiData/ppm.api.data';
import {
  createBasicApiQuoteData
} from '../data/apiData/quote.api.data';
import {
  createBasicApiSiteData
} from '../data/apiData/site.api.data';
import { test } from '../fixtures/combined.fixture';

test.describe('try with api call', () => {
  test('[TC107379] create job', async ({ jobService, customerService }) => {
    const response = await jobService.createJob(await createJobTestData(jobService, customerService));
    console.log('Response:', JSON.stringify(response, null, 2));
  });

  test('[TC107370] create customer', async ({ customerService }) => {
    const response = await customerService.createCustomer(createBasicApiCustomerData());
    console.log('Response:', JSON.stringify(response, null, 2));
  });

  test('[TC107371] add site', async ({ siteService }) => {
    const response = await siteService.createSite(createBasicApiSiteData());
    console.log('Response:', JSON.stringify(response, null, 2));
  });

  test('[TC107371] add asset', async ({ assetService }) => {
    const response = await assetService.createAsset(createBasicApiAssetData());
    console.log('Response:', JSON.stringify(response, null, 2));
  });

  test('[TC107371] add quote', async ({ quoteService }) => {
    const response = await quoteService.createQuote(createBasicApiQuoteData());
    console.log('Response:', JSON.stringify(response, null, 2));
  });

  test('[TC107371] add ppm quote', async ({ ppmQuoteService }) => {
    const response = await ppmQuoteService.createPPMQuote(createBasicApiPPMQuoteData());
    console.log('Response:', JSON.stringify(response, null, 2));
  });

  // ========================
  // Advanced API Data Examples
  // ========================

  test('[TC107380] create job with custom fields', async ({ jobService, customerService }) => {
    const base = await createJobTestData(jobService, customerService);
    const jobWithFields = {
      ...base,
      Description: 'Priority Maintenance',
      Priority: 'High',
      CustomerOrderNumber: 'PO-2026-001',
      ReferenceNumber: 'REF-12345',
    };

    const response = await jobService.createJob(jobWithFields);
    console.log('Job with custom fields:', JSON.stringify(response, null, 2));
  });

  test('[TC107381] create complex job with builder', async ({ jobService, customerService }) => {
    const base = await createJobTestData(jobService, customerService);
    const complexJob = ApiJobDataBuilder.create(base.JobCustomerId, base.JobSiteId, base.JobTypeId)
      .description('Emergency HVAC Repair')
      .priority('Critical')
      .customerOrderNumber('EMERGENCY-789')
      .referenceNumber('REF-2026-EMERG')
      .tags(['urgent', 'hvac', 'emergency'])
      .custom('SpecialInstructions', 'Call customer before arrival')
      .custom('EstimatedDuration', '2-4 hours')
      .build();

    const response = await jobService.createJob(complexJob);
    console.log('Complex job:', JSON.stringify(response, null, 2));
  });

  test('[TC107382] create premium customer with builder', async ({ customerService }) => {
    // Method 3: Customer Builder with multiple fields
    const premiumCustomer = ApiCustomerDataBuilder.create()
      .name('Premium Enterprise Ltd')
      .email('admin@premium-enterprise.com')
      .phone('+44 20 7123 4567')
      .address('123 Premium Street, London SW1A 1AA')
      .customerType('Corporate')
      .custom('CreditLimit', 100000)
      .custom('AccountManager', 'John Smith')
      .custom('PreferredPaymentTerms', '30 days')
      .build();

    const response = await customerService.createCustomer(premiumCustomer);
    console.log('Premium customer:', JSON.stringify(response, null, 2));
  });
});
