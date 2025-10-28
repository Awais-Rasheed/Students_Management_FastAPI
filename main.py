from fastapi import FastAPI, HTTPException, Depends, status
from typing import Optional
from sqlmodel import SQLModel, Field, Session, create_engine, select
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

# ======================
# App Configuration
# ======================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======================
# Database Setup
# ======================
DATABASE_URL = "sqlite:///students.db"
engine = create_engine(DATABASE_URL, echo=True)

# ======================
# Load environment variables
# ======================
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

# ======================
# Password Hashing
# ======================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

# ======================
# JWT Helper Functions
# ======================
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

# ======================
# Database Models
# ======================
class Student(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    roll_no: int
    address: str

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    password: str  # hashed password

# ======================
# Create Tables
# ======================
def create_db():
    SQLModel.metadata.create_all(engine)

create_db()

# ======================
# Routes
# ======================
@app.get("/")
def home():
    return {"message": "Welcome to Student Management System"}

# ---- Student CRUD ----
@app.post("/add-student")
def add_student(std: Student):
    with Session(engine) as session:
        session.add(std)
        session.commit()
        session.refresh(std)
        return {"message": "Student Added Successfully", "student": std}

@app.get("/all-students")
def get_all_students():
    with Session(engine) as session:
        students = session.exec(select(Student)).all()
        return students

@app.delete("/delete-student/{std_roll}")
def delete_student(std_roll: int):
    with Session(engine) as session:
        statement = select(Student).where(Student.roll_no == std_roll)
        student = session.exec(statement).first()

        if not student:
            raise HTTPException(status_code=404, detail='Student not found')
        
        session.delete(student)
        session.commit()
        return {"message": "Student Deleted Successfully"}

@app.put("/update-student/{roll_no}")
def update_student(roll_no: int, updated_name: str, updated_roll_no: int, updated_address: str):
    with Session(engine) as session:
        statement = select(Student).where(Student.roll_no == roll_no)
        std = session.exec(statement).first()

        if not std:
            raise HTTPException(status_code=404, detail="Student Not Found")
        
        std.name = updated_name
        std.roll_no = updated_roll_no
        std.address = updated_address

        session.commit()
        session.refresh(std)
        return {"message": "Updated Successfully", "student": std}

# ---- Authentication ----
@app.post("/signup")
def signup(username: str, password: str):
    with Session(engine) as session:
        existing_user = session.exec(select(User).where(User.username == username)).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already exists")

        hashed_pwd = hash_password(password)
        user = User(username=username, password=hashed_pwd)
        session.add(user)
        session.commit()
        session.refresh(user)

        return {"message": "User created successfully"}

@app.post("/login")
def login(username: str, password: str):
    with Session(engine) as session:
        user = session.exec(select(User).where(User.username == username)).first()
        if not user or not verify_password(password, user.password):
            raise HTTPException(status_code=401, detail="Invalid username or password")

        access_token = create_access_token({"sub": user.username})
        return {"access_token": access_token, "token_type": "bearer"}
