import logo from "./logo2.jpg";
import "./SignUpPage.css";
import { useState, useEffect, useRef } from "react";
import { obtenerPaises } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { registrar } from "../../services/api";
import Alert from "../UI/Alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { onSignUp } from "../../app/slices/userSlice";

const SignUpPage = () => {
  const userData = useSelector((state)=> state.userSlice.userData);
  const dispatcher = useDispatch();

  const inputUserNameRef = useRef();
  const inputPassRef = useRef();
  const inputPaisRef = useRef();

  const navigateTo = useNavigate();

  const [paises, setPaises] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [btnText, setBtnText] = useState("Registrarse");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [classMessage, setClassMessage] = useState("");

  useEffect(()=>{
    if(userData){
      navigateTo("/dashboard")
    }
  },[userData]);

  useEffect(() => {
    obtenerPaises()
      .then(setPaises)
      .catch(() => {
        setClassMessage("alert-danger");
        setAlertMessage("Error al cargar los países");
        setShowAlert(true);
      });
  }, []);

  const _onHandleClick = async (e) => {
    e.preventDefault();
    try {
      setBtnDisabled(true);
      setBtnText("Enviando ...");

      const response = await registrar(
        inputUserNameRef.current.value,
        inputPassRef.current.value,
        inputPaisRef.current.value
      );

      setClassMessage("alert-success");
      setAlertMessage(response?.message || "Registro exitoso");
      setShowAlert(true);

      setTimeout(() => {
        dispatcher(onSignUp(response))
        /* navigateTo("/login"); */
      }, 2000);
    } catch (error) {
      setClassMessage("alert-danger");
      setAlertMessage(error.message || "Error al registrar usuario");
      setShowAlert(true);
    } finally {
      setBtnDisabled(false);
      setBtnText("Registrarse");
    }
  };

  const _onHandleChange = () => {
    if (
      inputUserNameRef.current.value.length > 0 &&
      inputPassRef.current.value.length > 0 &&
      inputPaisRef.current.value !== ""
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  return (
    <div className="signUp-container">
      <div className="text-center logo-container">
        <img src={logo} width="70" alt="Logo" />
      </div>
      <h1 className="text-center">Registro de Usuario</h1>
      <form>
        {showAlert && (
          <Alert classColor={classMessage} message={alertMessage} />
        )}

        <div className="form-group">
          <label htmlFor="usuario">Usuario</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-user"></i>
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
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="pais">País de residencia</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-globe"></i>
              </span>
            </div>
            <select
              className="form-control"
              id="pais"
              ref={inputPaisRef}
              onChange={_onHandleChange}
            >
              <option value="">Seleccione un país</option>
              {paises.map((pais) => (
                <option key={pais.id} value={pais.id}>
                  {pais.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-info btn-block"
          onClick={_onHandleClick}
          disabled={btnDisabled}
        >
          {btnText}
        </button>
      </form>

      <p className="text-center mt-4">
        ¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a>
      </p>
    </div>
  );
};

export default SignUpPage;
