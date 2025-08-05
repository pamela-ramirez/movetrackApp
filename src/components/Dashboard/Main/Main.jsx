import ActividadModal from "./ActividadModal/ActividadModal"
import Graficos from "./Graficos/Graficos"
import InfoTiempo from "./InfoTiempo/InfoTiempo"
import Listado from "./Listado/Listado"
import { useState } from "react"

const Main = () => {

  const [showModal, setShowModal] = useState(false);

  const _onToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="main">
        <InfoTiempo/>
        <Graficos/>
        <Listado  onToggleModal={_onToggleModal} />
        {showModal? <ActividadModal onToggleModal={_onToggleModal}/>:""}
       
    </div>
  )
}

export default Main