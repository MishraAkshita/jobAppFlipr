import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddJobForm: React.FC = () => {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    const existingJobs = JSON.parse(localStorage.getItem("jobs") || "[]");

    
    const updatedJobs = [...existingJobs, job];

    
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    alert("Job Added Successfully!");

    setJob({ title: "", company: "", location: "", salary: "", description: "" });
    

   
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark border-bottom border-body">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Jobify</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item active"><Link className="nav-link" to="/add-job">Add Job</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/job-list">Job List</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="addjob-container">
        <div className="add-job-form">
          <h2>Add Job</h2>
          <form onSubmit={handleSubmit}>
            <label>Job Title:</label>
            <input type="text" name="title" value={job.title} onChange={handleChange} required />

            <label>Company:</label>
            <input type="text" name="company" value={job.company} onChange={handleChange} required />

            <label>Location:</label>
            <input type="text" name="location" value={job.location} onChange={handleChange} required />

            <label>Salary ($):</label>
            <input type="text" name="salary" value={job.salary} onChange={handleChange} required />

            <label>Description:</label>
            <textarea name="description" value={job.description} onChange={handleChange} required />

            <button type="submit">Add Job</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddJobForm;

