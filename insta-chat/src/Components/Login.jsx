import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [user, setUser] = useState("");
  const senduser = () => {
    if (user === "") {
      alert("Enter Your Name!");
    } else {
      localStorage.setItem("userName", user);
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
          <Link to={user === "" ? `/` : `/chat`}>
            <button id="enter" onClick={senduser}>
              Enter Chat!
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
// export { user };
