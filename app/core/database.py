import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.core.config import settings

# 1. Fetch URL from settings or direct environment fallback
db_url = getattr(settings, "DATABASE_URL", None) or os.getenv("DATABASE_URL", "")

# 2. Fix driver prefix for MySQL on cloud providers (e.g. TiDB / Aiven / Render)
if db_url.startswith("mysql://"):
    db_url = db_url.replace("mysql://", "mysql+pymysql://", 1)

# 3. Create engine with connection pooling and SSL compatibility
connect_args = {}
if "tidbcloud" in db_url or "aivencloud" in db_url or "ssl" in db_url.lower():
    connect_args = {"ssl": {"ssl_mode": "REQUIRED"}}

engine = create_engine(
    db_url,
    pool_pre_ping=True,
    pool_recycle=3600,
    connect_args=connect_args
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()