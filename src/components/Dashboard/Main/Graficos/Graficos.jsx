import Bar from "./Bar/Bar"
import Mensaje from "./Mensaje/Mensaje"
import Area from "./Area/Area"


const Graficos = () => {

  return (
    <>
    <div className="row  justify-content-center my-4">
       <Bar/>
       <Area/>
       
    </div>
    <div className="row  justify-content-center">
       <Mensaje/>
    </div>
    </>
  )
}

export default Graficos