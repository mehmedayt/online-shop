import './PopularComponent.css';
import data_product from '../../assets/data';
import Item from "../ItemComponent/ItemComponent";

const PopularComponent = () => {
    return (
        <div className="pop">
            <h1>POPULAR IN WOMEN</h1>
            <hr/>
            <div className="pop-item">
                {data_product.map((item,i)=>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
                })}
            </div>
        </div>
    );
};

export default PopularComponent;