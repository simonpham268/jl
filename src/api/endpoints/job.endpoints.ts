export const JOB_ENDPOINTS = {
  LIST: '/jobs',
  GET_BY_ID: (id: string | number) => `/api/marketplace/apps/${id}/detail`,
  CREATE: '/api/Job/CreateJob',
  UPDATE: (id: string | number) => `/api/Job/UpdateJob/${id}`,
  DELETE: (id: string | number) => `/api/Job/DeleteJob/${id}`,
  SEARCH: '/api/Job/SearchJobs',
  ASSIGN: (id: string | number) => `/api/Job/AssignJob/${id}`,
  COMPLETE: (id: string | number) => `/api/Job/CompleteJob/${id}`,
  CANCEL: (id: string | number) => `/api/Job/CancelJob/${id}`
} as const;
