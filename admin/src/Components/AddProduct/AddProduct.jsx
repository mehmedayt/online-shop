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

  const handleErrors = (responseData) => {
    if (!responseData.success) {
      setPopupTitle("Error");
      setPopupMessage(responseData.errors);
      setShowPopup(true);
      
      setProductDetails({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
      });
      setImage(null);
    }
  };

  const Add_Product = async () => {
    console.log(productDetails);

    let resData;
    let product = { ...productDetails };

    let formData = new FormData();
    if (image) {
      formData.append('product', image);

      await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      }).then((res) => res.json()).then((data) => { resData = data; });

      handleErrors(resData);

      if (resData.success) {
        product.image = resData.image_url;
        console.log(product);

        await fetch('http://localhost:4000/addproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        }).then((res) => res.json()).then((data) => {
          handleErrors(data);

          if (data.success) {
            setPopupTitle("Success");
            setPopupMessage("Product Added Successfully");
            setShowPopup(true);

            setProductDetails({
              name: "",
              image: "",
              category: "women",
              new_price: "",
              old_price: ""
            });
            setImage(null);
          } else {
            setPopupTitle("Failed");
            setPopupMessage("Failed to Add Product");
            setShowPopup(true);
          }
        });
      }
    } else {
      setPopupTitle("Warning");
      setPopupMessage('Please upload an image.');
      setShowPopup(true);
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
      <button onClick={Add_Product} className='product-btn'>ADD</button>

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
