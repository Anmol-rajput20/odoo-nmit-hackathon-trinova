const API_BASE_URL = "https://dayflow-hrms-backend-6vjh.onrender.com";

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("access_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Something went wrong");
  }

  return data;
};

export const getEmployee = async (empId) => {
  return await apiRequest(`/employees/${empId}`);
};

export const getMyPayroll = async () => {
  return await apiRequest("/api/v1/payroll/me");
};