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
   * @summary The function for button Apply and the function will be called in the parent component
   * @param text
   * @return void
   */
  const onApply = (text) => {
    props.onApply(text);
  };

  /**
   * @summary The function for button Apply and the function will be called in the parent component
   * @param text
   * @return void
   */
  const onApplyAll = (text) => {
    props.onApplyAll(text);
  };


  /**
   * @summary The function onChange to get the input to push the data
   * @param {*} e
   * @return void
   */
  const onChangeText = (e) => {
    props.onChangeText(e);
  };

  /**
   * @summary The function will be called when tick on check box then make the textarea cannot be typed
   * @return void
   */
  const handleDisable = () => {
    setDisabled(!disabled);
  };

  let message = props.mess;
  let valueText = props.value
  return (
    <div className = "message">
      <div className = "two-mess">
        <p className = "p-mess">Message</p>
        <input
          className = "check"
          name = "message"
          type = "checkbox"
          onClick = {(e) => {
            handleClicked(e);
            handleDisable(e);
          }}
        />
        <p className = "no-mess">
          <i>No Message</i>
        </p>
      </div>
      <textarea
        className = "notification-area"
        type = "text"
        disabled = {disabled}
        placeholder = {message}
        value = {valueText}
        onChange = {(text) => onChangeText(text)}
      />
      <div className = "button-mess">
        <div className = "apply-mess" onClick = {(text) => onApply(text)}>
          Apply
        </div>
        <div className = "apply-all-mess" onClick = {(text) => onApplyAll(text)}>
          Apply to All
        </div>
      </div>
    </div>
  );
};
export default Message;

  // const sendIndex = (indexCell) => {
  //   props.sendIndex(indexCell);
  // };