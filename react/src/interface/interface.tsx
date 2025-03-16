import { AgGridReact } from "ag-grid-react";

export interface IndustriesListProps {
  industry: {
    title: string;
  };
}

export interface CompaniesProps {
  company: {
    img: string;
    title: string;
    location: string;
    industry: string;
    description: string;
  };
}

export interface JobListProps {
  opened: boolean;
  close: () => void;
  openDrawer: () => void;
  job: {
    id: number;
    img: string;
    bg_img: string;
    title: string;
    company: string;
    location: string;
    tags: string[];
    description: string[];
    posted: string;
    role: string;
    qualifications: string[];
    responsibilities: string[];
    opened: boolean;
    close: () => void;
  };
  similarJob: {
    id: number;
    img: string;
    job_title: string;
    company_name: string;
    company_profile: string;
    created_at: string;
    location: string;
    tags: string[];
    description: string[];
    posted: string;
    role: string;
    qualifications: string[];
    responsibilities: string[];
    opened: boolean;
    close: () => void;
  };
}

export interface BenefitsProps {
  benefit: {
    icon: string;
    title: string;
    description: string;
  };
}

export interface OverviewCardProps {
  overviewCards: {
    title: string;
    description: string;
    total: number;
    icon: string;
  };
}

export interface PostedJobCardProps {
  postedJobCards: {
    id: number;
    img: string;
    job_title: string;
    location: string;
    company: string;
    tags: string[];
    applications: number;
    status: string;
    posted_date: string;
  };
}

export interface RecentApplicationProps {
  recent: {
    id: number;
    img_profile: string;
    bg_cover: string;
    job_title: string;
    experience: {
      job_title: string;
      company: string;
      years_experience: string;
    }[];
    skills: string[];
    applicant_name: string;
    applicant_email: string;
    phone_number: string;
    applicant_live: string;
    status: string;
    available_date: string;
    available_time: string;
    date_applied: string;
    description: string;
  };
  handleOpenApplicant: () => void;
}

export interface UpcomingInterviewProps {
  inter: {
    id: string | number;
    img_profile: string;
    applicant_name: string;
    job_title: string;
    time?: string;
    start_time?: string;
    interview_type: string;
  };
}

export interface ApplicantStatusProps {
  appl: {
    title: string;
    count: number;
  };
}

export interface JobManagementRow {
  id?: number | string;
  job_title: string;
  status: string;
  applications: number;
  date_posted: string;
  last_updated: string;
}

//* INTERFACE FOR DATA TABLE
export interface JobsManagementRowData {
  id?: string | number;
  job_title?: string;
  job_applied?: string;
  status: string;
  applications?: string | number;
  date_posted: string;
  last_updated: string;
}

export interface ApplicationsRowData {
  id?: string | number;
  applicant_name: string;
  img_profile?: string;
  profile_picture?: string;
  job_title?: string;
  job_applied: string;
  current_stage?: string;
  assigned_hr?: string;
  assignment_date?: string;
  actions?: string;
  status?: string;
  experience_level?: string;
  date_applied?: string;
}

export interface ColumnActionsProps {
  page: string;
  rowData: CombinedRowData;
}

export interface MenuItem {
  label: string;
  icon: string;
  color?: string;
  link?: string;
  url: string | null;
  type: string;
}

export interface UsersManagementRowData {
  id: string | number;
  user_id: string | number;
  img_profile: string;
  full_name: string;
  user_type: string;
  status: string;
  date_registered: string;
}

export interface ColumnsData<T> {
  field: string;
  headerName?: string | number;
  flex?: number;
  width?: number;
  filter?: string | number;
  floatingFilter: boolean;
  cellRenderer?: (params: { data: T }) => JSX.Element;
}

export interface UsersManagementData {
  id?: string | number;
  full_name: string;
  img_profile?: string;
  profile_picture?: string;
  user_type: string;
  status: string;
  date_created: string;
  created_at: string;
  actions: string;
}

export type CombinedRowData =
  | JobsManagementRowData
  | ApplicationsRowData
  | UsersManagementData;

export interface ExportCsvProps {
  onBtnExport: () => void;
}

export interface JobsManagementTabProps {
  columns: ColumnsData<CombinedRowData>[];
  shortListedCol: ColumnsData<CombinedRowData>[];
  applicationsData: object[];
  onBtnExport: () => void;
  gridRef: React.RefObject<AgGridReact>;
}

export interface AgGridTableProps {
  columnsDef: object[];
  rowData: object[];
  gridRef: React.RefObject<AgGridReact>;
}

export interface ExportDataRowProps<T> {
  rowsData: T[];
}

export interface ReactDataTableProps<T> {
  rowsData: T[];
  columnsData: ColumnsData<T>[];
}

export interface ListApplicantsProps {
  applied: {
    id: number;
    img_profile: string;
    bg_cover: string;
    job_title: string;
    experience: {
      job_title: string;
      company: string;
      years_experience: string;
    }[];
    skills: string[];
    applicant_name: string;
    applicant_email: string;
    phone_number: string;
    applicant_live: string;
    status: string;
    available_date: string;
    available_time: string;
    date_applied: string;
    description: string;
  };
  open: () => void;
}

export interface ViewApplicationDrawerProps {
  selectedApplicant: {
    id: number;
    img_profile: string;
    bg_cover: string;
    job_title: string;
    experience: {
      job_title: string;
      company: string;
      years_experience: string;
    }[];
    skills: string[];
    applicant_name: string;
    applicant_email: string;
    phone_number: string;
    applicant_live: string;
    status: string;
    available_date: string;
    available_time: string;
    date_applied: string;
    description: string;
  };

  close: () => void;
  opened: boolean;
}

export interface CardProfileProps {
  cardProfileData?: {
    id: number;
    img_profile: string;
    applicant_name: string;
    job_title: string;
    applied_job: string;
    date_applied: string;
    status: string;
    hire_stage: string;
    applicant_email: string;
    applicant_phone: string;
  };
}

export interface ApplicantProfileProps {
  applicantProfileData?: {
    img_profile: string;
    applicant_name: string;
    job_title: string;
    applicant_email: string;
    applicant_phone: string;
    description: string;
    skills: string[];
    work_experience: {
      job_title: string;
      company: string;
      years_experience: string;
    }[];

    availability_date: string;
    availability_time: string;
  };
}

export interface InterviewProps {
  interviewData: {
    interview_details: {
      title_head: string;
      value: string;
    }[];
    interview_status: string;
    assigned_interview: {
      img_profile: string;
      name: string;
    }[];
  };
}

export interface HiringProgressProps {
  shortListedData: {
    shortlisted_details: {
      title_head: string;
      value: string;
    }[];
    shortlisted_status: string;
    assigned_review: {
      img_profile: string;
      name: string;
    }[];
  };
}

export interface FinalStageProps {
  finalStageData: {
    finalstage_details: {
      title_head: string;
      value: string;
    }[];
    finalstage_status: string;
  };
}

export interface HiringProgressTabProps {
  hiringProgressData?: {
    notes: {
      img_profile: string;
      name: string;
      position: string;
      text: string;
    }[];
    interview_details: {
      title_head: string;
      value: string;
    }[];
    interview_status: string;
    assigned_interview: {
      img_profile: string;
      name: string;
    }[];
    shortlisted_details: {
      title_head: string;
      value: string;
    }[];
    shortlisted_status: string;
    assigned_review: {
      img_profile: string;
      name: string;
    }[];
    finalstage_details: {
      title_head: string;
      value: string;
    }[];
    finalstage_status: string;
  };
}

export interface StatCardProps {
  title: string;
  description: string;
  total: string | number;
  icon: string;
}

export interface RescheduleInterviewModalProps {
  isOpenedInterviewModal: boolean;
  closeInterviewModal: () => void;
  selectedEvent: {
    img_profile: string;
    bg_cover?: string;
    applicant_name: string;
    applicant_email?: string;
    phone_number?: string;
    applicant_live?: string;
    status?: string;
    job_applied?: string;
    job_title: string;
    description?: string;
    date_interview?: string;
    start_time?: string;
    end_time?: string;
    interview_type: string;
    location?: string | boolean;
  };
}

export interface ScheduleInterviewModalProps {
  opened: boolean;
  close: () => void;
  img_profile: string;
}

export interface UserProfileDrawerProps {
  isOpenEditUser: boolean;
  closeEditUser: () => void;
}

export interface EventExtendedProps {
  img_profile: string;
  bg_cover: string;
  applicant_name: string;
  applicant_email: string;
  phone_number: string;
  applicant_live: string;
  status: string;
  job_applied: string;
  job_title: string;
  description: string;
  date_interview: string;
  experience: {
    job_title: string;
    company: string;
    years_experience: string;
  }[];
  skills: string[];
  start_time: string;
  end_time: string;
  interview_type: string;
  location: string | null;
}

export interface EventProps {
  title: string;
  start: string;
  end: string;
  extendedProps: EventExtendedProps;
}

export interface UseEventHandlerReturn {
  events: Event[];
  handleEventClick: (eventInfo: any) => void;
  opened: boolean;
  close: () => void;
  selectedEvent: EventExtendedProps | null;
}

export interface ScheduleInterviewDrawerProps {
  opened: boolean;
  close: () => void;
  selectedEvent: {
    img_profile: string;
    bg_cover?: string;
    applicant_name: string;
    applicant_email?: string;
    phone_number?: string;
    applicant_live?: string;
    status?: string;
    job_applied?: string;
    job_title: string;
    description?: string;
    date_interview?: string;
    start_time?: string;
    end_time?: string;
    interview_type: string;
    location?: string | boolean;
    experience: {
      job_title: string;
      company: string;
      years_experience: string;
    }[];
    skills: string[];
  };
}
