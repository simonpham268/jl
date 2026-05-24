import type { PetstoreClient } from '../base/api.client';
import type { ApiResponse } from '../base/api.response';
import { PET_ENDPOINTS } from '../endpoints/pet.endpoints';
import type { CreatePetRequest, Pet, PetStatus } from '../models/pet.model';

export class PetService {
  private client: PetstoreClient;

  constructor(client: PetstoreClient) {
    this.client = client;
  }

  async createPet(data: CreatePetRequest): Promise<ApiResponse<Pet>> {
    return this.client.post<Pet>(PET_ENDPOINTS.CREATE, { data });
  }

  async getPetById(id: number): Promise<ApiResponse<Pet>> {
    return this.client.get<Pet>(PET_ENDPOINTS.GET_BY_ID(id));
  }

  async updatePet(data: Pet): Promise<ApiResponse<Pet>> {
    return this.client.put<Pet>(PET_ENDPOINTS.UPDATE, { data });
  }

  async deletePet(id: number): Promise<ApiResponse<void>> {
    return this.client.delete<void>(PET_ENDPOINTS.DELETE(id));
  }

  async findByStatus(status: PetStatus): Promise<ApiResponse<Pet[]>> {
    return this.client.get<Pet[]>(`${PET_ENDPOINTS.FIND_BY_STATUS}?status=${status}`);
  }
}
