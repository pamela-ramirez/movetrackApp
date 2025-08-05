import Tabla from "./Tabla/Tabla";
import Button from "../../../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onFilterRegistros } from "../../../../app/slices/registrosSlice";

const Listado = ({onToggleModal}) => {
  const registros = useSelector((state) => state.registrosSlice.registros);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("op1");

  useEffect(() => {
    dispatch(onFilterRegistros(filter));
  }, [filter,  registros, dispatch]); // Ejecutar cuando cambie el filtro


  const _onHandleClick = () => {
    onToggleModal(true);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    dispatch(onFilterRegistros(e.target.value));
  };


  return (
    <div className="Listado my-4">
      <h3 className="">📝Mis Registros</h3>
      <div className="row w-100 my-2">
        <div className="col d-flex justify-content-end">
          <Button
            cta={"Agregar"}
            type={"submit"}
            classColor={"btn-success"}
            onHandleClick={_onHandleClick}
          />
        </div>
      </div>

      <div className="row w-100 my-4">
        <div className="col">
          <select className="form-select w-100" value={filter} onChange={handleFilterChange}>
            <option value="op1">Todos</option>
            <option value="op2">Últimos 7 días</option>
            <option value="op3">Últimos 30 días</option>
          </select>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <Tabla/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listado;
