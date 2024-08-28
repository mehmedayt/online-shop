/* eslint-disable react/prop-types */
import './PopUpComponent.css'; 

const PopUpComponent = ({ show, handleClose, title, message }) => {
  if (!show) {return null;}

  return (
    <section className="popup-overlay">
      <article className="popup-content">
        <button className="popup-close" onClick={handleClose}>&times;</button>
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="popup-button" onClick={handleClose}>Close</button>
      </article>
    </section>
  );
};

export default PopUpComponent;
