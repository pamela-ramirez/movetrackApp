import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const Area = () => {

  const registros = useSelector( (state) => state.registrosSlice.registros);

  const [ultimosSieteDias, setUltimosSieteDias] = useState([]);

  const obtenerUltimosSieteDias = () => {
    const hoy = new Date();
    const fechas = [];

    for (let i = 0; i < 7; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() - i);
      // Formateamos la fecha a "YYYY/MM/dd"
      const fechaFormateada = fecha.toISOString().split("T")[0].replace(/-/g, "/");
      fechas.push(fechaFormateada);
    }

    return fechas;
  };

  useEffect(() => {
    setUltimosSieteDias(obtenerUltimosSieteDias());
  }, []);


  const obtenerMinutosPorDia = (fecha) => {
    const registrosDelDia = registros.filter((registro) => registro.fecha.split("T")[0].replace(/-/g, "/") === fecha);
   /*  console.log(`Registros para ${fecha}:`, registrosDelDia);  */
    return registrosDelDia.reduce((total, registro) => {
      /* console.log(`Sumando minutos para ${fecha}: ${registro.tiempo}`); */
      return total + registro.tiempo;
    }, 0);
  };
 
  const minutosPorDia = ultimosSieteDias.map((fecha) => obtenerMinutosPorDia(fecha));
  /*  console.log("Minutos por día:", minutosPorDia); */
 

  const state  = {
    series: [
      {
        data: minutosPorDia, 
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ultimosSieteDias,
      },
      
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
          width={550}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Area;
