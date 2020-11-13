//Packages
import React, { useState } from "react";

//Styles
import "./styles/Message.css";

const Message = (props) => {
  const [noNotification, setNoNotification] = useState();
  const [clicked, setClicked] = useState(false);
  const handleClicked = (name) => {
    setClicked(!clicked);
    console.log("test", !clicked);
    if (!clicked === true) {
      noMess(name);
      console.log("run");
    }
  };
  const noMess = (name) => {
    setNoNotification(noNotification);
  };
  return (
    <div className="message">
      <div className="two-mess">
        <p className="p-mess">Message</p>
        <input
          className="check"
          name="message"
          type="checkbox"
          value={clicked}
          onClick={() => handleClicked()}
        />
        <p className="no-mess">
          <i>No Message</i>
        </p>
      </div>
      <div className="notification-area">
        <p className="notification" onChange={(props) => noMess(props.name)}>
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
