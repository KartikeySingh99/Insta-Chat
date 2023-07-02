import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const senduser = () => {
    console.log(user);
    console.log("send user");
    if (user === "") {
      alert("Enter Your Name!");
    } else {
      localStorage.setItem("user", user);
      navigate("/chat");
    }
  };
  return (
    <>
      <div className="login">
        <div className="form-container">
          <h1 className="form-heading" data-text="Insta Chat">
            Insta Chat
          </h1>
          <input
            type="text"
            placeholder="User-Name"
            id="user"
            onChange={(e) => setUser(e.target.value)}
            autoComplete="off"
          />
          <button onClick={senduser} id="enter">Enter</button>
        </div>
      </div>
    </>
  );
};

export default Login;
