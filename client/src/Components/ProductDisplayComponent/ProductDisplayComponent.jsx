/* eslint-disable semi */
/* eslint-disable react/prop-types */
import './ProductDisplayComponent.css';
import star_icon from '../../assets/star_icon.png';
import star_dull_icon from '../../assets/star_dull_icon.png';
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';


const ProductDisplayComponent = (props) => {
    const {product} = props;
    const { addToCart } = useContext(ShopContext);
    return (
        <div className='product'>
            <div className="product-left">
                <div className="product-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="product-img">
                    <img className="product-main-img" src={product.image} alt="" />
                </div>
            </div>
            <div className="product-right">
                <h1>{product.name}</h1>
                <div className="product-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="product-right-prices">
                    <div className="product-right-price-old">${product.old_price}</div>
                    <div className="product-right-price-new">${product.new_price}</div>
                </div>
                <div className="product-right-description">
                    A lightweight, usually knitted, pullover shirt.
                </div>
                <div className="product-right-size">
                    <h1>Select Size</h1>
                    <div className="product-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product._id)}}>ADD TO CART</button>
                <p className="product-right-category"><span>Category :</span>Women, T-Shirt, Crop Top</p>   
                <p className="product-right-category"><span>Tags :</span>Wodern, Latest</p>   
                
            </div>
        </div>
    );
};

export default ProductDisplayComponent;