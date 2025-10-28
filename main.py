# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import create_db_and_tables
from routers.student_routes import router as student_router
from routers.routes import router as auth_router

app = FastAPI(title="Student Management System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize DB
create_db_and_tables()

# Register Routers
app.include_router(student_router)
app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "Welcome to Student Management System API"}
