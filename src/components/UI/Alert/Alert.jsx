const Alert = ({ message, classColor }) => {
    return (
      <div className={`alert ${classColor}`} role="alert">
        {message}
      </div>
    );
  };
   
  export default Alert;