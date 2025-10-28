# auth/routes.py
from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select
from database import engine
from models.models import User
from auth.auth_utils import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup")
def signup(username: str, password: str):
    with Session(engine) as session:
        existing_user = session.exec(select(User).where(User.username == username)).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already exists")

        user = User(username=username, password=hash_password(password))
        session.add(user)
        session.commit()
        session.refresh(user)

        return {"message": "User created successfully"}

@router.post("/login")
def login(username: str, password: str):
    with Session(engine) as session:
        user = session.exec(select(User).where(User.username == username)).first()
        if not user or not verify_password(password, user.password):
            raise HTTPException(status_code=401, detail="Invalid username or password")

        access_token = create_access_token({"sub": user.username})
        return {"access_token": access_token, "token_type": "bearer"}
