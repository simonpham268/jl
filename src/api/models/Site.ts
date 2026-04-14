export interface Site {
    id: string | number;
    customerId: string | number;
    customerName: string;
    name: string;
    address1?: string;
    address2?: string;
    address3?: string;
    address4?: string;
    postcode?: string;
    telephone?: string;
    contactFirstName?: string;
    contactLastName?: string;
    contactEmail?: string;
    contactTelephone?: string;
    contactPosition?: string;
    customReference?: string;
    latitude?: string | number;
    longitude?: string | number;
    accountManagerId?: string | number;
    parentSiteId?: string | number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateSiteRequest {
    // Required fields
    CustomerId: string | number;
    CustomerName: string;
    Name: string;

    // Optional - Address
    AreaId?: string | number;
    Address1?: string;
    Address2?: string;
    Address3?: string;
    Address4?: string;
    Postcode?: string;
    Telephone?: string;
    FullTelephone?: string;
    Latitude?: string | number;
    Longitude?: string | number;

    // Optional - Contact
    ContactFirstName?: string;
    ContactLastName?: string;
    ContactPosition?: string;
    ContactEmail?: string;
    ContactTelephone?: string;
    FullContactTelephone?: string;

    // Optional - Other
    CustomReference?: string;
    AccountManagerId?: string | number;
    ParentSiteId?: string | number;
}

/** Required fields for CreateSiteRequest - used by buildFormData */
export const CREATE_SITE_REQUIRED_FIELDS: (keyof CreateSiteRequest)[] = [
  'CustomerId',
  'CustomerName',
  'Name'
];

export interface CreateSiteResponse {
    success: boolean;
    errors: string[];
    Message: string | null;
    WarningMessage: string | null;
    SiteId?: string | number;
}

export interface UpdateSiteRequest extends Partial<CreateSiteRequest> {
    id: string | number;
}
