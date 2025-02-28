

export type JobStatus = "applied" | "interview" | "rejected" | "pending";
export interface JobApplication {
  id: string;
  title: string;
  company: string;
  status: JobStatus;
}
