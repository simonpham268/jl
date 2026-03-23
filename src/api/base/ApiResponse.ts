export interface ApiResponse<T = unknown> {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: T | null;
    ok: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface ErrorResponse {
    message: string;
    code?: string;
    details?: Record<string, unknown>;
}
