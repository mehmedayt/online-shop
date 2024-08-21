/* eslint-disable quotes */
/* eslint-disable semi */
import { useState } from "react";
import "./CSSPages/LoginSignupPage.css";

const LoginSignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
}

  const signup = async () => {
    console.log("Sign up function executed", formData);
    let responseData;
    await fetch("http://localhost:4000/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Sign up</h1>
        <div className="login-fields">
        <div className="loginsignup-fields">
                    <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" />
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />  
                </div>
        </div>
        <button onClick={()=>{signup()}}>Continue</button>
        <p className="login-login">
          Already have an account? <span>Login here</span>
        </p>
        <div className="login-agree">
          <input type="checkbox" name="" id="" />
          <p>I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;
