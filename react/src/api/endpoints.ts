export const API_ENDPOINTS = {
    LOGIN: "/auth-user/login",
    REGISTER: "/user-registration/register-user",
    VERIFY_EMAIL: "/user-registration/email-verification",
    RESEND_CODE: "/user-registration/resend-code",
    COMPANY_PROFILE: "/user-registration/company-profile",
    USER_PROFILE: "/user-registration/user-profile",
    EMP_SIDEBAR_LINKS: "/auth-user/sidebar",
    GET_ALL_POSTED_JOB: "/app-dashboard/get-all-postedjob",
    POST_JOB: "/app-dashboard/create-job",
    EDIT_JOB: "/app-dashboard/edit-job",
    CLOSE_JOB: "/app-dashboard/close-job",
    REOPEN_JOB: "/app-dashboard/reopen-job",
    VIEW_JOB_CARD: (id: string) => `/app-dashboard/view-job-card?id=${id}`,
    VIEW_JOB: (id: string) => `/app-jobsmanagement/view-job?id=${id}`,
    VIEW_USER_PROFILE: (id: string) =>
        `/app-usersmanagement/view-user?id=${id}`,
    UPDATE_USER_PROFILE: "/app-usersmanagement/edit-user",
    GET_ALL_SAVED_JOB: "/app-jobseeker/get-all-savedjob",
    SAVE_JOB: "/app-jobseeker/save-job",
    UNSAVE_JOB: "/app-jobseeker/unsave-job",
    GET_AUTH_ALL_JOBS: (perPage: number, currentPage: number) =>
        `/app-jobseeker/get-all-jobs?per_page=${perPage}&page=${currentPage}`,
    VIEW_AUTH_JOB: (id: string) => `/app-jobseeker/view-job/${id}`,
    APPLY_JOB: "/app-jobseeker/apply-job",
    WITHDRAW_APPLICATION: "/app-jobseeker/withdraw-application",
    GET_APPLIED_JOBS: "/app-jobseeker/get-applied-jobs",
    GET_RECENT_APPLICATION: (perPage: number, currentPage: number) =>
        `/app-dashboard/get-all-recent-application?per_page=${perPage}&page=${currentPage}`,
};

export const API_PSGC_ENDPOINTS = {
    REGIONS: "https://psgc.gitlab.io/api/regions/",
    PROVINCES: (regionCode: string) =>
        `https://psgc.gitlab.io/api/regions/${regionCode}/provinces/`,
    MUNICIPALITIES: (municipalCode: string) =>
        `https://psgc.gitlab.io/api/provinces/${municipalCode}/cities-municipalities/`,
    BARANGAYS: (bgryCode: string) =>
        `https://psgc.gitlab.io/api/cities-municipalities/${bgryCode}/barangays/`,
};

export const API_HOMEPAGE = {
    ALL_JOBS: (perPage: number, currentPage: number) =>
        `/app-home/get-all-jobs?per_page=${perPage}&page=${currentPage}`,
    VIEW_JOB: "/app-home/view-job",
};
