export type JobStatus = "Pending" | "Interview Scheduled" | "Accepted" | "Rejected";

export interface JobApplication {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  status?: JobStatus;
}
