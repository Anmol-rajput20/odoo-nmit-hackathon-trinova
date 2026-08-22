from fastapi import FastAPI

from database import Base, engine

from routes.employee_routes import router as employee_router
from routes.attendance import router as attendance_router
from routes.leave import router as leave_router

import models


Base.metadata.create_all(bind=engine)


app = FastAPI(title="Dayflow API")


app.include_router(employee_router)
app.include_router(attendance_router)
app.include_router(leave_router)


@app.get("/")
def home():
    return {
        "message": "Dayflow backend is running"
    }