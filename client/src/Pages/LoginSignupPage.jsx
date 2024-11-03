import { useState } from "react";
import "./CSSPages/LoginSignupPage.css";
import PopUpComponent from '../Components/PopUpComponent/PopUpComponent';
import { postRequest } from '../utils/requester';

const LoginSignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [state, setState] = useState("Login");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleErrors = (responseData) => {
    if (!responseData.success) {
      setPopupTitle("Error");
      const message = responseData.errors || "An error occurred. Please try again.";
      setPopupMessage(message);
      setShowPopup(true);
      
      setFormData({
        username: "",
        password: "",
        email: "",
      });
    }
  };
  

  const signup = async () => {
    try {
      const responseData = await postRequest("/auth/signup", formData);
      handleErrors(responseData);
  
      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        localStorage.setItem("user-email", formData.email);
        window.location.replace("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setPopupTitle("Signup Error");
      setPopupMessage("Unable to sign up. Please check your details and try again.");
      setShowPopup(true);
    }
  };
  

  const login = async () => {
  try {
    const responseData = await postRequest("/auth/login", formData);
    handleErrors(responseData);

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      localStorage.setItem("user-email", formData.email);
      window.location.replace("/");
    }
  } catch (error) {
    console.error("Login error:", error);
    setPopupTitle("Login Error");
    setPopupMessage("Unable to login. Please check your credentials and try again.");
    setShowPopup(true);
  }
};

  return (
    <div className="login">
      <div className="login-container">
        <h1>{state}</h1>
        <div className="login-fields">
          {state === "Sign up" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <button onClick={() => (state === "Login" ? login() : signup())}>
          Continue
        </button>

        {state === "Sign up" ? (
          <p className="login-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        ) : (
          <p className="login-login">
            Create an account?{" "}
            <span onClick={() => setState("Sign up")}>Click here</span>
          </p>
        )}

        <div className="login-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>

      <PopUpComponent
        show={showPopup}
        handleClose={() => setShowPopup(false)}
        title={popupTitle}
        message={popupMessage}
      />
    </div>
  );
};

export default LoginSignupPage;
