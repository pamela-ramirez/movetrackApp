import { useSelector } from "react-redux";
import Item from "./Item/Item";

const Tabla = () => {

  const registros = useSelector((state) => state.registrosSlice.filteredRegistros);
  const actividades = useSelector((state) => state.actividadesSlice.actividades)

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>Actividad</th>
          <th></th>
          <th>Tiempo (minutos)</th>
          <th>Fecha</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {registros.map((registro) => {
          const actividad = actividades.find((act) => Number(act.id) === Number(registro.idActividad));
 
          return (
            <Item
              key={registro.id}
              id={registro.id}
              idActividad={registro.idActividad}
              tiempo={registro.tiempo}
              fecha={registro.fecha}
              imagen={actividad ? actividad.imagen : null}
            />
          );
        })}
 
      </tbody>
    </table>
  );
};

export default Tabla;
