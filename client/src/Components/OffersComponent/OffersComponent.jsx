import './OffersComponent.css';
import exclusive_image from '../../assets/exclusive_image.png';
import { Link } from 'react-router-dom';

const OffersComponent = () => {
    return (
        <div className="ouroffers">
            <div className="ouroffers-left">
                <h1>Exclusive</h1>
                <h1>Offers For You</h1>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>
                <Link to="/womens">
                    <button>Check Now</button>
                </Link>
            </div>
            <div className="ouroffers-right">
                <img src={exclusive_image} alt="" />
            </div>
        </div>
    );
};

export default OffersComponent;