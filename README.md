# 🎓 Student Management System — FastAPI

A simple **Student Management API** built using **FastAPI** and **SQLModel**.  
This project provides a backend service for managing student records with full **CRUD** functionality.

---

## 🚀 Features
- ➕ Add new students  
- 📋 View all students  
- ✏️ Update student details  
- ❌ Delete student by roll number  
- 🗃️ SQLite database integration  
- ⚡ Built with FastAPI for high performance  

---

## 🧰 Tech Stack
- **FastAPI** — Modern, high-performance Python web framework  
- **SQLModel** — ORM for database interaction (built on SQLAlchemy + Pydantic)  
- **SQLite** — Lightweight local database  
- **Uvicorn** — ASGI server for running the FastAPI app  

---

## 📦 Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Awais-Rasheed/Students_Management_FastAPI
cd student-management-fastapi
```

### 2️⃣ Create a Virtual Environment
```bash
python -m venv venv
source venv/bin/activate      # Linux/Mac
venv\Scripts\activate       # Windows
```

### 3️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 4️⃣ Run the App
```bash
uvicorn main:app --reload
```

---

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **GET** | `/` | Welcome message |
| **POST** | `/add_student` | Add a new student |
| **GET** | `/all_students` | Get all students |
| **PUT** | `/update_student/{roll_no}` | Update student details |
| **DELETE** | `/delete_student/{roll_no}` | Delete a student by roll number |

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

## 📚 Learnings
- Building CRUD APIs with **FastAPI**
- Managing databases with **SQLModel**
- Working with **Pydantic models**
- Structuring scalable Python backend projects

---

## 🧑‍💻 Author
**Awais**  
Software Engineer — Web Development  
[GitHub](https://github.com/Awais-Rasheed)

---

## 🪪 License
This project is licensed under the [MIT License](LICENSE).