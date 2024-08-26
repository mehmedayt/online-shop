/* eslint-disable react/prop-types */
import './PopUpComponent.css';  // Включете вашия CSS файл

const Popup = ({ show, handleClose, title, message }) => {
  if (!show) {return null;}  

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="popup-close" onClick={handleClose}>&times;</span>
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="popup-button" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
