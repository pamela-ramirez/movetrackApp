import "./LoginPage.css";
import logo from "./logo.png";
import {useEffect, useRef, useState } from "react";
import { login } from "../../services/api";
import Alert from "../UI/Alert/Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onLogin } from "../../app/slices/userSlice";

const LoginPage = () => {
  const userData = useSelector((state)=> state.userSlice.userData);
  const dispatcher= useDispatch();

  const inputUserNameRef = useRef();
  const inputPassRef = useRef();

  const navigateTo = useNavigate();

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [btnText, setBtnText] = useState("Iniciar sesión");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [classMessage, setClassMessage] = useState("");

  useEffect(()=>{
    if(userData){
      navigateTo("/dashboard")
    }
  },[userData]);

  const _onHandleClick = async () => {
    try {
      setBtnDisabled(true);
      setBtnText("Enviando ...");
      const response = await login(
        inputUserNameRef.current.value,
        inputPassRef.current.value
      );

      setClassMessage("alert-success");
      setAlertMessage("Inicio de sesion correcto");
      setShowAlert(true);

      setTimeout(() => {
        dispatcher(onLogin(response)); //llama ala funcion onlogin en userSlice
      }, 2000);

    } catch (error) {
      setClassMessage("alert-danger");
      setAlertMessage(error);
      setShowAlert(true);
    } finally {
      setBtnDisabled(false);
      setBtnText("Iniciar sesión");
    }
  };

  const _onHandleChange = () => {
    if (
      inputUserNameRef.current.value.length > 0 &&
      inputPassRef.current.value.length > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  return (
    <div className="login-container">
      <div className="text-center logo-container">
        <img src={logo} width="70" alt="Logo" />
      </div>
      <h1 className="text-center mb-3 my-4">Inicio de Sesión</h1>
      <form>
        {showAlert ? (
          <Alert classColor={classMessage} message={alertMessage} />
        ) : (
          ""
        )}
        <div className="form-group">
          <label htmlFor="usuario">Usuario</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              id="usuario"
              ref={inputUserNameRef}
              onChange={_onHandleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-lock"></i>
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              id="password"
              ref={inputPassRef}
              onChange={_onHandleChange}
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-eye"></i>
              </span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`btn btn-info btn-block`}
          onClick={_onHandleClick}
          disabled={btnDisabled}
        >
          {btnText}
        </button>
      </form>
      <p className="text-center mt-4">
        ¿No tienes una cuenta? <a href="/signup">Registrate</a>
      </p>
    </div>
  );
};

export default LoginPage;
