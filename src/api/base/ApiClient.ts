import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiResponse } from './ApiResponse';
import { API_CONFIG } from '../config/api.config';
import * as fs from 'fs';
import * as path from 'path';
import { requireEnv } from '../../utils/require.env';

interface Cookie {
    name: string;
    value: string;
    domain?: string;
}

interface AuthData {
    cookies: Cookie[];
    __requestverificationtoken?: string;
}

interface ApiClientOptions {
    baseURL?: string;
    headers?: Record<string, string>;
    storageStatePath?: string;
    autoLoadAuth?: boolean;
}

// Essential cookies for authentication
const ESSENTIAL_COOKIES = [
    '.AspNetCore.Antiforgery',
    '.AspNetCore.Cookies.JLWeb.V2',
    '.AspNetCore.Culture',
    'ARRAffinity',
    'ARRAffinitySameSite'
];

export class ApiClient {
    private request: APIRequestContext;
    private baseURL: string;
    private headers: Record<string, string> = {};

    constructor(request: APIRequestContext, options?: ApiClientOptions) {
        this.request = request;
        this.baseURL = options?.baseURL || requireEnv('BASE_URL');
        this.headers = options?.headers || {};

        if (options?.autoLoadAuth !== false) {
            this.loadAuth(options?.storageStatePath);
        }
    }

    // Load authentication from authData.json
    loadAuth(storagePath = '.auth/storageState.json'): this {
        const authDataPath = path.resolve(path.dirname(storagePath), 'authData.json');
        
        if (!fs.existsSync(authDataPath)) return this;

        const authData = JSON.parse(fs.readFileSync(authDataPath, 'utf-8')) as AuthData;
        
        // Set cookies header
        const cookieString = this.buildCookieString(authData.cookies);
        if (cookieString) {
            this.headers['Cookie'] = cookieString;
        }

        // Set CSRF token
        if (authData.__requestverificationtoken) {
            this.headers['__requestverificationtoken'] = authData.__requestverificationtoken;
        }

        return this;
    }

    // Build cookie string from essential cookies only
    private buildCookieString(cookies: Cookie[]): string {
        const baseUrlDomain = this.extractDomain(this.baseURL);
        const cookieMap = new Map<string, string>();

        for (const cookie of cookies) {
            if (!this.isEssentialCookie(cookie.name)) continue;

            const existing = cookieMap.has(cookie.name);
            const domainMatches = this.isDomainMatch(cookie.domain || '', baseUrlDomain);

            if (!existing || domainMatches) {
                const value = this.sanitizeCookieValue(cookie.value);
                cookieMap.set(cookie.name, value);
            }
        }

        return Array.from(cookieMap.entries())
            .map(([name, value]) => `${name}=${value}`)
            .join('; ');
    }

    private isEssentialCookie(name: string): boolean {
        return ESSENTIAL_COOKIES.some(essential => name.startsWith(essential));
    }

    private sanitizeCookieValue(value: string): string {
        return value.replace(/[\r\n\t]/g, '').trim();
    }

    private extractDomain(url: string): string {
        try {
            return new URL(url).hostname;
        } catch {
            return url;
        }
    }

    private isDomainMatch(cookieDomain: string, baseUrlDomain: string): boolean {
        if (!cookieDomain) return false;
        const normalized = cookieDomain.replace(/^\./, '');
        return baseUrlDomain.includes(normalized) || normalized.includes(baseUrlDomain);
    }

    // Fluent setters
    setHeader(key: string, value: string): this {
        this.headers[key] = value;
        return this;
    }

    setHeaders(headers: Record<string, string>): this {
        Object.assign(this.headers, headers);
        return this;
    }

    setBaseURL(baseURL: string): this {
        this.baseURL = baseURL;
        return this;
    }

    setRequestVerificationToken(token: string): this {
        return this.setHeader('__requestverificationtoken', token);
    }

    // Getters
    getHeaders(): Record<string, string> {
        return { ...this.headers };
    }

    getBaseURL(): string {
        return this.baseURL;
    }

    // HTTP methods
    async get<T>(endpoint: string, options?: {
        params?: Record<string, string>;
        headers?: Record<string, string>;
    }): Promise<ApiResponse<T>> {
        const response = await this.request.get(this.url(endpoint), {
            params: options?.params,
            headers: this.mergeHeaders(options?.headers)
        });
        return this.parseResponse<T>(response);
    }

    async post<T>(endpoint: string, options?: {
        data?: unknown;
        form?: Record<string, string | number>;
        headers?: Record<string, string>;
    }): Promise<ApiResponse<T>> {
        const response = await this.request.post(this.url(endpoint), {
            data: options?.data,
            form: options?.form,
            headers: this.mergeHeaders(options?.headers)
        });
        return this.parseResponse<T>(response);
    }

    async put<T>(endpoint: string, options?: {
        data?: unknown;
        form?: Record<string, string | number>;
        headers?: Record<string, string>;
    }): Promise<ApiResponse<T>> {
        const response = await this.request.put(this.url(endpoint), {
            data: options?.data,
            form: options?.form,
            headers: this.mergeHeaders(options?.headers)
        });
        return this.parseResponse<T>(response);
    }

    async patch<T>(endpoint: string, options?: {
        data?: unknown;
        headers?: Record<string, string>;
    }): Promise<ApiResponse<T>> {
        const response = await this.request.patch(this.url(endpoint), {
            data: options?.data,
            headers: this.mergeHeaders(options?.headers)
        });
        return this.parseResponse<T>(response);
    }

    async delete<T>(endpoint: string, options?: {
        headers?: Record<string, string>;
    }): Promise<ApiResponse<T>> {
        const response = await this.request.delete(this.url(endpoint), {
            headers: this.mergeHeaders(options?.headers)
        });
        return this.parseResponse<T>(response);
    }

    // Private helpers
    private url(endpoint: string): string {
        return `${this.baseURL}${endpoint}`;
    }

    private mergeHeaders(custom?: Record<string, string>): Record<string, string> {
        return { ...API_CONFIG.defaultHeaders, ...this.headers, ...custom };
    }

    private async parseResponse<T>(response: APIResponse): Promise<ApiResponse<T>> {
        let body: T | null = null;
        try {
            body = await response.json() as T;
        } catch {
            // Response might not be JSON
        }

        return {
            status: response.status(),
            statusText: response.statusText(),
            headers: response.headers(),
            body,
            ok: response.ok()
        };
    }
}
