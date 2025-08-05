import { useSelector } from "react-redux";
import Info from "./Info/Info"
import "./InfoTiempo.css"

const InfoTiempo = () => {

  const registros = useSelector((state) => state.registrosSlice.registros)

  const _getTiempoTotal = () => {
    const total = registros.reduce((total, r) => total + r.tiempo, 0);
    console.log("Tiempo total (en minutos):", total);
    return total;
  };
  
  const _getTiempoDiario = () => {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const fechaActual = new Date().toISOString().split('T')[0]; // Formato: YYYY-MM-DD
    console.log("Fecha actual:", fechaActual);

    // Filtrar registros del día actual
    const registrosHoy = registros.filter(r => r.fecha === fechaActual);

    // Sumar los tiempos de los registros de hoy
    const tiempoDiario = registrosHoy.reduce((total, r) => total + r.tiempo, 0);

    console.log("Tiempo registrado hoy:", tiempoDiario);
    return tiempoDiario;
  };

  return (
    <div className="row  justify-content-center">
         <Info title={"Tiempo Total"} value={_getTiempoTotal()} classColor={"stats-total"}/>
         <Info title={"Tiempo Diario"} value={_getTiempoDiario()} classColor={"stats-diario"}/>
    </div>
  )
}

export default InfoTiempo