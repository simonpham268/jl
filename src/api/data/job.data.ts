import { CreateJobRequest } from '../models';
import { formatDateLogged } from '../../utils/date.util';

/**
 * Base job data with default values
 */
export const baseJobData: CreateJobRequest = {
    JobSiteId: '6158191',
    Description: 'description 33',
    JobCustomerId: '3829952',
    DateLogged: formatDateLogged(),
    JobTypeId: '52394',
    AssignedToUserId: 2
};

/**
 * Create job data with optional overrides and additional fields
 * @param overrides - Fields to override or extend
 * @returns Job data merged with base data
 */
export function createJobData<T extends Record<string, unknown> = Record<string, never>>(
    overrides?: Partial<CreateJobRequest> & T
): CreateJobRequest & T {
    return {
        ...baseJobData,
        DateLogged: formatDateLogged(), // Always use fresh date
        ...overrides
    } as CreateJobRequest & T;
}
