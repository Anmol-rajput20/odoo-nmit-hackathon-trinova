from datetime import date
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.leave import LeaveRequest, LeaveType, LeaveStatus
from app.models.user import User, UserRole
from app.dependencies.auth import get_current_user, require_role

router = APIRouter(
    prefix="/leaves",
    tags=["Leave Management"]
)

# Schemas
class LeaveCreate(BaseModel):
    emp_id: str
    leave_type: LeaveType = LeaveType.CASUAL
    start_date: date
    end_date: date
    remarks: Optional[str] = None

class LeaveResponse(BaseModel):
    id: int
    emp_id: str
    leave_type: LeaveType
    start_date: date
    end_date: date
    remarks: Optional[str] = None
    status: LeaveStatus

    class Config:
        from_attributes = True

# Apply for leave
@router.post("/", response_model=LeaveResponse, status_code=status.HTTP_201_CREATED)
def create_leave_request(
    leave_data: LeaveCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN and current_user.emp_id != leave_data.emp_id:
        raise HTTPException(status_code=403, detail="Not authorized to request leave for this employee")

    user = db.query(User).filter(User.emp_id == leave_data.emp_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Employee not found")

    if leave_data.end_date < leave_data.start_date:
        raise HTTPException(status_code=400, detail="End date cannot be before start date")

    leave = LeaveRequest(
        emp_id=leave_data.emp_id,
        leave_type=leave_data.leave_type,
        start_date=leave_data.start_date,
        end_date=leave_data.end_date,
        remarks=leave_data.remarks,
        status=LeaveStatus.PENDING
    )

    db.add(leave)
    db.commit()
    db.refresh(leave)
    return leave

# Get all leave requests (Admin only)
@router.get("/", response_model=List[LeaveResponse], dependencies=[Depends(require_role([UserRole.ADMIN]))])
def get_all_leave_requests(db: Session = Depends(get_db)):
    return db.query(LeaveRequest).all()

# Get leave requests for a single employee
@router.get("/employee/{emp_id}", response_model=List[LeaveResponse])
def get_employee_leaves(
    emp_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN and current_user.emp_id != emp_id:
        raise HTTPException(status_code=403, detail="Not authorized to view these records")

    return db.query(LeaveRequest).filter(LeaveRequest.emp_id == emp_id).all()

# Approve leave (Admin only)
@router.patch("/{leave_id}/approve", response_model=LeaveResponse, dependencies=[Depends(require_role([UserRole.ADMIN]))])
def approve_leave(
    leave_id: int,
    db: Session = Depends(get_db)
):
    leave = db.query(LeaveRequest).filter(LeaveRequest.id == leave_id).first()
    if not leave:
        raise HTTPException(status_code=404, detail="Leave request not found")

    leave.status = LeaveStatus.APPROVED
    db.commit()
    db.refresh(leave)
    return leave

# Reject leave (Admin only)
@router.patch("/{leave_id}/reject", response_model=LeaveResponse, dependencies=[Depends(require_role([UserRole.ADMIN]))])
def reject_leave(
    leave_id: int,
    db: Session = Depends(get_db)
):
    leave = db.query(LeaveRequest).filter(LeaveRequest.id == leave_id).first()
    if not leave:
        raise HTTPException(status_code=404, detail="Leave request not found")

    leave.status = LeaveStatus.REJECTED
    db.commit()
    db.refresh(leave)
    return leave