import { AssetData } from '../../pages/Assets/AssetPage';

/**
 * Asset Data Builder - Fluent API for creating asset test data
 * 
 * @example
 * // Simple asset
 * const asset = AssetBuilder.create('ABC Corp', 'Main Office', 'Air Conditioner').build();
 * 
 * // With more fields
 * const asset = AssetBuilder.create('ABC Corp', 'Main Office', 'Air Conditioner')
 *   .equipmentClass('HVAC')
 *   .make('Daikin')
 *   .model('FTX25')
 *   .serialNumber('SN-12345')
 *   .build();
 */
export class AssetBuilder {
  private data: AssetData;

  private constructor(customerName: string, siteName: string, description: string) {
    this.data = {
      customerName,
      siteName,
      description,
    };
  }

  /**
   * Create a new AssetBuilder with required fields
   */
  static create(customerName: string, siteName: string, description: string): AssetBuilder {
    return new AssetBuilder(customerName, siteName, description);
  }

  // ========================
  // Asset Details
  // ========================

  equipmentClass(value: string): AssetBuilder {
    this.data.equipmentClass = value;
    return this;
  }

  equipmentLibrary(value: string): AssetBuilder {
    this.data.equipmentLibrary = value;
    return this;
  }

  trades(value: string): AssetBuilder {
    this.data.trades = value;
    return this;
  }

  serviceType(value: string): AssetBuilder {
    this.data.serviceType = value;
    return this;
  }

  make(value: string): AssetBuilder {
    this.data.make = value;
    return this;
  }

  model(value: string): AssetBuilder {
    this.data.model = value;
    return this;
  }

  quantity(value: number): AssetBuilder {
    this.data.quantity = value;
    return this;
  }

  // ========================
  // Additional Information
  // ========================

  comments(value: string): AssetBuilder {
    this.data.comments = value;
    return this;
  }

  containsRefrigerant(value: boolean = true): AssetBuilder {
    this.data.containsRefrigerant = value;
    return this;
  }

  // ========================
  // Site Asset Details
  // ========================

  number(value: string): AssetBuilder {
    this.data.number = value;
    return this;
  }

  location(value: string): AssetBuilder {
    this.data.location = value;
    return this;
  }

  serialNumber(value: string): AssetBuilder {
    this.data.serialNumber = value;
    return this;
  }

  qrCode(value: string): AssetBuilder {
    this.data.qrCode = value;
    return this;
  }

  referenceNumber(value: string): AssetBuilder {
    this.data.referenceNumber = value;
    return this;
  }

  installationDate(value: string): AssetBuilder {
    this.data.installationDate = value;
    return this;
  }

  assetQuantity(value: number): AssetBuilder {
    this.data.assetQuantity = value;
    return this;
  }

  labourWarrantyExpiry(value: string): AssetBuilder {
    this.data.labourWarrantyExpiry = value;
    return this;
  }

  assetWarrantyExpiry(value: string): AssetBuilder {
    this.data.assetWarrantyExpiry = value;
    return this;
  }

  quotedReplacementDate(value: string): AssetBuilder {
    this.data.quotedReplacementDate = value;
    return this;
  }

  budgetReplacementCost(value: number): AssetBuilder {
    this.data.budgetReplacementCost = value;
    return this;
  }

  assetCondition(value: string): AssetBuilder {
    this.data.assetCondition = value;
    return this;
  }

  // ========================
  // Build
  // ========================

  /**
   * Build and return the AssetData object
   */
  build(): AssetData {
    return { ...this.data };
  }
}

// ========================
// Helper Functions
// ========================

/**
 * Generate unique asset description with timestamp
 */
export function generateAssetDescription(prefix: string = 'Test Asset'): string {
  return `${prefix} ${Date.now()}`;
}

/**
 * Generate unique serial number
 */
export function generateSerialNumber(prefix: string = 'SN'): string {
  return `${prefix}-${Date.now()}`;
}

/**
 * Generate unique QR code
 */
export function generateQrCode(prefix: string = 'QR'): string {
  return `${prefix}-${Date.now()}`;
}

/**
 * Generate unique reference number
 */
export function generateAssetRef(prefix: string = 'ASSET'): string {
  return `${prefix}-${Date.now()}`;
}
