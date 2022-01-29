import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddAdmin from "./Pages/AdminPortal/AddAdmin/AddAdmin";
import AddDoctor from "./Pages/AdminPortal/AddDoctor/AddDoctor";
import AddPatient from "./Pages/AdminPortal/AddPatient/AddPatient";
import AddStaff from "./Pages/AdminPortal/AddStaff/AddStaff";
import AdminDashboard from "./Pages/AdminPortal/AdminDashboard/AdminDashboard";
import AdminHome from "./Pages/AdminPortal/AdminHome/AdminHome";
import ManageUsers from "./Pages/AdminPortal/ManageUsers/ManageUsers";
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

          {/* admin routes */}
          <Route path="/adminDashboard" element={<AdminDashboard />}>
            <Route path="/adminDashboard" element={<AdminHome />} />
            {/* manage admin, staff and doctor routes */}
            <Route
              path="/adminDashboard/manageAdmins"
              element={<ManageUsers />}
            />
            <Route
              path="/adminDashboard/manageDoctors"
              element={<ManageUsers />}
            />
            <Route
              path="/adminDashboard/manageStaffs"
              element={<ManageUsers />}
            />

            {/* add doctor, admin and staff routes*/}
            <Route path="/adminDashboard/addDoctor" element={<AddDoctor />} />
            <Route path="/adminDashboard/addStaff" element={<AddStaff />} />
            <Route path="/adminDashboard/addAdmin" element={<AddAdmin />} />
          </Route>

          {/* doctor routes */}
          <Route path="/doctorDashboard" element={<DoctorDashboard />}>
            <Route path="/doctorDashboard" element={<Patients />} />
          </Route>

          {/* staff routes */}
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
