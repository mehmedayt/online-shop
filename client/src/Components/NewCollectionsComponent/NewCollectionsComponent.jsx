
/* eslint-disable no-unused-vars */
import "./NewCollectionsComponent.css";
import Item from "../ItemComponent/ItemComponent";
import { useEffect, useState } from "react";

const NewCollectionsComponent = () => {
    const [newCollection, setNewCollection] = useState([]);
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/newcollection`)
            .then((response) => response.json())
            .then((data) => {
                const shuffled = data.sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 8);
                setNewCollection(selected);
            })
            .catch((error) => console.error('Error fetching new collections:', error));
    }, []);
  
    return (
        <div className="ournewcollections">
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="ourcollections">
                {newCollection.map((item) => (
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

export default NewCollectionsComponent;
