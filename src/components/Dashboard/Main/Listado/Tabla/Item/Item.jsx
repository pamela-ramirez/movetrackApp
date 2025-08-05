import { useDispatch, useSelector } from "react-redux";
import { onDeleteRegistro } from "../../../../../../app/slices/registrosSlice";
import { eliminarRegistro } from "../../../../../../services/api";

const Item = ({ id, idActividad, tiempo, fecha, imagen }) => {
  const userData = useSelector((state) => state.userSlice.userData);
  const actividades = useSelector(
    (state) => state.actividadesSlice.actividades
  ); 
  const dispatcher = useDispatch();

  const actividad = actividades.find(
    (actividad) => Number(actividad.id) === Number(idActividad)
  ); 
  const imagenUrl = imagen
    ? `https://movetrack.develotion.com/imgs/${imagen}.png`
    : null;

  const _onDeleteRegistro = async () => {
    const resultado = await eliminarRegistro(id, userData);
    if (resultado) {
      dispatcher(onDeleteRegistro(id));
    }
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{actividad ? actividad.nombre : "Actividad no encontrada"}</td>
      {/*     <td>{idActividad}</td> */}
      <td>
        {imagenUrl ? (
          <img src={imagenUrl} alt={imagenUrl} width="50" height="50" />
        ) : (
          "Sin imagen"
        )}
      </td>
      <td>{tiempo}</td>
      <td>{fecha}</td>
      <td>
        <button className="btn btn-danger" onClick={_onDeleteRegistro}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Item;
