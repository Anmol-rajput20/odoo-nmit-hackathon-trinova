import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.core.database import Base, engine
from app.models import user, payroll
from app.api.v1.endpoints import (
    auth,
    users,
    payroll as payroll_router,
    dashboard
)

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="HRMS Backend API with JWT Auth, RBAC, Profile, and Payroll Management",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static file storage for avatars & document uploads
os.makedirs("uploads/avatars", exist_ok=True)
app.mount("/static", StaticFiles(directory="uploads"), name="static")

# Include Core API Routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1")
app.include_router(payroll_router.router, prefix="/api/v1")
app.include_router(dashboard.router, prefix="/api/v1")

# Placeholder imports for Person 2 routes once integrated
# from app.api.v1.endpoints import attendance, leaves
# app.include_router(attendance.router, prefix="/api/v1")
# app.include_router(leaves.router, prefix="/api/v1")

@app.get("/")
def health_check():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "docs_url": "/docs"
    }