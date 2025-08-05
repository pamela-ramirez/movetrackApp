import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const Bar = () => {
  const actividades = useSelector(
    (state) => state.actividadesSlice.actividades
  );
  const registros = useSelector((state) => state.registrosSlice.registros);

  const colors = [
    "#76E4E4",
    "#89D85B",
    "#FFD54F",
    "#FF8C8C",
    "#7AB8E4",
    "#A8A8A8",
    "#73A678",
    "#A56BAF",
  ];

  const conteoSesiones = actividades.map((actividad) => ({
    nombre: actividad.nombre,
    sesiones: registros.filter(
      (registro) => registro.idActividad === actividad.id
    ).length,
  }));

  const actividadesConSesiones = conteoSesiones.filter(
    (actividad) => actividad.sesiones > 0
  );
  const cantidadSesiones = actividadesConSesiones.map(
    (actividad) => actividad.sesiones
  );
  const nombresActividades = actividadesConSesiones.map(
    (actividad) => actividad.nombre
  );

  const state = {
    series: [
      {
        data: cantidadSesiones,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: "70%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: nombresActividades,
        labels: {
          style: {
            colors: colors,
            fontSize: "20px",
          },
        },
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

export default Bar;
