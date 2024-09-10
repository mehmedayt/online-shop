/* eslint-disable react/prop-types */
import './BreadcrumsComponent.css';
import arrow_icon from '../../assets/breadcrum_arrow.png';

// Define constants for HOME and SHOP
const HOME = "HOME";
const SHOP = "SHOP";

const BreadcrumsComponent = (props) => {
    const { product } = props;
    return (
        <div className="breadcrums">
            {HOME} <img src={arrow_icon} alt="" /> {SHOP} <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
        </div>
    );
};

export default BreadcrumsComponent;
