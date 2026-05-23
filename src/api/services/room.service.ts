import type { ApiClient } from '../base/api.client';
import type { ApiResponse } from '../base/api.response';
import { ROOM_ENDPOINTS, BOOKING_ENDPOINTS } from '../endpoints/room.endpoints';
import type {
  CreateRoomRequest,
  CreateRoomResponse,
  ListRoomsResponse,
  Room,
  CreateBookingRequest,
  CreateBookingResponse,
} from '../models/room.model';
import { requireEnv } from '../../utils/require.env';

export class RoomService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
    this.client.setBaseURL(requireEnv('AIT_BASE_URL'));
  }

  async createRoom(data: CreateRoomRequest): Promise<ApiResponse<CreateRoomResponse>> {
    return this.client.post<CreateRoomResponse>(ROOM_ENDPOINTS.CREATE, { data });
  }

  async listRooms(): Promise<ApiResponse<ListRoomsResponse>> {
    return this.client.get<ListRoomsResponse>(ROOM_ENDPOINTS.LIST);
  }

  async findRoomByName(roomName: string): Promise<Room | undefined> {
    const response = await this.listRooms();
    return response.body?.rooms?.find(r => r.roomName === roomName);
  }

  async deleteRoom(id: string | number): Promise<ApiResponse<void>> {
    return this.client.delete<void>(ROOM_ENDPOINTS.DELETE(id));
  }

  async createBooking(data: CreateBookingRequest): Promise<ApiResponse<CreateBookingResponse>> {
    return this.client.post<CreateBookingResponse>(BOOKING_ENDPOINTS.CREATE, { data });
  }

  async deleteBooking(id: string | number): Promise<ApiResponse<void>> {
    return this.client.delete<void>(BOOKING_ENDPOINTS.DELETE(id));
  }
}
