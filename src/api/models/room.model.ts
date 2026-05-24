export type RoomType = 'Single' | 'Twin' | 'Double' | 'Family' | 'Suite';

export interface CreateRoomRequest {
    roomName: string;
    type: RoomType;
    accessible: boolean;
    image?: string;
    description?: string;
    features?: string[];
    roomPrice: number;
}

export interface CreateRoomResponse {
    success: boolean;
}

export interface Room {
    roomid: number;
    roomName: string;
    type: RoomType;
    accessible: boolean;
    image?: string;
    description?: string;
    features?: string[];
    roomPrice: number;
}

export interface ListRoomsResponse {
    rooms: Room[];
}

export interface BookingDates {
    checkin: string;
    checkout: string;
}

export interface CreateBookingRequest {
    roomid: number;
    firstname: string;
    lastname: string;
    depositpaid: boolean;
    email?: string;
    phone?: string;
    bookingdates: BookingDates;
}

export interface CreateBookingResponse {
    bookingid: number;
    firstname: string;
    lastname: string;
    depositpaid: boolean;
    roomid: number;
    bookingdates: BookingDates;
}
