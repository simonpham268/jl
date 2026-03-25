export interface Customer {
    id: string | number;
    customerName: string;
    customerTypeId?: string | number;
    referenceNumber?: string;
    accountNumber?: string;
    sellingRateId?: string | number;
    accountManagerId?: string | number;
    address?: string;
    area?: string;
    city?: string;
    county?: string;
    postcode?: string;
    telephone?: string;
    countryCode?: string;
    firstName?: string;
    lastName?: string;
    contactTelephone?: string;
    email?: string;
    jobPosition?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateCustomerRequest {
    // Required
    Name: string;
    
    // Optional - Details
    CustomerTypeId?: string | number;
    CustomReference?: string;
    AccountNumber?: string;
    SellingRateId?: string | number;
    AccountManagerId?: string | number;
    IsProspectCustomer?: boolean;
    
    // Optional - Address (Address1-4 format)
    Address1?: string;
    Address2?: string;
    Address3?: string;
    Address4?: string;
    Postcode?: string;
    FullTelephone?: string;
    Latitude?: string | number;
    Longitude?: string | number;
    
    // Optional - Main Contact
    ContactFirstName?: string;
    ContactLastName?: string;
    FullContactTelephone?: string;
    ContactEmail?: string;
    ContactPosition?: string;
}

export interface CreateCustomerResponse {
    success: boolean;
    errors: string[];
    Message: string | null;
    WarningMessage: string | null;
    CustomerId?: string | number;
}

export interface UpdateCustomerRequest extends Partial<CreateCustomerRequest> {
    id: string | number;
}
