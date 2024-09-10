/* eslint-disable curly */
/* eslint-disable react/prop-types */
import './PopUp.css'; 

const Popup = ({ show, handleClose, title, message, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="popup-close" onClick={handleClose}>&times;</span>
        <h2>{title}</h2>
        <p>{message}</p>
        {onConfirm ? (
          <div className="popup-buttons">
            <button className="popup-button" onClick={onConfirm}>Confirm</button>
            <button className="popup-button" onClick={handleClose}>Cancel</button>
          </div>
        ) : (
          <button className="popup-button" onClick={handleClose}>Close</button>
        )}
      </div>
    </div>
  );
};

export default Popup;
