/**
 * Asset API Test Data Helpers
 * For creating Asset API request payloads
 */

import { requireEnv } from '../../utils/require.env';

// ========================
// Asset API Data Functions
// ========================

/**
 * Create API asset data
 */
export function createBasicApiAssetData(): any {
  return {
    CustomerId: parseInt(requireEnv('CUSTOMER_ID')),
    SiteId: parseInt(requireEnv('SITE_ID_SECONDARY')),
    Description: `Asset ${Date.now()}`,
    Number: `${Date.now()}`,
    AssetConditionId: requireEnv('ASSET_CONDITION_ID'),
    Quantity: 1,
  };
}

/**
 * Create API asset data with custom fields
 */
export function createApiAssetData(description: string, customFields: any = {}): any {
  const basicData = createBasicApiAssetData();
  return {
    ...basicData,
    Description: description,
    Number: `${Date.now()}`,
    ...customFields
  };
}

// ========================
// Asset API Data Builder
// ========================

/**
 * API Asset Data Builder for complex customizations
 */
export class ApiAssetDataBuilder {
  private data: any;

  constructor() {
    this.data = {
      CustomerId: parseInt(requireEnv('CUSTOMER_ID')),
      SiteId: parseInt(requireEnv('SITE_ID_SECONDARY')),
      Description: `Asset ${Date.now()}`,
      Number: `${Date.now()}`,
      AssetConditionId: requireEnv('ASSET_CONDITION_ID'),
      Quantity: 1,
    };
  }

  static create(): ApiAssetDataBuilder {
    return new ApiAssetDataBuilder();
  }

  description(value: string): ApiAssetDataBuilder {
    this.data.Description = value;
    return this;
  }

  customerId(value: number): ApiAssetDataBuilder {
    this.data.CustomerId = value;
    return this;
  }

  siteId(value: number): ApiAssetDataBuilder {
    this.data.SiteId = value;
    return this;
  }

  number(value: string): ApiAssetDataBuilder {
    this.data.Number = value;
    return this;
  }

  assetConditionId(value: string): ApiAssetDataBuilder {
    this.data.AssetConditionId = value;
    return this;
  }

  quantity(value: number): ApiAssetDataBuilder {
    this.data.Quantity = value;
    return this;
  }

  make(value: string): ApiAssetDataBuilder {
    this.data.Make = value;
    return this;
  }

  model(value: string): ApiAssetDataBuilder {
    this.data.Model = value;
    return this;
  }

  serialNumber(value: string): ApiAssetDataBuilder {
    this.data.SerialNumber = value;
    return this;
  }

  location(value: string): ApiAssetDataBuilder {
    this.data.Location = value;
    return this;
  }

  custom(field: string, value: any): ApiAssetDataBuilder {
    this.data[field] = value;
    return this;
  }

  build(): any {
    return { ...this.data };
  }
}
