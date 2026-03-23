import { ApiClient } from '../base/ApiClient';
import { ApiResponse, PaginatedResponse } from '../base/ApiResponse';
import { JOB_ENDPOINTS } from '../endpoints';
import { Job, CreateJobRequest, CreateJobResponse, UpdateJobRequest } from '../models';

export interface JobListParams {
    page?: number;
    pageSize?: number;
    status?: string;
    assigneeId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export class JobService {
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
        this.client.setHeader('content-type', 'application/x-www-form-urlencoded');
    }

    async getJobs(params?: JobListParams): Promise<ApiResponse<PaginatedResponse<Job>>> {
        return this.client.get<PaginatedResponse<Job>>(JOB_ENDPOINTS.LIST, {
            params: params as Record<string, string>
        });
    }

    async getJobById(id: string | number): Promise<ApiResponse<Job>> {
        return this.client.get<Job>(JOB_ENDPOINTS.GET_BY_ID(id));
    }

    async createJob(data: CreateJobRequest): Promise<ApiResponse<CreateJobResponse>> {
        const form: Record<string, string | number> = {
            JobSiteId: data.JobSiteId,
            Description: data.Description,
            JobCustomerId: data.JobCustomerId,
            DateLogged: data.DateLogged,
            JobTypeId: data.JobTypeId,
            AssignedToUserId: data.AssignedToUserId
        };
        return this.client.post<any>(JOB_ENDPOINTS.CREATE, { form });
    }

    async updateJob(id: string | number, data: UpdateJobRequest): Promise<ApiResponse<Job>> {
        return this.client.put<Job>(JOB_ENDPOINTS.UPDATE(id), {
            data
        });
    }

    async deleteJob(id: string | number): Promise<ApiResponse<void>> {
        return this.client.delete<void>(JOB_ENDPOINTS.DELETE(id));
    }

    async assignJob(id: string | number, assigneeId: string): Promise<ApiResponse<Job>> {
        return this.client.post<Job>(JOB_ENDPOINTS.ASSIGN(id), {
            data: { assigneeId }
        });
    }

    async completeJob(id: string | number): Promise<ApiResponse<Job>> {
        return this.client.post<Job>(JOB_ENDPOINTS.COMPLETE(id));
    }

    async cancelJob(id: string | number, reason?: string): Promise<ApiResponse<Job>> {
        return this.client.post<Job>(JOB_ENDPOINTS.CANCEL(id), {
            data: { reason }
        });
    }

    async searchJobs(query: string): Promise<ApiResponse<Job[]>> {
        return this.client.get<Job[]>(JOB_ENDPOINTS.SEARCH, {
            params: { q: query }
        });
    }
}
