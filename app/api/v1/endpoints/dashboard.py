from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User, UserRole
from app.models.payroll import Payroll
from app.dependencies.auth import get_current_user, require_role

router = APIRouter(prefix="/dashboard", tags=["Dashboard Metrics"])

@router.get("/stats", dependencies=[Depends(require_role([UserRole.ADMIN]))])
def get_admin_dashboard_stats(db: Session = Depends(get_db)):
    total_employees = db.query(User).filter(User.role == UserRole.EMPLOYEE).count()
    total_admins = db.query(User).filter(User.role == UserRole.ADMIN).count()
    
    payrolls = db.query(Payroll).all()
    total_payroll_cost = sum(p.net_salary for p in payrolls)

    return {
        "total_employees": total_employees,
        "total_admins": total_admins,
        "total_workforce": total_employees + total_admins,
        "monthly_payroll_outflow": round(total_payroll_cost, 2),
    }