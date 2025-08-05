import Button from "../../UI/Button/Button";
import "./Header.css";
import logo from "./logo3.png";
import { onLogout } from "../../../app/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Header = () => {

  const dispatcher = useDispatch();
  const navigateTo = useNavigate();

  const _onhandleLogout = () => {
    dispatcher(onLogout());
    navigateTo("/login")
  };

  return (
      <header className="row border-bottom border-dark mb-4">
      <div className="col-12 d-flex justify-content-between align-items-center my-3">
        <div className="d-flex align-items-center">
            <img src={logo} alt="Logo" className="mr-2" width={70} />
            <h1>Movetrack App</h1>
        </div>
        <div>
        <Button
            cta={"Cerrar sesión"}
            type={"submit"}
            classColor={"btn-light"}
            onHandleClick={_onhandleLogout}
          />
        </div>
      </div>
    </header>
  )
}

export default Header;