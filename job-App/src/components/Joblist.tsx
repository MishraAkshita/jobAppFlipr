import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<{ title: string; company: string; location: string; salary: string; description: string }[]>([]);

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, []);

  const handleDelete = (index: number) => {
    const updatedJobs = jobs.filter((_, i) => i !== index); 
    setJobs(updatedJobs); 
    localStorage.setItem("jobs", JSON.stringify(updatedJobs)); 
  };

  return (
    <>
      
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark border-bottom border-body">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Jobify</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/add-job">Add Job</Link></li>
              <li className="nav-item active"><Link className="nav-link" to="/job-list">Job List</Link></li>
            </ul>
          </div>
        </div>
      </nav>

  
      <div className="joblist-container">
        <div className="overlay"></div> 
        
        
        {jobs.length === 0 ? (
          <p>No jobs available.</p>
        ) : (
          <div className="job-list">
            {jobs.map((job, index) => (
              <div key={index} className="job-item">
                
                <h3 className="job-title">{job.title}</h3>

                <div className="job-meta">
                  <span><strong>Company:</strong> {job.company}</span>
                  <span><strong>Location:</strong> {job.location}</span>
                </div>

                <p className="job-description"><strong>Description:</strong> {job.description}</p>
                <p className="job-salary"><strong>Salary:</strong> ${job.salary}</p>

                <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default JobList;
