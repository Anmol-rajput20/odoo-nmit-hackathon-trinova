from app.core.database import SessionLocal, Base, engine
from app.core.security import hash_password
from app.models.user import User, Profile, UserRole

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    users_data = [
        {
            "emp_id": "EMP001",
            "email": "admin@dayflow.com",
            "password": "adminpassword123",
            "first_name": "System",
            "last_name": "Admin",
            "role": UserRole.ADMIN,
            "job_title": "HR Administrator",
            "department": "Human Resources"
        },
        {
            "emp_id": "EMP002",
            "email": "alex.chen@dayflow.com",
            "password": "userpassword123",
            "first_name": "Alex",
            "last_name": "Chen",
            "role": UserRole.EMPLOYEE,
            "job_title": "Senior Frontend Engineer",
            "department": "Engineering"
        },
        {
            "emp_id": "EMP003",
            "email": "sarah.miller@dayflow.com",
            "password": "userpassword123",
            "first_name": "Sarah",
            "last_name": "Miller",
            "role": UserRole.EMPLOYEE,
            "job_title": "Product Designer",
            "department": "Design"
        }
    ]

    for item in users_data:
        existing_user = db.query(User).filter(User.email == item["email"]).first()
        if not existing_user:
            user = User(
                emp_id=item["emp_id"],
                email=item["email"],
                hashed_password=hash_password(item["password"]),
                role=item["role"]
            )
            db.add(user)
            db.commit()
            db.refresh(user)

            profile = Profile(
                emp_id=item["emp_id"],
                first_name=item["first_name"],
                last_name=item["last_name"],
                job_title=item["job_title"],
                department=item["department"],
                phone="9876543210",
                address="123 Tech Park, Suite 400"
            )
            db.add(profile)
            db.commit()
            print(f"Created user: {item['email']} ({item['role'].value})")
        else:
            print(f"User already exists: {item['email']}")

    db.close()
    print("Database seeding completed successfully.")

if __name__ == "__main__":
    seed_database()