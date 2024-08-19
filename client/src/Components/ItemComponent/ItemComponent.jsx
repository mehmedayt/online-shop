/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './ItemComponent.css';

const ItemComponent = (props) => {
    return (
        <div className="ouritem">
            <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
            <p>{props.name}</p>
            <div className="ouritem-prices">
                <div className="itemC-price-new">
                    ${props.new_price}
                </div>
                <div className="ouritem-price-old">
                    ${props.old_price}
                </div>
            </div>
        </div>
    );
};

export default ItemComponent ;