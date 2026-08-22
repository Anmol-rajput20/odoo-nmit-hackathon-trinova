from datetime import date, datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Attendance, Employee, AttendanceStatus
from schemas import AttendanceCreate, AttendanceResponse


router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)


# Create daily attendance
@router.post("/", response_model=AttendanceResponse)
def create_attendance(
    attendance_data: AttendanceCreate,
    db: Session = Depends(get_db)
):
    employee = (
        db.query(Employee)
        .filter(Employee.id == attendance_data.employee_id)
        .first()
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    attendance = Attendance(
        employee_id=attendance_data.employee_id,
        date=attendance_data.date,
        check_in=attendance_data.check_in,
        check_out=attendance_data.check_out,
        status=attendance_data.status
    )

    db.add(attendance)
    db.commit()
    db.refresh(attendance)

    return attendance


# Check-in
@router.post("/check-in/{employee_id}", response_model=AttendanceResponse)
def check_in(
    employee_id: int,
    db: Session = Depends(get_db)
):
    employee = (
        db.query(Employee)
        .filter(Employee.id == employee_id)
        .first()
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    today = date.today()

    attendance = (
        db.query(Attendance)
        .filter(
            Attendance.employee_id == employee_id,
            Attendance.date == today
        )
        .first()
    )

    if attendance:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked for today"
        )

    attendance = Attendance(
        employee_id=employee_id,
        date=today,
        check_in=datetime.now(),
        status=AttendanceStatus.PRESENT
    )

    db.add(attendance)
    db.commit()
    db.refresh(attendance)

    return attendance


# Check-out
@router.patch("/check-out/{employee_id}", response_model=AttendanceResponse)
def check_out(
    employee_id: int,
    db: Session = Depends(get_db)
):
    today = date.today()

    attendance = (
        db.query(Attendance)
        .filter(
            Attendance.employee_id == employee_id,
            Attendance.date == today
        )
        .first()
    )

    if not attendance:
        raise HTTPException(
            status_code=404,
            detail="No attendance record found for today"
        )

    if not attendance.check_in:
        raise HTTPException(
            status_code=400,
            detail="Employee has not checked in"
        )

    if attendance.check_out:
        raise HTTPException(
            status_code=400,
            detail="Employee has already checked out"
        )

    attendance.check_out = datetime.now()

    db.commit()
    db.refresh(attendance)

    return attendance


# Get all attendance
@router.get("/", response_model=list[AttendanceResponse])
def get_attendance(
    db: Session = Depends(get_db)
):
    return db.query(Attendance).all()


# Get employee's attendance
@router.get(
    "/employee/{employee_id}",
    response_model=list[AttendanceResponse]
)
def get_employee_attendance(
    employee_id: int,
    db: Session = Depends(get_db)
):
    employee = (
        db.query(Employee)
        .filter(Employee.id == employee_id)
        .first()
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return (
        db.query(Attendance)
        .filter(Attendance.employee_id == employee_id)
        .order_by(Attendance.date.desc())
        .all()
    )


# Get weekly attendance
@router.get(
    "/employee/{employee_id}/weekly",
    response_model=list[AttendanceResponse]
)
def get_weekly_attendance(
    employee_id: int,
    db: Session = Depends(get_db)
):
    employee = (
        db.query(Employee)
        .filter(Employee.id == employee_id)
        .first()
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    today = date.today()
    week_start = today - timedelta(days=today.weekday())
    week_end = week_start + timedelta(days=6)

    return (
        db.query(Attendance)
        .filter(
            Attendance.employee_id == employee_id,
            Attendance.date >= week_start,
            Attendance.date <= week_end
        )
        .order_by(Attendance.date)
        .all()
    )