import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import BreadcrumsComponent from "../Components/BreadcrumsComponent/BreadcrumsComponent";
import ProductDisplayComponent from "../Components/ProductDisplayComponent/ProductDisplayComponent";
import DescriptionBoxComponent from "../Components/DescriptionBoxComponent/DescriptionBoxComponent";
import RelatedProductsComponent from "../Components/RelatedProductsComponent/RelatedProductsComponent";

const ProductPage = () => {

    const {all_product} = useContext(ShopContext);
    const {productId} = useParams();
    const product = all_product.find((e)=> e.id === Number(productId));
    return (
        <div>
            <BreadcrumsComponent product={product}/>
            <ProductDisplayComponent product={product} />
            <DescriptionBoxComponent />
            <RelatedProductsComponent />
        </div>
    );
};

export default ProductPage ;