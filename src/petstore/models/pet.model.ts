export type PetStatus = 'available' | 'pending' | 'sold';

export interface Category {
    id: number;
    name: string;
}

export interface Tag {
    id: number;
    name: string;
}

export interface Pet {
    id?: number;
    name: string;
    category?: Category;
    photoUrls: string[];
    tags?: Tag[];
    status?: PetStatus;
}

export type CreatePetRequest = Pet;
export type Pet_Response = Pet;
