from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Attendance, Employee
from schemas import AttendanceCreate, AttendanceResponse

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)


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

    attendance = Attendance(**attendance_data.model_dump())

    db.add(attendance)
    db.commit()
    db.refresh(attendance)

    return attendance


@router.get("/", response_model=list[AttendanceResponse])
def get_attendance(
    db: Session = Depends(get_db)
):
    return db.query(Attendance).all()


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
        .all()
    )