import type { PetstoreClient } from '../base/api.client';
import type { ApiResponse } from '../base/api.response';
import { AUTH_ENDPOINTS } from '../endpoints/auth.endpoints';
import type { LoginRequest, LoginResponse } from '../models/auth.model';

export class AuthService {
  private client: PetstoreClient;

  constructor(client: PetstoreClient) {
    this.client = client;
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.client.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, { data: credentials });
  }
}
