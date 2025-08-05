import { useSelector } from "react-redux";
import "./Mensaje.css";

const Mensaje = () => {
  const registros = useSelector((state) => state.registrosSlice.registros);
  const hoy = new Date(); // fecha actual
  console.log(hoy);

  const ayer = new Date();
  ayer.setDate(hoy.getDate() - 1);

  console.log(ayer);

  const fechaFormateadaHoy = hoy.toISOString().split("T")[0].replace(/-/g, "/");
  const fechaFormateadaAyer = ayer
    .toISOString()
    .split("T")[0]
    .replace(/-/g, "/");

  console.log("Fecha Hoy:", fechaFormateadaHoy);
  console.log("Fecha Ayer:", fechaFormateadaAyer);

  const obtenerMinutosPorDia = (fecha) => {
    return registros
      .filter(
        (registro) => registro.fecha.split("T")[0].replace(/-/g, "/") === fecha
      )
      .reduce((total, registro) => total + registro.tiempo, 0); // Sumar los minutos
  };

  return (
    <div className="col card text-center my-4 mb-4 border-pink bg-white">
      <h2 className="text-pink fw-bold p-4">
        {obtenerMinutosPorDia(fechaFormateadaHoy) === 0 &&
        obtenerMinutosPorDia(fechaFormateadaAyer) === 0
          ? "🫠 No hubo registros ni de hoy ni de ayer 😒"
          : obtenerMinutosPorDia(fechaFormateadaHoy) >=
            obtenerMinutosPorDia(fechaFormateadaAyer)
          ? "🔥 ¡Bien hecho! Sigue así 💪"
          : "⚠️ Que no decaiga, tú puedes! 🚀"}
      </h2>
    </div>
  );
};

export default Mensaje;
