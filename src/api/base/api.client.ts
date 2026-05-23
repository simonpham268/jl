import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { ApiResponse } from './api.response';
import { API_CONFIG } from '../config/api.config';
import { requireEnv } from '../../utils/require.env';

type Headers = Record<string, string>;

export class ApiClient {
  private request: APIRequestContext;
  private baseURL: string;
  private headers: Headers = {};

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseURL = requireEnv('BASE_URL');
  }

  setBaseURL(baseURL: string): this {
    this.baseURL = baseURL;
    return this;
  }

  setHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  setHeaders(headers: Headers): this {
    Object.assign(this.headers, headers);
    return this;
  }

  async get<T>(endpoint: string, options?: { headers?: Headers }): Promise<ApiResponse<T>> {
    const response = await this.request.get(this.url(endpoint), {
      headers: this.mergeHeaders(options?.headers),
    });
    return this.parseResponse<T>(response);
  }

  async post<T>(endpoint: string, options?: { data?: unknown; headers?: Headers }): Promise<ApiResponse<T>> {
    const response = await this.request.post(this.url(endpoint), {
      data: options?.data,
      headers: this.mergeHeaders(options?.headers),
    });
    return this.parseResponse<T>(response);
  }

  async delete<T>(endpoint: string, options?: { headers?: Headers }): Promise<ApiResponse<T>> {
    const response = await this.request.delete(this.url(endpoint), {
      headers: this.mergeHeaders(options?.headers),
    });
    return this.parseResponse<T>(response);
  }

  private url(endpoint: string): string {
    return `${this.baseURL}${endpoint}`;
  }

  private mergeHeaders(perCall?: Headers): Headers {
    return { ...API_CONFIG.defaultHeaders, ...this.headers, ...perCall };
  }

  private async parseResponse<T>(response: APIResponse): Promise<ApiResponse<T>> {
    let body: T | null = null;
    try {
      body = await response.json() as T;
    } catch {
      // not JSON
    }
    return {
      status: response.status(),
      statusText: response.statusText(),
      headers: response.headers(),
      body,
      ok: response.ok(),
    };
  }
}
