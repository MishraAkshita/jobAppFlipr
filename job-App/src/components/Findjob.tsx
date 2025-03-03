import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import{useApplication} from "../hooks/useApplication";
import { JobApplication, JobStatus } from "../types/types";
import ApplyForm from "./apply"; 

const FindJob: React.FC = () => {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobApplication[]>([]);
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    company: "",
    minSalary: "",
    maxSalary: "",
  });
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobApplication | null>(null);
  const [showAppliedJobs, setShowAppliedJobs] = useState(false); 

  const { appliedJobs, addApplication, updateApplicationStatus } = useApplication();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    setJobs(storedJobs);
    setFilteredJobs(storedJobs);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      job.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      job.company.toLowerCase().includes(filters.company.toLowerCase()) &&
      (filters.minSalary === "" || !isNaN(parseInt(filters.minSalary)) && parseInt(job.salary) >= parseInt(filters.minSalary)) &&
      (filters.maxSalary === "" || !isNaN(parseInt(filters.maxSalary)) && parseInt(job.salary) <= parseInt(filters.maxSalary))
    );

    setFilteredJobs(filtered);
  };

  const handleApplyClick = (job: JobApplication) => {
    setSelectedJob(job);
    setShowApplyForm(true);
  };

  const handleJobApplied = (job: JobApplication) => {
    addApplication(job);
    setShowApplyForm(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark border-bottom border-body">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Jobify</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link text-light" onClick={() => setShowAppliedJobs(!showAppliedJobs)}>
                  {showAppliedJobs ? "All Jobs" : "Applied Jobs"}
                </button>
              </li>
            </ul>

            {!showAppliedJobs && (
              <form className="d-flex gap-2">
                <input className="form-control" type="text" name="title" placeholder="Job Title" onChange={handleFilterChange} />
                <input className="form-control" type="text" name="company" placeholder="Company" onChange={handleFilterChange} />
                <input className="form-control" type="text" name="location" placeholder="Location" onChange={handleFilterChange} />
                <input className="form-control" type="number" name="minSalary" placeholder="Min Salary" onChange={handleFilterChange} />
                <input className="form-control" type="number" name="maxSalary" placeholder="Max Salary" onChange={handleFilterChange} />
                <button className="btn btn-outline-success" type="button" onClick={applyFilters}>Search</button>
              </form>
            )}
          </div>
        </div>
      </nav>

      <div className="mt-4">
        <h2 className="text-center mb-4">
          {showAppliedJobs ? "Jobs You've Applied To" : "Find Your Dream Job"}
        </h2>

        <div className="job-list mt-4">
          {(showAppliedJobs ? appliedJobs : filteredJobs).length > 0 ? (
            (showAppliedJobs ? appliedJobs : filteredJobs).map((job) => {
              const appliedJob = appliedJobs.find((j) => j.id === job.id) || job;
              
              return (
                <div className="job-card p-3 mb-3" key={job.id}>
                  <h4 className="mb-2">{job.title}</h4>
                  <p><strong>Company:</strong> {job.company}</p>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Salary:</strong> ${job.salary}</p>
                  <p>{job.description}</p>

                  {showAppliedJobs ? (
  <>
    <label><strong>Status:</strong></label>
    <select
      className="form-control mt-2"
      value={appliedJobs.find(j => j.id === job.id)?.status || "Pending"}
      onChange={(e) => {
        const newStatus = e.target.value as JobStatus;
        updateApplicationStatus(job.id, newStatus);
      }}
    >
      <option value="Pending">Pending</option>
      <option value="Interview Scheduled">Interview Scheduled</option>
      <option value="Accepted">Accepted</option>
      <option value="Rejected">Rejected</option>
    </select>
  </>
) : (
  <button className="btn btn-primary" onClick={() => handleApplyClick(job)}>
    Apply Now
  </button>
)}

                </div>
              );
            })
          ) : (
            <p className="text-center mt-3">{showAppliedJobs ? "No applied jobs found" : "No jobs found"}</p>
          )}
        </div>
      </div>

      {showApplyForm && <ApplyForm job={selectedJob!} onClose={() => setShowApplyForm(false)} onApply={handleJobApplied} />}
    </>
  );
};

export default FindJob;
