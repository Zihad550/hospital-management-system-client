import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddPatient from "./Pages/AdminPortal/AddPatient/AddPatient";
import AdminDashboard from "./Pages/AdminPortal/AdminDashboard/AdminDashboard";
import Authentication from "./Pages/Authentication/Authentication";
import DoctorDashboard from "./Pages/DoctorPortal/DoctorDashboard/DoctorDashboard";
import Patients from "./Pages/Shared/Patients/Patients";
import StaffDashboard from "./Pages/StaffPortal/StaffDashboard/StaffDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route
            path="/adminDashboard/:id/:role"
            element={<AdminDashboard />}
          />
          <Route path="/doctorDashboard" element={<DoctorDashboard />}>
            <Route path="/doctorDashboard" element={<Patients />} />
          </Route>
          <Route path="/staffDashboard" element={<StaffDashboard />}>
            <Route path="/staffDashboard" element={<Patients />} />
            <Route path="/staffDashboard/addPatient" element={<AddPatient />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
