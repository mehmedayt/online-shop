import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import BreadcrumsComponent from "../Components/BreadcrumsComponent/BreadcrumsComponent";
import ProductDisplayComponent from "../Components/ProductDisplayComponent/ProductDisplayComponent";
import DescriptionBoxComponent from "../Components/DescriptionBoxComponent/DescriptionBoxComponent";
import RelatedProductsComponent from "../Components/RelatedProductsComponent/RelatedProductsComponent";

const ProductPage = () => {
    const { allProducts } = useContext(ShopContext); 
    const { productId } = useParams();

    const product = allProducts.find((e) => e._id === productId);

    return (
        <div>
            {product ? (
                <>
                    <BreadcrumsComponent product={product} />
                    <ProductDisplayComponent product={product} />
                    <DescriptionBoxComponent product={product} />
                    <RelatedProductsComponent />
                </>
            ) : (
                <p>Product not found</p> 
            )}
        </div>
    );
};

export default ProductPage;
