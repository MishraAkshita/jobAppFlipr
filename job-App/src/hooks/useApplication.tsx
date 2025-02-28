import { useState } from "react";
import { JobApplication, JobStatus } from "../types/types";

export function useApplication() {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  const addApplication = (job: JobApplication) => {
    setApplications((prev) => [...prev, job]);
  };

  const updateApplication = (id: string, updatedData: Partial<JobApplication>) => {
    setApplications((prev) =>
      prev.map((job) => (job.id === id ? { ...job, ...updatedData } : job))
    );
  };

  const deleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((job) => job.id !== id));
  };

  const filterApplications = (status: JobStatus) => {
    return applications.filter((job) => job.status === status);
  };

  return { applications, addApplication, updateApplication, deleteApplication, filterApplications };
}
