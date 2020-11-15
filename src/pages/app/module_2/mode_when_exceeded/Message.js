//Packages
import React, { useState } from "react";

//Styles
import "./styles/Message.css";

const Message = (props) => {
  const handleClicked = (e) => {
    props.handleClicked (e)
  }
  
  // const noMess = (e) => {
  //   props.noMess (e)
  // }
  return (
    <div className="message">
      <div className="two-mess">
        <p className="p-mess">Message</p>
        <input
          className="check"
          name="message"
          type="checkbox"
          onClick={(e) => {
            handleClicked(e)
            // noMess(e)
          }}
        />
        <p className="no-mess">
          <i>No Message</i>
        </p>
      </div>
      <div className="notification-area">
        <p className="notification" >
          {props.mess}
        </p>
      </div>
      <div className="button-mess">
        <div className="apply-mess">Apply</div>
        <div className="apply-all-mess">Apply to All</div>
      </div>
    </div>
  );
};
export default Message;
