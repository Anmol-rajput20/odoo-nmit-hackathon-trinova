from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Employee, LeaveRequest, LeaveStatus
from schemas import LeaveCreate, LeaveResponse

router = APIRouter(
    prefix="/leaves",
    tags=["Leave Management"]
)


@router.post("/", response_model=LeaveResponse)
def create_leave_request(
    leave_data: LeaveCreate,
    db: Session = Depends(get_db)
):
    employee = (
        db.query(Employee)
        .filter(Employee.id == leave_data.employee_id)
        .first()
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    if leave_data.end_date < leave_data.start_date:
        raise HTTPException(
            status_code=400,
            detail="End date cannot be before start date"
        )

    leave = LeaveRequest(**leave_data.model_dump())

    db.add(leave)
    db.commit()
    db.refresh(leave)

    return leave


@router.get("/", response_model=list[LeaveResponse])
def get_leave_requests(
    db: Session = Depends(get_db)
):
    return db.query(LeaveRequest).all()


@router.patch(
    "/{leave_id}/approve",
    response_model=LeaveResponse
)
def approve_leave(
    leave_id: int,
    db: Session = Depends(get_db)
):
    leave = (
        db.query(LeaveRequest)
        .filter(LeaveRequest.id == leave_id)
        .first()
    )

    if not leave:
        raise HTTPException(
            status_code=404,
            detail="Leave request not found"
        )

    leave.status = LeaveStatus.APPROVED

    db.commit()
    db.refresh(leave)

    return leave


@router.patch(
    "/{leave_id}/reject",
    response_model=LeaveResponse
)
def reject_leave(
    leave_id: int,
    db: Session = Depends(get_db)
):
    leave = (
        db.query(LeaveRequest)
        .filter(LeaveRequest.id == leave_id)
        .first()
    )

    if not leave:
        raise HTTPException(
            status_code=404,
            detail="Leave request not found"
        )

    leave.status = LeaveStatus.REJECTED

    db.commit()
    db.refresh(leave)

    return leave