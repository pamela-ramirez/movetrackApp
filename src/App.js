import Dashboard from "./components/Dashboard/Dashboard";
import "bootstrap-css-only";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onLogin } from "./app/slices/userSlice";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {

  const dispatcher = useDispatch();
 
  useEffect(() => {
    const localData = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null;
 
    dispatcher(onLogin(localData));
  }, []);

 /*  useEffect(() => {
    const localData = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")): null;
  }, []); */
 
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/dashboard" element={
          <PrivateRoute>
              <Dashboard/>
          </PrivateRoute> 
            }/>
      </Routes>
      
    </div>

  );
}

export default App;
