import { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import Popup from '../Popup/Popup'; 

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const [image, setImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const showPopupMessage = (title, message) => {
    setPopupTitle(title);
    setPopupMessage(message);
    setShowPopup(true);
  };

  const clearForm = () => {
    setProductDetails({
      name: "",
      image: "",
      category: "women",
      new_price: "",
      old_price: ""
    });
    setImage(null);
  };

  const uploadImage = async (image) => {
    let formData = new FormData();
    formData.append('product', image);

    const response = await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    });

    const data = await response.json();
    return data;
  };

  const handleErrors = (responseData) => {
    if (!responseData.success) {
      showPopupMessage("Error", responseData.errors);
      clearForm();
    }
  };

  const addProduct = async () => {
    let product = { ...productDetails };

    if (image) {
      const resData = await uploadImage(image);

      if (!resData.success) {
        handleErrors(resData);
        return;
      }

      product.image = resData.image_url;

      const response = await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      handleErrors(data);

      if (data.success) {
        showPopupMessage("Success", "Product Added Successfully");
        clearForm();
      } else {
        showPopupMessage("Failed", "Failed to Add Product");
      }
    } else {
      showPopupMessage("Warning", "Please upload an image.");
    }
  };

  return (
    <div className='add-product'>
      <div className="product-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder='Type here'
        />
      </div>
      <div className="product-price">
        <div className="product-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder='Type here'
          />
        </div>
        <div className="product-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder='Type here'
          />
        </div>
      </div>
      <div className="product-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
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
            src={image ? URL.createObjectURL(image) : upload_area}
            className="product-thumbnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name='image'
          id='file-input'
          hidden
        />
      </div>
      <button onClick={addProduct} className='product-btn'>ADD</button>

      <Popup 
        show={showPopup} 
        handleClose={() => setShowPopup(false)} 
        title={popupTitle} 
        message={popupMessage}
      />
    </div>
  );
};

export default AddProduct;
