const Info = ({title, value, classColor}) => {

  return (
       <div className="col md-6">
     {/*    <div className="card text-white bg-info mb-4 "> */}
         <div className={`card stats-info mt-4 mb-4 ${classColor}`}>
        <div className="card-body">
            <h3>{title}</h3>
            <h4>{value} </h4>
            <p>minutos</p>  
        </div>
      </div>
    </div>
  )
}

export default Info