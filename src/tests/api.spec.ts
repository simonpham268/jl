import { expect, test } from '../fixtures/combined.fixture';

test.describe('try with api call', () => {
    test('[TC107370] create customer', async ({ customerService }) => {
        const response = await customerService.createCustomer({
            Name: 'Testv2',
        });
        console.log('Response:', JSON.stringify(response, null, 2));
    });

    test('[TC107371] add site', async ({ siteService }) => {
        const response = await siteService.createSite({
            CustomerId: 3829952,
            CustomerName: 'Sauer - ThielEino5zpbp',
            Name: 'Site 1',
        });
        console.log('Response:', JSON.stringify(response, null, 2));
    });

    test('[TC107371] add asset', async ({ assetService }) => {
        const response = await assetService.createAsset({
            CustomerId: 3829952,
            SiteId: 18914656,
            Description: 'Air Conditioning Unit2',
            Number: '1002',
            AssetConditionId: "53278",
            Quantity: 1,
        });
        console.log('Response:', JSON.stringify(response, null, 2));
    });

    test('[TC107371] add quote', async ({ quoteService }) => {
        const response = await quoteService.createQuote({
            QuoteCustomerId: 3829952,
            QuoteSiteId: 6158191,
            Description: 'Quote22222',
            JobTypeId: '52394',
            AssignedToUserId: 2
        });
        console.log('Response:', JSON.stringify(response, null, 2));
    });

    test('[TC107371] add ppm quote', async ({ ppmQuoteService }) => {
        const response = await ppmQuoteService.createPPMQuote({
            PPMCustomerId: 3829952,
            PPMSiteId: 6158191,
            PPMSellingRateId: 67287,
            StartDate: '24/03/2026',
            EndDate: '24/04/2026',
        });
        console.log('Response:', JSON.stringify(response, null, 2));
    });
});