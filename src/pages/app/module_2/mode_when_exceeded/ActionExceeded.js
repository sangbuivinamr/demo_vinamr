//Packages
import React, { useState } from "react";

//Styles
import "./styles/ActionExceeded.css";

const ActionExceeded = (props) => {
  const [changePath, setChangePath] = useState();
  const [changeCode, setChangeCode] = useState();

  const onChangePath = (changePath) => {
    setChangePath(changePath.target.value);
  };
  const onChangeCode = (changeCode) => {
    setChangeCode(changeCode);
  };
console.log("input",changeCode)

  return (
    <div className="action-exceeded">
      <p className="action-p">Action when exceeded</p>
      <div className="jump-slide">
        <select className="select-action" onChange={onChangePath}>
          <option value="terminate">Terminate Interview</option>
          <option value="backward">Jump Backward</option>
          <option value="forward">Jump Forward</option>
          <option value="jumpSlide">Jump to Slide</option>
          <option value="continue">Continue Interview</option>
        </select>
        {changePath === "jumpSlide" ? (
          <div className="code-exceeded">
            {" "}
            <input
              className="input-exceeded"
              value={changeCode}
              onChange={(changeCode) => onChangeCode(changeCode.target.value)}
              placeholder="330/334"
            />{" "}
          </div>
        ) : null}
      </div>

      <div className="buttons">
        <div className="apply">Apply</div>
        <div className="apply-all">Apply to All</div>
      </div>
    </div>
  );
  
};
export default ActionExceeded;
