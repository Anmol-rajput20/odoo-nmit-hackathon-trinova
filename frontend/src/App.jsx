import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Employees from "./pages/Employees";
import EmployeeInfo from "./pages/EmployeeInfo";
import MyProfile from "./pages/MyProfile";
import Attendance from "./pages/Attendance";
import TimeOff from "./pages/TimeOff";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main employee page */}
        <Route path="/" element={<Navigate to="/employees" replace />} />

        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:id" element={<EmployeeInfo />} />

        <Route path="/profile" element={<MyProfile />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/time-off" element={<TimeOff />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/employees" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;