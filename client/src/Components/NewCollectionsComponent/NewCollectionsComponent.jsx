import "./NewCollectionsComponent.css";
import Item from "../ItemComponent/ItemComponent";
import { useEffect, useState } from "react";

const NewCollectionsComponent = () => {
    const [newCollection,setNewCollection] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:4000/newcollection')
        .then((response)=>response.json())
        .then((data)=>setNewCollection(data));
    },[]);

  return (
    <div className="ournewcollections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="ourcollections">
            {newCollection.map((item,i)=>{
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollectionsComponent;
