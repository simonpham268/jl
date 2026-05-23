export const ROOM_ENDPOINTS = {
  CREATE: '/api/room/',
  LIST: '/api/room/',
  DELETE: (id: string | number) => `/api/room/${id}`,
} as const;

export const BOOKING_ENDPOINTS = {
  CREATE: '/api/booking/',
  LIST: (roomId: string | number) => `/api/booking/?roomid=${roomId}`,
  DELETE: (id: string | number) => `/api/booking/${id}`,
} as const;
