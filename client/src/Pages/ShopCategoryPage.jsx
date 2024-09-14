/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useContext } from 'react';
import './CSSPages/ShopCategoryPage.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Assets/dropdown_icon.png';
import ItemComponent from "../Components/ItemComponent/ItemComponent";

const ShopCategoryPage = (props) => {
    const { allProducts } = useContext(ShopContext);

    return (
        <div className="shop-category">
            <img className="shop-banner" src={props.banner} alt="" />
            <div className="shop-indexSort">
                <p>
                    <span>Showing 1-12</span> out of {allProducts.length} products
                </p>
                <div className="shop-sort">
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shop-products">
                {allProducts.map((item) => {
                    if (props.category === item.category) {
                        return (
                            <ItemComponent
                                key={item._id} 
                                id={item._id}
                                name={item.name}
                                image={item.image}
                                new_price={item.new_price}
                                old_price={item.old_price}
                            />
                        );
                    }
                    return null;
                })}
            </div>
            <div className="shop-loadmore">
                Explore more
            </div>
        </div>
    );
};

export default ShopCategoryPage;
