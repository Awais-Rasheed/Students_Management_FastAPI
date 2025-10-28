from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from database import engine
from models.models import Student
from pydantic import BaseModel, Field

router = APIRouter()

class StudentUpdate(BaseModel):
    name: str = Field(
        ...,
        min_length= 3,
        max_length=50 )
    roll_no: int = Field(
        ...,
        max_length=4
    )
    address: str = Field(
        ...,
        min_length = 5,
        max_length=100
    )


@router.post("/add-student")
def add_student(std: Student):
    with Session(engine) as session:
        session.add(std)
        session.commit()
        session.refresh(std)
        return {"message": "Student Added Successfully", "student": std}


@router.get("/all-students")
def get_all_students():
    with Session(engine) as session:
        students = session.exec(select(Student)).all()
        return students


@router.delete("/delete-student/{roll_no}")
def delete_student(roll_no: int):
    with Session(engine) as session:
        student = session.exec(select(Student).where(Student.roll_no == roll_no)).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")

        session.delete(student)
        session.commit()
        return {"message": "Student Deleted Successfully"}


@router.put("/update-student/{roll_no}")
def update_student(roll_no: int, updated_std: StudentUpdate):
    with Session(engine) as session:
        std = session.exec(select(Student).where(Student.roll_no == roll_no)).first()
        if not std:
            raise HTTPException(status_code=404, detail="Student Not Found")

        std.name = updated_std.name
        std.roll_no = updated_std.roll_no
        std.address = updated_std.address

        session.commit()
        session.refresh(std)
        return {"message": "Updated Successfully", "student": std}
