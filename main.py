from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
from typing import Optional
from sqlmodel import SQLModel, Field, Session, create_engine, select
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Database Connection
DATABASE_URL = "sqlite:///students.db"
engine = create_engine(DATABASE_URL, echo=True)


class Student(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    roll_no: int
    address: str

def create_db():
    SQLModel.metadata.create_all(engine)

create_db()

@app.get("/")
def home():
    return {"message": "Wellcome to Student Management System"}

#Endpoint to add new Student
@app.post("/add-student")
def add_student(std: Student):
    with Session(engine) as session:
        session.add(std)
        session.commit()
        session.refresh(std)
        return {"message":"Student Added Successfully", "student": std}

#Endpoint to view all Students
@app.get("/all-students")
def get_all_students():
    with Session(engine) as session:
        students = session.exec(select(Student)).all()
        return students

#Endpoint to Delete Student
@app.delete("/delete-student/{std_roll}")
def delete_student(std_roll: int):
    with Session(engine) as session:
        statement = select(Student).where(Student.roll_no == std_roll)
        student = session.exec(statement).first()

        if not student:
            raise HTTPException(status_code=404, detail='student not found')
        
        session.delete(student)
        session.commit()
        return {"message", "Student Deleted Successfully"}
    
#Endpoint to update student
@app.put("/update-student/{roll_no}")
def update_student(roll_no: int, updated_name: str, updated_roll_no: int, updated_address: str):
    with Session(engine) as session:
        statement = select(Student).where(Student.roll_no == roll_no)
        std = session.exec(statement).first()

        if not std:
            raise HTTPException(status_code=404, message="Student Not Found")
        
        std.name = updated_name
        std.roll_no = updated_roll_no
        std.address = updated_address

        session.commit()
        session.refresh(std)
        return {"message": "Updated Successfull", "Student": std}