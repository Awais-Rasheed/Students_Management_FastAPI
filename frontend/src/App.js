
import './App.css';
import Dashboard from './pages/Dashboard'
import {Routes, Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Add_Student from './components/Add_Student'
import Update_Student from './components/Update_Student'

function App() {
  return (
   
    <>
      <h1 style={{textAlign: "center", color: "white"}}>Student Management System</h1>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/add-student" element={<Add_Student/>} />
        <Route path="/update-student/:roll_no" element={<Update_Student/>} />
    </Routes>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
