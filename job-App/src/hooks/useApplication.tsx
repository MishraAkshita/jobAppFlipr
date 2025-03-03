import { useState, useEffect } from "react";
import { JobApplication, JobStatus } from "../types/types";

export  function useApplication() {
  const [appliedJobs, setAppliedJobs] = useState<JobApplication[]>([]);

  useEffect(() => {
    const storedAppliedJobs = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
    setAppliedJobs(storedAppliedJobs);
  }, []);

  const addApplication = (job: JobApplication) => {
    const updatedJobs: JobApplication[] = [
      ...appliedJobs,
      { ...job, status: "Pending" as JobStatus },
    ];
    setAppliedJobs(updatedJobs);
    localStorage.setItem("appliedJobs", JSON.stringify(updatedJobs));
  };
  
  const updateApplicationStatus = (id: string, newStatus: JobStatus) => {
    setAppliedJobs((prevJobs) => {
      const updatedJobs = prevJobs.map((job) =>
        job.id === id ? { ...job, status: newStatus } : job
      );
      localStorage.setItem("appliedJobs", JSON.stringify(updatedJobs));
      return updatedJobs; 
    });
  };
  

  return { appliedJobs, addApplication, updateApplicationStatus };
}
