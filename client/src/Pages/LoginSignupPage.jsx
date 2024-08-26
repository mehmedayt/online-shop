import { useState } from "react";
import "./CSSPages/LoginSignupPage.css";
import PopUpComponent from '../Components/PopUpComponent/PopUpComponent';

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
        setPopupMessage(responseData.errors);
        setShowPopup(true);
        setFormData({
            username: "",
            password: "",
            email: "",
        });
    }
};


  const signup = async () => {
    console.log("Sign up function executed", formData);
    let responseData;
    await fetch("http://localhost:4000/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    handleErrors(responseData);

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    }
  };

  const login = async () => {
    console.log("Login function executed", formData);
    let responseData;
    await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    handleErrors(responseData);

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
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
                <p>
                    By continuing. I agree to the terms of use & privacy policy.
                </p>
            </div>
        </div>

        {/* Popup компонент */}
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
