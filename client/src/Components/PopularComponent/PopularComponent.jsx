import './PopularComponent.css';
import Item from "../ItemComponent/ItemComponent";
import { useEffect, useState } from "react";

const PopularComponent = () => {
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/popularinwomen')
            .then((response) => response.json())
            .then((data) => {
                const shuffled = data.sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 4);
                setPopularProducts(selected);
            })
            .catch((error) => console.error('Error fetching popular products:', error));
    }, []);
    
    return (
        <div className="pop">
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="pop-item">
                {popularProducts.map((item) => (
                    <Item
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                ))}
            </div>
        </div>
    );
};

export default PopularComponent;
