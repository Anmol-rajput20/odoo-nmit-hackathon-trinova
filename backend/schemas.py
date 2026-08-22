from datetime import date, datetime

from pydantic import BaseModel, ConfigDict

from models import AttendanceStatus, LeaveStatus, UserRole


class UserCreate(BaseModel):
    email: str
    password: str
    role: UserRole = UserRole.EMPLOYEE


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str
    role: UserRole
    is_active: bool


class EmployeeCreate(BaseModel):
    user_id: int | None = None
    employee_code: str
    first_name: str
    last_name: str
    department: str
    designation: str
    phone: str | None = None
    joining_date: date | None = None


class EmployeeResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int | None
    employee_code: str
    first_name: str
    last_name: str
    department: str
    designation: str
    phone: str | None
    joining_date: date | None


class AttendanceCreate(BaseModel):
    employee_id: int
    date: date
    check_in: datetime | None = None
    check_out: datetime | None = None
    status: AttendanceStatus = AttendanceStatus.PRESENT


class AttendanceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    employee_id: int
    date: date
    check_in: datetime | None
    check_out: datetime | None
    status: AttendanceStatus


class LeaveCreate(BaseModel):
    employee_id: int
    leave_type: str
    start_date: date
    end_date: date
    reason: str | None = None


class LeaveResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    employee_id: int
    leave_type: str
    start_date: date
    end_date: date
    reason: str | None
    status: LeaveStatus