import "./AddProduct.css";

const AddProduct = () => {
  return (
    <div className="add-product">
      <div className="product-itemfield">
        <p>Product title</p>
        <input
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="product-price">
        <div className="product-itemfield">
          <p>Price</p>
          <input
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="product-itemfield">
          <p>Offer Price</p>
          <input
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="product-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="product-itemfield">
        <label htmlFor="file-input">
          <img
            className="product-thumnail-img"
            alt=""
          />
        </label>
        <input
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        className="product-btn"
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
