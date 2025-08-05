import { useEffect, useRef, useState } from "react";
import { agregarRegistro, obtenerActividades } from "../../../../services/api";
import { getUserDataFromLocalStorage } from "../../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { onAddRegistro } from "../../../../app/slices/registrosSlice";
import { onGetActividades } from "../../../../app/slices/actividadesSlice";
import Alert from "../../../UI/Alert/Alert";

const ActividadModal = ({ onToggleModal }) => {
  const userData = useSelector((state) => state.userSlice.userData);
  const actividades = useSelector(
    (state) => state.actividadesSlice.actividades
  );
  const dispatcher = useDispatch();

  const inputActividadRef = useRef();
  const inputTiempoRef = useRef();
  const inputFechaRef = useRef();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [classMessage, setClassMessage] = useState("");

  const _onHandleClick = async () => {
    const actividad = Number(inputActividadRef.current.value);
    const tiempo = Number(inputTiempoRef.current.value);
    const fecha = inputFechaRef.current.value;
   
    console.log("Fecha registro modal: ", fecha);
   
    const hoy = new Date();
    const fechaSeleccionada = new Date(fecha);
   
    if (!actividad || tiempo <= 0 || !fecha || fechaSeleccionada > hoy) {
      setClassMessage("alert-danger");
      setAlertMessage(
        "Debe seleccionar una actividad, ingresar un tiempo válido y una fecha no mayor a hoy."
      );
      setShowAlert(true);
      return; 
    }
   
    try {
      if (userData) {
        const response = await agregarRegistro(actividad, tiempo, fecha, userData);
        dispatcher(onAddRegistro(response));
        onToggleModal();
      }
    } catch (error) {
      console.error("ERROR al crear un registro:", error);
      setClassMessage("alert-danger");
      setAlertMessage("Error al crear un registro");
      setShowAlert(true);
    }
  };


  useEffect(() => {
    if (userData) {
      obtenerActividades(userData)
        .then((actividades) => {
          dispatcher(onGetActividades(actividades));
        })
        .catch(() => {
          console.log("Error al cargar las actividades");
        });
    }
  }, [userData, dispatcher]);

  const today = new Date().toISOString().split("T")[0]; //fecha actual en formato 'YYYY-MM-DD' para usarlo en ->restringir fechas futuras

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Nuevo registro</h5>
            <button type="button" className="close" onClick={onToggleModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Actividad</label>

                <select
                  className="form-control"
                  id="actividad"
                  ref={inputActividadRef}
                >
                  <option value="" disabled selected>
                    Seleccione una actividad
                  </option>
                  {actividades.map((actividad) => (
                    <option key={actividad.id} value={actividad.id}>
                      {actividad.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Tiempo (minutos)</label>
                <input
                  type="number"
                  className="form-control"
                  ref={inputTiempoRef}
                />
              </div>
              <div className="form-group">
                <label>Fecha</label>
                <input
                  type="date"
                  className="form-control"
                  ref={inputFechaRef}
                  // defaultValue={today} // muestra la fecha por default
                  max={today} // no se puede seleccionar fechas futuras a la fecha actual
                />
              </div>

              <button
                type="button"
                className="btn btn-primary my-3 mb-3"
                onClick={_onHandleClick}
              >
                Agregar
              </button>
              {showAlert ? (
                <Alert classColor={classMessage} message={alertMessage} />
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActividadModal;
