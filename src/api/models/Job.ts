export interface Job {
    id: string;
    title: string;
    description: string;
    status: JobStatus;
    priority: JobPriority;
    assigneeId?: string;
    createdBy: string;
    dueDate?: string;
    completedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export type JobStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export type JobPriority = 'low' | 'medium' | 'high' | 'critical';

export interface CreateJobRequest {
    JobSiteId: string | number;
    Description: string;
    JobCustomerId: string | number;
    DateLogged: string;
    JobTypeId: string | number;
    AssignedToUserId: string | number;
}

export interface CreateJobResponse {
    success: boolean;
    errors: string[];
    Message: string | null;
    WarningMessage: string | null;
}

export interface UpdateJobRequest {
    title?: string;
    description?: string;
    status?: JobStatus;
    priority?: JobPriority;
    assigneeId?: string;
    dueDate?: string;
}
