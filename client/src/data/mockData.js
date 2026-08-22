export const employees = [
  {
    id: "EMP001",
    name: "Siddharth G",
    position: "Software Engineer",
    department: "Engineering",
    email: "siddharth@example.com",

    basicSalary: 50000,
    allowances: 10000,
    deductions: 5000,
  },

  {
    id: "EMP002",
    name: "Smitha C",
    position: "Product Designer",
    department: "Design",
    email: "smitha@example.com",

    basicSalary: 45000,
    allowances: 8000,
    deductions: 4000,
  },

  {
    id: "EMP003",
    name: "Rahul K",
    position: "HR Executive",
    department: "Human Resources",
    email: "rahul@example.com",

    basicSalary: 40000,
    allowances: 7000,
    deductions: 3500,
  },

  {
    id: "EMP004",
    name: "Ananya S",
    position: "Frontend Developer",
    department: "Engineering",
    email: "ananya@example.com",

    basicSalary: 55000,
    allowances: 9000,
    deductions: 5000,
  },
];


export const attendanceData = [
  {
    id: 1,
    employeeId: "EMP001",
    employee: "Siddharth G",
    date: "2025-10-22",
    checkIn: "09:45",
    checkOut: "18:30",
    workHours: "08:45",
    status: "Present",
  },

  {
    id: 2,
    employeeId: "EMP002",
    employee: "Smitha C",
    date: "2025-10-22",
    checkIn: "10:00",
    checkOut: "18:45",
    workHours: "08:45",
    status: "Present",
  },

  {
    id: 3,
    employeeId: "EMP003",
    employee: "Rahul K",
    date: "2025-10-22",
    checkIn: null,
    checkOut: null,
    workHours: "00:00",
    status: "Absent",
  },

  {
    id: 4,
    employeeId: "EMP004",
    employee: "Ananya S",
    date: "2025-10-22",
    checkIn: null,
    checkOut: null,
    workHours: "00:00",
    status: "Leave",
  },
];


export const notifications = [
  {
    id: 1,
    type: "success",
    title: "Leave Request Approved",
    message:
      "Smitha C's leave request has been approved.",
    time: "10 minutes ago",
  },

  {
    id: 2,
    type: "attendance",
    title: "Attendance Reminder",
    message:
      "You have not marked attendance for today.",
    time: "1 hour ago",
  },

  {
    id: 3,
    type: "leave",
    title: "New Leave Request",
    message:
      "Siddharth G has submitted a leave request.",
    time: "2 hours ago",
  },
];