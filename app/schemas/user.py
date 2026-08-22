from pydantic import BaseModel, EmailStr
from app.models.user import UserRole

class UserRegister(BaseModel):
    emp_id: str
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    role: UserRole = UserRole.EMPLOYEE

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: UserRole
    emp_id: str
    user_id: int

class UserOut(BaseModel):
    id: int
    emp_id: str
    email: EmailStr
    role: UserRole
    is_active: bool

    class Config:
        from_attributes = True