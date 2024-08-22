import './PopularComponent.css';
import Item from "../ItemComponent/ItemComponent";
import { useEffect, useState } from "react";

const PopularComponent = () => {

    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/popularinwomen')
        .then((response)=>response.json())
        .then((data)=>setPopularProducts(data));
    },[]);

    return (
        <div className="pop">
            <h1>POPULAR IN WOMEN</h1>
            <hr/>
            <div className="pop-item">
                {popularProducts.map((item,i)=>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
                })}
            </div>
        </div>
    );
};

export default PopularComponent;