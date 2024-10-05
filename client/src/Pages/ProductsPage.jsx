import "./CSSPages/ProductsPage.css";

const Products = () => {
  return (
    <div className="products">
      <h1>Our Products</h1>
      <section>
        <h2>Product Categories</h2>
        <ul>
          <li>Electronics</li>
          <li>Home Appliances</li>
          <li>Fashion</li>
          <li>Health & Beauty</li>
        </ul>
      </section>
      <section>
        <h2>Featured Products</h2>
        <div className="featured-products">
          <div className="product-item">Product 1</div>
          <div className="product-item">Product 2</div>
          <div className="product-item">Product 3</div>
          <div className="product-item">Product 4</div>
        </div>
      </section>
      <section>
        <h2>Product Care</h2>
        <p>
          Our products come with a warranty and we offer excellent customer support.
          If you have any issues, do not hesitate to contact us.
        </p>
      </section>
    </div>
  );
};

export default Products;
