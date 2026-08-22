import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Attendance from "./pages/Attendance";
import TimeOff from "./pages/TimeOff";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import AddEmployee from "./pages/AddEmployee";

function Layout() {
  const location = useLocation();

  const getTitle = () => {
    const { pathname } = location;

    if (pathname === "/") {
      return "Employees";
    }

    if (pathname === "/attendance") {
      return "Attendance";
    }

    if (pathname === "/time-off") {
      return "Time Off";
    }

    if (pathname.startsWith("/profile/")) {
      return "Employee Profile";
    }

    return "Dayflow";
  };

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <div className="route-title">
          {getTitle()}
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/attendance" element={<Attendance />}/>
            <Route path="/time-off" element={<TimeOff />}/>
            <Route path="*" element={<Dashboard />}/>
            <Route path="/reports" element={<Reports />}/>
            <Route path="/notifications" element={<Notifications />}/>
            <Route path="/employees/add" element={<AddEmployee />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;