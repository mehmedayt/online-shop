import './NewCollectionsComponent.css';
import new_collections from '../../assets/new_collections';
import Item from '../ItemComponent/ItemComponent';

const NewCollectionsComponent = () => {
    return (
        <div className="ournewcollections">
            <h1>NEW COLLECTIONS</h1>
            <hr/>
            <div className="ourcollections">
                {new_collections.map((item,i)=>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
                })}
            </div>
        </div>
    );
};

export default NewCollectionsComponent;