import './RelatedProductsComponent.css';
import data_product from '../../assets/data';
import Item from '../ItemComponent/ItemComponent';

const RelatedProductsComponent = () => {
    return (
        <div className='related'>
            <h1>Related Products</h1>
            <hr />
            <div className="related-item">
                {data_product.map((item,i)=>{
                    return <Item Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
                })}
            </div>
        </div>
    );
};

export default RelatedProductsComponent;