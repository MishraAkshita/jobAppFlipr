import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface ApplyFormProps {
  job: any; 
  onClose: () => void; 
  onApply: (job: any) => void; 
}

const ApplyForm: React.FC<ApplyFormProps> = ({ job, onClose, onApply }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null as File | null,
    coverLetter: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    
    const applications = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
    const newApplication = { ...formData, jobTitle: job.title, jobCompany: job.company };
    
    applications.push(newApplication);
    localStorage.setItem("appliedJobs", JSON.stringify(applications));

    alert("Application Submitted Successfully!");

    
    onApply(job);
    
    onClose();
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Apply for {job.title} at {job.company}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" required onChange={handleChange} />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" required onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Cover Letter</label>
            <textarea name="coverLetter" className="form-control" rows={4} required onChange={handleChange}></textarea>
          </div>

          <Button variant="success" type="submit">Submit Application</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ApplyForm;



