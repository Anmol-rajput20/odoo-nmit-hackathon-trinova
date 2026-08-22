from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import hash_password, verify_password, create_access_token
from app.models.user import User, Profile, UserRole
from app.schemas.user import UserRegister, UserLogin, TokenResponse, UserOut
from app.dependencies.auth import get_current_user, require_role

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(user_in: UserRegister, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user_in.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    if db.query(User).filter(User.emp_id == user_in.emp_id).first():
        raise HTTPException(status_code=400, detail="Employee ID already exists")

    new_user = User(
        emp_id=user_in.emp_id,
        email=user_in.email,
        hashed_password=hash_password(user_in.password),
        role=user_in.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    profile = Profile(
        emp_id=new_user.emp_id,
        first_name=user_in.first_name,
        last_name=user_in.last_name
    )
    db.add(profile)
    db.commit()

    return new_user

@router.post("/login", response_model=TokenResponse)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    access_token = create_access_token(data={"sub": str(user.id), "role": user.role.value})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,
        "emp_id": user.emp_id,
        "user_id": user.id
    }

@router.get("/me", response_model=UserOut)
def read_current_user(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/admin/test", dependencies=[Depends(require_role([UserRole.ADMIN]))])
def admin_only_test():
    return {"message": "Welcome Admin!"}