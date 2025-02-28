import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

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
              <li className="nav-item">
                <a className="nav-link active" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
           
          </div>
        </div>
      </nav>
      
      <div className="container">
      
        <h1 className="text-center m-5">Welcome to Jobify</h1>
        <p>An online job portal, where you can find and apply for jobs!</p>
        <div className="btn-container">
  <button onClick={() => navigate("/add-job")}>Add Job</button>
  <button onClick={() => navigate("/find-job")}>Find Job</button>
   </div>

      </div>
    
    </>
  );
}
