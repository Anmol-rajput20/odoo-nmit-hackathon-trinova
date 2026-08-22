export const employees = [
  {
    id: "EMP-001",
    name: "Siddharth G",
    position: "Software Engineer",
    email: "siddharth@example.com",
    mobile: "+91 98765 43210",

    company: "Dayflow",
    department: "Engineering",
    manager: "Akshita",
    location: "Bengaluru",

    wage: 50000,
    workingDays: 5,

    basicPercentage: 50,
    hraPercentage: 50,

    standardAllowance: 4167,

    performancePercentage: 8.333,
    ltaPercentage: 8.333,

    fixedAllowance: 2918,

    pfPercentage: 12,
    professionalTax: 200,

    paidDays: 22,

    skills: [
      "React",
      "JavaScript",
      "Node.js"
    ],

    certifications: [
      "AWS Cloud Practitioner"
    ],

    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. The employee profile summary can be edited here.",

    interests:
      "Design, books, music, travel and exploring new ideas.",

    privateInfo: {
      dob: "12/06/1999",
      address: "Bengaluru, Karnataka",
      nationality: "Indian",
      personalEmail:
        "siddharth.personal@example.com",
      gender: "Male",
      maritalStatus: "Single",
      joiningDate: "10/02/2024"
    },

    bank: {
      accountNumber: "XXXXXX2918",
      bankName: "HDFC Bank",
      ifsc: "HDFC0001234",
      pan: "ABCDE1234F",
      uan: "100234567890",
      employeeCode: "EMP-001"
    }
  },

  {
    id: "EMP-002",
    name: "Smitha C",
    position: "Product Designer",
    email: "smitha@example.com",
    mobile: "+91 98765 12345",

    company: "Dayflow",
    department: "Design",
    manager: "Akshita",
    location: "Pune",

    wage: 62000,
    workingDays: 5,

    basicPercentage: 50,
    hraPercentage: 50,

    standardAllowance: 4167,

    performancePercentage: 8.333,
    ltaPercentage: 8.333,

    fixedAllowance: 2918,

    pfPercentage: 12,
    professionalTax: 200,

    paidDays: 22,

    skills: [
      "Figma",
      "UI/UX",
      "Prototyping"
    ],

    certifications: [
      "Google UX Certificate"
    ],

    about:
      "Product designer focused on building simple and useful experiences.",

    interests:
      "Illustration, photography, design systems and travel.",

    privateInfo: {
      dob: "14/04/1998",
      address: "Pune, Maharashtra",
      nationality: "Indian",
      personalEmail:
        "smitha.personal@example.com",
      gender: "Female",
      maritalStatus: "Single",
      joiningDate: "14/03/2024"
    },

    bank: {
      accountNumber: "XXXXXX8122",
      bankName: "ICICI Bank",
      ifsc: "ICIC0001234",
      pan: "ABCDE5678F",
      uan: "100234567891",
      employeeCode: "EMP-002"
    }
  }
];

export const attendanceData = [
  {
    employee: "Siddharth G",
    employeeId: "EMP-001",
    date: "2025-10-22",
    checkIn: "10:00",
    checkOut: "19:00",
    workHours: "09:00",
    extraHours: "01:00"
  },
  {
    employee: "Smitha C",
    employeeId: "EMP-002",
    date: "2025-10-22",
    checkIn: "10:00",
    checkOut: "19:00",
    workHours: "09:00",
    extraHours: "01:00"
  }
];

export const leaveRequests = [
  {
    employee: "Siddharth G",
    type: "Casual Leave",
    dates: "28 Oct → 29 Oct",
    status: "Pending"
  },
  {
    employee: "Smitha C",
    type: "Sick Leave",
    dates: "20 Oct",
    status: "Approved"
  }
];