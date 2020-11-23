//Packages
import React, { useState } from "react";

//Styles
import "./styles/ActionExceeded.css";

const ActionExceeded = (props) => {
  const [changePath, setChangePath] = useState();
  const [actionExceed, setactionExceeded] = useState();
  let actionText = props.value;
  let actionPlaceholder = props.actionPlaceholder;
  const onChangePath = (changePath) => {
    setChangePath(changePath.target.value);
  };
  const onChangeAction = (action) => {
    props.onChangeAction(action);
  };

  const selectAction = () => {
    props.selectAction();
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
    <div className="action-exceeded">
      <p className="action-p">Action when exceeded</p>
      <div className="jump-slide">
        <select
          className="select-action"
          onChange={onChangePath}
          value={actionExceed}
        >
          <option value="terminate">Terminate Interview</option>
          <option value="backward">Jump Backward</option>
          <option value="forward">Jump Forward</option>
          <option value="jumpSlide">Jump to Slide</option>
          <option value="continue">Continue Interview</option>
        </select>
        {changePath === "jumpSlide" ? (
          <div className="code-exceeded">
            <input
              className="input-exceeded"
              value={actionText}
              onChange={(action) => {
                onChangeAction(action);
                selectAction(actionExceed)
              }}
              placeholder={actionPlaceholder}
            />
          </div>
        ) : null}
      </div>

      <div className="buttons">
        <div className="apply" onClick={(action) => onApplyAction(action)}>
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
