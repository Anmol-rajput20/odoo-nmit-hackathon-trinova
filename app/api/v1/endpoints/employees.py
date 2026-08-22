from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import hash_password
from app.models.user import User, Profile, UserRole

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)

# Schemas
class EmployeeCreate(BaseModel):
    emp_id: str
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    job_title: Optional[str] = "Staff"
    department: Optional[str] = "General"
    phone: Optional[str] = None
    address: Optional[str] = None

class ProfileResponse(BaseModel):
    first_name: str
    last_name: str
    phone: Optional[str] = None
    address: Optional[str] = None
    job_title: Optional[str] = None
    department: Optional[str] = None

    class Config:
        from_attributes = True

class EmployeeResponse(BaseModel):
    id: int
    emp_id: str
    email: EmailStr
    role: UserRole
    is_active: bool
    profile: Optional[ProfileResponse] = None

    class Config:
        from_attributes = True

# 1. GET /employees/ - Get Employees
@router.get("/", response_model=List[EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    users = db.query(User).all()
    results = []
    for u in users:
        profile = db.query(Profile).filter(Profile.emp_id == u.emp_id).first()
        results.append({
            "id": u.id,
            "emp_id": u.emp_id,
            "email": u.email,
            "role": u.role,
            "is_active": u.is_active,
            "profile": profile
        })
    return results

# 2. POST /employees/ - Create Employee
@router.post("/", response_model=EmployeeResponse, status_code=status.HTTP_201_CREATED)
def create_employee(data: EmployeeCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.emp_id == data.emp_id).first():
        raise HTTPException(status_code=400, detail="Employee ID already exists")
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        emp_id=data.emp_id,
        email=data.email,
        hashed_password=hash_password(data.password),
        role=UserRole.EMPLOYEE
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    profile = Profile(
        emp_id=data.emp_id,
        first_name=data.first_name,
        last_name=data.last_name,
        job_title=data.job_title,
        department=data.department,
        phone=data.phone,
        address=data.address
    )
    db.add(profile)
    db.commit()
    db.refresh(profile)

    return {
        "id": new_user.id,
        "emp_id": new_user.emp_id,
        "email": new_user.email,
        "role": new_user.role,
        "is_active": new_user.is_active,
        "profile": profile
    }

# 3. GET /employees/{employee_id} - Get Employee
@router.get("/{employee_id}", response_model=EmployeeResponse)
def get_employee(employee_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.emp_id == employee_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Employee not found")

    profile = db.query(Profile).filter(Profile.emp_id == employee_id).first()
    return {
        "id": user.id,
        "emp_id": user.emp_id,
        "email": user.email,
        "role": user.role,
        "is_active": user.is_active,
        "profile": profile
    }