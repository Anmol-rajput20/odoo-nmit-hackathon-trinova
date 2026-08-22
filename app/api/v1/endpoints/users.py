import os
import shutil
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.core.database import get_db
from app.models.user import User, Profile, UserRole
from app.dependencies.auth import get_current_user, require_role

router = APIRouter(prefix="/users", tags=["User Management"])

# Upload directory
UPLOAD_DIR = "uploads/avatars"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Schemas
class ProfileResponse(BaseModel):
    first_name: str
    last_name: str
    phone: Optional[str] = None
    address: Optional[str] = None
    profile_picture: Optional[str] = None
    job_title: Optional[str] = "Staff"
    department: Optional[str] = "General"

    class Config:
        from_attributes = True

class UserDetailOut(BaseModel):
    id: int
    emp_id: str
    email: EmailStr
    role: UserRole
    is_active: bool
    profile: Optional[ProfileResponse] = None

    class Config:
        from_attributes = True

class ProfileUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    job_title: Optional[str] = None
    department: Optional[str] = None

# Routes
@router.get("", response_model=List[UserDetailOut], dependencies=[Depends(require_role([UserRole.ADMIN]))])
def list_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    results = []
    for user in users:
        profile = db.query(Profile).filter(Profile.emp_id == user.emp_id).first()
        results.append({
            "id": user.id,
            "emp_id": user.emp_id,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
            "profile": profile
        })
    return results

@router.get("/{emp_id}", response_model=UserDetailOut)
def get_user_by_emp_id(
    emp_id: str, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN and current_user.emp_id != emp_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this profile")

    user = db.query(User).filter(User.emp_id == emp_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    profile = db.query(Profile).filter(Profile.emp_id == emp_id).first()
    return {
        "id": user.id,
        "emp_id": user.emp_id,
        "email": user.email,
        "role": user.role,
        "is_active": user.is_active,
        "profile": profile
    }

@router.put("/{emp_id}", response_model=ProfileResponse)
def update_user_profile(
    emp_id: str,
    update_data: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN and current_user.emp_id != emp_id:
        raise HTTPException(status_code=403, detail="Not authorized to modify this profile")

    profile = db.query(Profile).filter(Profile.emp_id == emp_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    # Editable by Employee and Admin
    if update_data.first_name is not None:
        profile.first_name = update_data.first_name
    if update_data.last_name is not None:
        profile.last_name = update_data.last_name
    if update_data.phone is not None:
        profile.phone = update_data.phone
    if update_data.address is not None:
        profile.address = update_data.address

    # Editable by Admin only
    if current_user.role == UserRole.ADMIN:
        if update_data.job_title is not None:
            profile.job_title = update_data.job_title
        if update_data.department is not None:
            profile.department = update_data.department

    db.commit()
    db.refresh(profile)
    return profile

@router.post("/{emp_id}/avatar")
def upload_avatar(
    emp_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN and current_user.emp_id != emp_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    profile = db.query(Profile).filter(Profile.emp_id == emp_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    file_extension = os.path.splitext(file.filename)[1]
    saved_filename = f"{emp_id}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, saved_filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    profile.profile_picture = f"/static/avatars/{saved_filename}"
    db.commit()

    return {"message": "Avatar uploaded successfully", "avatar_url": profile.profile_picture}