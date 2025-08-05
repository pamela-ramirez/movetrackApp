const Button = ({ cta, type, classColor, onHandleClick }) => {
    return (
      <button type={type} className={`btn ${classColor}`} onClick={onHandleClick}>
        {cta}
      </button>
    );
  };
  export default Button;
   