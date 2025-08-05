import { useDispatch, useSelector } from "react-redux";
import { obtenerRegistros, obtenerActividades } from "../../services/api";
import Header from "./Header/Header"
import Main from "./Main/Main"
import { useEffect, useState } from "react";
import { onLoadRegistros } from "../../app/slices/registrosSlice";
import { onGetActividades } from "../../app/slices/actividadesSlice";


const Dashboard = () => {

  const userData = useSelector((state)=> state.userSlice.userData);
  const dispatcher= useDispatch();

  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchData() {
      if (userData) {
        console.log("Obteniendo registros y actividades con:", userData);
        
        try {
          const [registrosResponse, actividadesResponse] = await Promise.all([
            obtenerRegistros(userData),
            obtenerActividades(userData),
          ]);
  
          console.log("Respuesta de registros:", registrosResponse);
          console.log("Respuesta de actividades:", actividadesResponse);
  
          dispatcher(onLoadRegistros(registrosResponse));
          dispatcher(onGetActividades(actividadesResponse));
  
        } catch (error) {
          console.error("Error obteniendo los datos:", error);
        } finally {
          setLoading(false); 
        }
      }
    }
  
    fetchData();
  }, [userData, dispatcher]);
  
  return (
    <div className="container">
      <Header />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <span className="ml-3 h4">Loading...</span>
        </div>
      ) : (
        <Main />
      )}
    </div>
  )
}

export default Dashboard