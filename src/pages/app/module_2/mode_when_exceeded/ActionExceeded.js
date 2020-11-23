//Packages
import React, { useState } from "react";

//Styles
import "./styles/ActionExceeded.css";

const ActionExceeded = (props) => {
  let actionText = props.value;
  let actionPlaceholder = props.actionPlaceholder;
  let selectedMode = props.selectedMode;
  const [changePath, setChangePath] = useState(selectedMode);
  
  const onChangeAction = (action) => {
    props.onChangeAction(action);
  };


  const selectAction = (value) => {
    props.selectAction(value);
  };


  /**
   * @summary The function for button Apply and the function will be called in the parent component
   * @param text
   * @return void
   */
  const onApplyAction = (action) => {
    props.onApply(action);
  };

  /**
   * @summary The function for button Apply and the function will be called in the parent component
   * @param text
   * @return void
   */
  const onApplyAllAction = (action) => {
    props.onApplyAll(action);
  };
  return (
    <div className = "action-exceeded">
      <p className = "action-p"> Action when exceeded</p>
      <div className = "jump-slide">
        <select
          className = "select-action"
          value = {selectedMode}
          onChange={(e) => {
            setChangePath(e.target.value)
            selectAction(e.target.value)
          }}
        >
          <option value = "Terminate Interview"> Terminate Interview </option>
          <option value = "Jump Backward"> Jump Backward </option>
          <option value = "Jump Forward"> Jump Forward </option>
          <option value ="Jump to Slide"> Jump to Slide </option>
          <option value = "Continue Interview"> Continue Interview </option>
        </select>
        {selectedMode === "Jump to Slide" ? (
          <div className = "code-exceeded">
            <input
              className = "input-exceeded"
              value = {actionText}
              onChange = {(action) => {
                onChangeAction(action);
              }}
              placeholder = {actionPlaceholder}
            />
          </div>
        ) : null}
      </div>

      <div className="buttons">
        <div
          className="apply"
          onClick={() => {
            onApplyAction();
            selectAction(changePath);
          }}
        >
          Apply
        </div>
        <div
          className="apply-all"
          onClick={(action) => onApplyAllAction(action)}
        >
          Apply to All
        </div>
      </div>
    </div>
  );
};
export default ActionExceeded;
