import React from "react";
import "../index.css";
const Message = (props) => {
  if (props.user) {
    return (
      <div className={`msg ${props.classs}`}>
        <p className="text">
          <span className=" user">{`${props.user}`}:</span>
          <span className="">{`${props.text}`}</span>
        </p>
      </div>
    );
  } else {
    return (
      <div className={`msg ${props.classs}`}>
        <p className="text">
          <span className="user">You:</span>
          <span>{`${props.text}`}</span>
        </p>
      </div>
    );
  }
};

export default Message;
