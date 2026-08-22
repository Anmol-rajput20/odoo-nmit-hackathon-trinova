from datetime import date, datetime, timedelta
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.attendance import Attendance, AttendanceStatus
from app.models.user import User

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)

# Schemas
class AttendanceCreate(BaseModel):
    emp_id: str
    date: date
    check_in: Optional[datetime] = None
    check_out: Optional[datetime] = None
    status: Optional[AttendanceStatus] = AttendanceStatus.PRESENT

class AttendanceResponse(BaseModel):
    attendance_id: int
    emp_id: str
    date: date
    check_in: Optional[datetime] = None
    check_out: Optional[datetime] = None
    status: AttendanceStatus

    class Config:
        from_attributes = True

# 1. GET /attendance/ - Get Attendance
@router.get("/", response_model=List[AttendanceResponse])
def get_attendance(db: Session = Depends(get_db)):
    return db.query(Attendance).all()

# 2. POST /attendance/ - Create Attendance
@router.post("/", response_model=AttendanceResponse, status_code=status.HTTP_201_CREATED)
def create_attendance(attendance_data: AttendanceCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.emp_id == attendance_data.emp_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Employee not found")

    record = Attendance(**attendance_data.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record

# 3. POST /attendance/check-in/{employee_id} - Check In
@router.post("/check-in/{employee_id}", response_model=AttendanceResponse)
def check_in(employee_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.emp_id == employee_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Employee not found")

    today = date.today()
    existing_record = db.query(Attendance).filter(
        Attendance.emp_id == employee_id,
        Attendance.date == today
    ).first()

    if existing_record and existing_record.check_in:
        raise HTTPException(status_code=400, detail="Already checked in for today")

    if not existing_record:
        existing_record = Attendance(
            emp_id=employee_id,
            date=today,
            check_in=datetime.now(),
            status=AttendanceStatus.PRESENT
        )
        db.add(existing_record)
    else:
        existing_record.check_in = datetime.now()
        existing_record.status = AttendanceStatus.PRESENT

    db.commit()
    db.refresh(existing_record)
    return existing_record

# 4. PATCH /attendance/check-out/{employee_id} - Check Out
@router.patch("/check-out/{employee_id}", response_model=AttendanceResponse)
def check_out(employee_id: str, db: Session = Depends(get_db)):
    today = date.today()
    record = db.query(Attendance).filter(
        Attendance.emp_id == employee_id,
        Attendance.date == today
    ).first()

    if not record or not record.check_in:
        raise HTTPException(status_code=400, detail="Cannot check out without checking in first")

    record.check_out = datetime.now()
    db.commit()
    db.refresh(record)
    return record

# 5. GET /attendance/employee/{employee_id} - Get Employee Attendance
@router.get("/employee/{employee_id}", response_model=List[AttendanceResponse])
def get_employee_attendance(employee_id: str, db: Session = Depends(get_db)):
    return db.query(Attendance).filter(Attendance.emp_id == employee_id).all()

# 6. GET /attendance/employee/{employee_id}/weekly - Get Weekly Attendance
@router.get("/employee/{employee_id}/weekly", response_model=List[AttendanceResponse])
def get_weekly_attendance(employee_id: str, db: Session = Depends(get_db)):
    seven_days_ago = date.today() - timedelta(days=7)
    return db.query(Attendance).filter(
        Attendance.emp_id == employee_id,
        Attendance.date >= seven_days_ago
    ).all()