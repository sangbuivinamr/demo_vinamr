//Packages
import React, { useState } from "react";

//Styles
import "./styles/Message.css";

const Message = (props) => {
  const [disabled, setDisabled] = useState(false);
  /**
   * @summary The function will call the action from parent and make parent component do run the fuction
   * @param {*} e
   * @return void
   */
  const handleClicked = (e) => {
    props.handleClicked(e);
  };

  /**
   * @summary The function will be called when tick on check box then make the textarea cannot be typed
   * @return void
   */
  const handleDisable = () => {
    setDisabled(!disabled);
  };

  /**
   * @summary The function will be call when tick on check box and it is be ran by parent component
   * @param {*} e
   * @return void
   */
  const deleteCell = (indexCell) => {
    props.deleteCell(indexCell);
  };
    const onChangText = (e) => {
      props.onChangText(e);
    };
    const sendIndex = (indexCell) => {
      props.sendIndex(indexCell)
    }
    
  /**
   * @summary The function onChange to get the input to push the data
   * @param {*} text 
   * @return void
   */
    
  return (
    <div className="message">
      <div className="two-mess">
        <p className="p-mess">Message</p>
        <input
          className="check"
          name="message"
          type="checkbox"
          onClick={(e) => {
            handleClicked(e);
            handleDisable(e);
          }}
        />
        <p className="no-mess">
          <i>No Message</i>
        </p>
      </div>
      <textarea
        className="notification-area"
        type="text"
        disabled={disabled}
        placeholder={props.mess}
        value={props.text}
        onChange={(text) => onChangText(text.target.value)}
      />
      <div className="button-mess">
        <div className="apply-mess" onClick={(e) => deleteCell(e)}>Apply</div>
        <div className="apply-all-mess" onClick={indexCell => sendIndex(indexCell)}>Apply to All</div>
      </div>
    </div>
  );
};
export default Message;
