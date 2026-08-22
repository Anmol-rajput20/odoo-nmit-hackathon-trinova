import enum
from sqlalchemy import Column, Integer, String, Date, DateTime, Enum, ForeignKey
from app.core.database import Base

class AttendanceStatus(str, enum.Enum):
    PRESENT = "PRESENT"
    ABSENT = "ABSENT"
    HALF_DAY = "HALF_DAY"
    LEAVE = "LEAVE"

class Attendance(Base):
    __tablename__ = "attendance"

    attendance_id = Column(Integer, primary_key=True, index=True)
    emp_id = Column(String(50), ForeignKey("users.emp_id", ondelete="CASCADE"), nullable=False, index=True)
    date = Column(Date, nullable=False)
    check_in = Column(DateTime, nullable=True)
    check_out = Column(DateTime, nullable=True)
    status = Column(Enum(AttendanceStatus), default=AttendanceStatus.PRESENT)