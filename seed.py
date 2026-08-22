from app.core.database import SessionLocal, Base, engine
from app.core.security import hash_password
from app.models.user import User, Profile, UserRole
from app.models.payroll import Payroll

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
            "department": "Human Resources",
            "basic_salary": 90000.0,
            "allowances": 10000.0,
            "deductions": 5000.0
        },
        {
            "emp_id": "EMP002",
            "email": "alex.chen@dayflow.com",
            "password": "userpassword123",
            "first_name": "Alex",
            "last_name": "Chen",
            "role": UserRole.EMPLOYEE,
            "job_title": "Senior Frontend Engineer",
            "department": "Engineering",
            "basic_salary": 75000.0,
            "allowances": 8000.0,
            "deductions": 4000.0
        },
        {
            "emp_id": "EMP003",
            "email": "sarah.miller@dayflow.com",
            "password": "userpassword123",
            "first_name": "Sarah",
            "last_name": "Miller",
            "role": UserRole.EMPLOYEE,
            "job_title": "Product Designer",
            "department": "Design",
            "basic_salary": 65000.0,
            "allowances": 6000.0,
            "deductions": 3000.0
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

            net = item["basic_salary"] + item["allowances"] - item["deductions"]
            payroll_rec = Payroll(
                emp_id=item["emp_id"],
                basic_salary=item["basic_salary"],
                allowances=item["allowances"],
                deductions=item["deductions"],
                net_salary=net
            )
            db.add(payroll_rec)
            db.commit()
            print(f"Created user + payroll: {item['email']}")

    db.close()
    print("Seeding completed.")

if __name__ == "__main__":
    seed_database()