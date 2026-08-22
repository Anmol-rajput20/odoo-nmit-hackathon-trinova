import enum
from sqlalchemy import Column, Integer, String, Date, Text, Enum, ForeignKey
from app.core.database import Base

class LeaveType(str, enum.Enum):
    CASUAL = "CASUAL"
    SICK = "SICK"
    PAID = "PAID"
    UNPAID = "UNPAID"

class LeaveStatus(str, enum.Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"

class LeaveRequest(Base):
    __tablename__ = "leave_requests"

    id = Column(Integer, primary_key=True, index=True)
    emp_id = Column(String(50), ForeignKey("users.emp_id", ondelete="CASCADE"), nullable=False, index=True)
    leave_type = Column(Enum(LeaveType), default=LeaveType.CASUAL, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    remarks = Column(Text, nullable=True)
    status = Column(Enum(LeaveStatus), default=LeaveStatus.PENDING, nullable=False)