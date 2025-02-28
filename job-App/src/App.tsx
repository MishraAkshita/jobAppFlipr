
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddJobForm from "./components/Addjob";
import FindJob from "./components/Findjob";
import JobList from "./components/Joblist";
import "./addjob.css";
import "./App.css";
import "./home.css";
import "./joblist.css";
import "./findjob.css";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-job" element={<AddJobForm />} />
        <Route path="/job-list" element={<JobList />} />
        <Route path="/find-job" element={<FindJob />} /> 
      </Routes>
      
      <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Jobify. All Rights Reserved.</p>
        </footer>
        
    </Router>
    
  );
}

export default App;
