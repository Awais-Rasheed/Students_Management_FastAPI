from sqlmodel import create_engine
# ======================
# Database Setup
# ======================

def db_connection():
    DATABASE_URL = "sqlite:///students.db"
    engine = create_engine(DATABASE_URL, echo=True)