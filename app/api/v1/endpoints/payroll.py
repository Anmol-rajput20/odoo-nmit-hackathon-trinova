from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.payroll import Payroll
from app.models.user import User, Profile, UserRole
from app.dependencies.auth import get_current_user, require_role

router = APIRouter(prefix="/payroll", tags=["Payroll Management"])

# Schemas
class PayrollCreateOrUpdate(BaseModel):
    emp_id: str
    basic_salary: float
    allowances: Optional[float] = 0.0
    deductions: Optional[float] = 0.0

class PayrollResponse(BaseModel):
    payroll_id: int
    emp_id: str
    basic_salary: float
    allowances: float
    deductions: float
    net_salary: float

    class Config:
        from_attributes = True

class PayslipDetail(PayrollResponse):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    job_title: Optional[str] = None
    department: Optional[str] = None

# Routes
@router.post("", response_model=PayrollResponse, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_role([UserRole.ADMIN]))])
def create_or_update_payroll(data: PayrollCreateOrUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.emp_id == data.emp_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Employee not found")

    net_calculated = round(data.basic_salary + (data.allowances or 0.0) - (data.deductions or 0.0), 2)
    payroll_record = db.query(Payroll).filter(Payroll.emp_id == data.emp_id).first()

    if payroll_record:
        payroll_record.basic_salary = data.basic_salary
        payroll_record.allowances = data.allowances or 0.0
        payroll_record.deductions = data.deductions or 0.0
        payroll_record.net_salary = net_calculated
    else:
        payroll_record = Payroll(
            emp_id=data.emp_id,
            basic_salary=data.basic_salary,
            allowances=data.allowances or 0.0,
            deductions=data.deductions or 0.0,
            net_salary=net_calculated
        )
        db.add(payroll_record)

    db.commit()
    db.refresh(payroll_record)
    return payroll_record

@router.get("", response_model=List[PayslipDetail], dependencies=[Depends(require_role([UserRole.ADMIN]))])
def list_all_payrolls(db: Session = Depends(get_db)):
    payrolls = db.query(Payroll).all()
    results = []
    for item in payrolls:
        profile = db.query(Profile).filter(Profile.emp_id == item.emp_id).first()
        results.append({
            "payroll_id": item.payroll_id,
            "emp_id": item.emp_id,
            "basic_salary": item.basic_salary,
            "allowances": item.allowances,
            "deductions": item.deductions,
            "net_salary": item.net_salary,
            "first_name": profile.first_name if profile else None,
            "last_name": profile.last_name if profile else None,
            "job_title": profile.job_title if profile else None,
            "department": profile.department if profile else None
        })
    return results

@router.get("/me", response_model=PayslipDetail)
def get_my_payroll(
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    payroll = db.query(Payroll).filter(Payroll.emp_id == current_user.emp_id).first()
    if not payroll:
        raise HTTPException(status_code=404, detail="Payroll information has not been generated yet")

    profile = db.query(Profile).filter(Profile.emp_id == current_user.emp_id).first()
    return {
        "payroll_id": payroll.payroll_id,
        "emp_id": payroll.emp_id,
        "basic_salary": payroll.basic_salary,
        "allowances": payroll.allowances,
        "deductions": payroll.deductions,
        "net_salary": payroll.net_salary,
        "first_name": profile.first_name if profile else None,
        "last_name": profile.last_name if profile else None,
        "job_title": profile.job_title if profile else None,
        "department": profile.department if profile else None
    }

@router.get("/{emp_id}", response_model=PayslipDetail)
def get_payroll_by_emp_id(
    emp_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN and current_user.emp_id != emp_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this payroll")

    payroll = db.query(Payroll).filter(Payroll.emp_id == emp_id).first()
    if not payroll:
        raise HTTPException(status_code=404, detail="Payroll not found for this employee")

    profile = db.query(Profile).filter(Profile.emp_id == emp_id).first()
    return {
        "payroll_id": payroll.payroll_id,
        "emp_id": payroll.emp_id,
        "basic_salary": payroll.basic_salary,
        "allowances": payroll.allowances,
        "deductions": payroll.deductions,
        "net_salary": payroll.net_salary,
        "first_name": profile.first_name if profile else None,
        "last_name": profile.last_name if profile else None,
        "job_title": profile.job_title if profile else None,
        "department": profile.department if profile else None
    }