# 🎓 Student Management System — FastAPI + React

A full-stack **Student Management System** built using **FastAPI** (Backend) and **React** (Frontend).  
This project allows users to **Add, View, Update, and Delete** student records through a modern UI powered by React and Material UI.

---
## Project Demo

<video src="https://raw.githubusercontent.com/Awais-Rasheed/Students_Management_FastAPI/blob/main/demo_student_management.webm"
       controls
       width="600">
</video>

🎥 [Click here if the video doesn’t load](https://raw.githubusercontent.com/Awais-Rasheed/Students_Management_FastAPI/main/demo_student_management.webm)

---
## 🚀 Features

### 🖥️ Frontend (React + Material UI)
- Beautiful and responsive interface  
- Add new students easily  
- View all students in a dynamic table  
- Update and Delete students  
- Integrated with backend using **Axios**  
- Notifications using **React Toastify**

### ⚙️ Backend (FastAPI)
- Full **CRUD API** for student management  
- SQLite database integration via **SQLModel**  
- Fast and async-ready architecture  
- Well-structured routes for scalability  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React, Material UI, Axios, React Router DOM, React Toastify |
| **Backend** | FastAPI, SQLModel, Uvicorn |
| **Database** | SQLite |

---

## 📦 Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Awais-Rasheed/Students_Management_FastAPI
cd Students_Management_FastAPI
```

---

## 🐍 Backend Setup (FastAPI)

### Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate       # Linux/Mac
venv\Scripts\activate          # Windows
```

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Run the FastAPI Server
```bash
uvicorn main:app --reload
```

Server will start on:
```
http://127.0.0.1:8000
```

---

## ⚛️ Frontend Setup (React)

### Move into frontend folder
```bash
cd frontend
```

### Install Node Modules
```bash
npm install
```

### Run React App
```bash
npm run dev
```

React app will start on:
```
http://localhost:5173
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **GET** | `/` | Welcome message |
| **POST** | `/add_student` | Add a new student |
| **GET** | `/all_students` | Get all students |
| **PUT** | `/update-student/{roll_no}` | Update student details |
| **DELETE** | `/delete-student/{roll_no}` | Delete a student by roll number |

---

## 🧾 Example Request (POST `/add_student`)

```json
{
  "name": "Awais",
  "roll_no": 85,
  "address": "Kasur"
}
```

---

## 🧠 Learnings
- FastAPI and SQLModel integration  
- REST API development and testing  
- React + Axios API integration  
- Using Material UI and Toastify for better UX  
- Managing virtual environments and project structure  

---

## 🧑‍💻 Author

**Awais**  
Software Engineer — Web Developer  

🔗 [GitHub Profile](https://github.com/Awais-Rasheed)

````