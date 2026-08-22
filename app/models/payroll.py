from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base

class Payroll(Base):
    __tablename__ = "payroll"

    payroll_id = Column(Integer, primary_key=True, index=True)
    emp_id = Column(String(50), ForeignKey("users.emp_id", ondelete="CASCADE"), unique=True, nullable=False)
    basic_salary = Column(Float, nullable=False, default=0.0)
    allowances = Column(Float, nullable=False, default=0.0)
    deductions = Column(Float, nullable=False, default=0.0)
    net_salary = Column(Float, nullable=False, default=0.0)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())