
import './RelatedProductsComponent.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import Item from '../ItemComponent/ItemComponent';

const RelatedProductsComponent = () => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { productId } = useParams(); 

    useEffect(() => {
        fetch(`http://localhost:4000/relatedproducts/${productId}`)
            .then((response) => response.json())
            .then((data) => {
                setRelatedProducts(data);
            })
            .catch((error) => console.error('Error fetching related products:', error));
    }, [productId]); 
    

    return (
        <div className='related'>
            <h1>Related Products</h1>
            <hr />
            <div className="related-item">
                {relatedProducts.map((item) => (
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

export default RelatedProductsComponent;
