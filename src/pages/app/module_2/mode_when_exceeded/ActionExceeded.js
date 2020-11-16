//Packages
import React, { useState } from "react";
import axios from "axios";

//Styles
import "./styles/ActionExceeded.css";

//Default url
const URL_POST_ACTIONEXCEEDED = "https://115.73.222.254:8000/";

const ActionExceeded = (props) => {
  const [changePath, setChangePath] = useState();
  const [changeCode, setChangeCode] = useState();

  const onChangePath = (changePath) => {
    setChangePath(changePath.target.value);
  };
  const onChangeCode = (changeCode) => {
    setChangeCode(changeCode);
  };

  /**
   *@summary This function will push the data from client side to server side
   *@param  projectId This param will direct to the database
   *@return void
   */
  const pushDataInput = (projectId) => {
    if (changeCode !== "" || changeCode !== undefined) {
      axios
        .post(URL_POST_ACTIONEXCEEDED + `?projectId=${projectId}`, changeCode)
        .then((res) => {
          console.log(res);
        });
      console.log("change", changeCode);
    }
  };
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
        <div className="apply" onClick={() => pushDataInput("1", changeCode)}>
          Apply
        </div>
        <div className="apply-all">Apply to All</div>
      </div>
    </div>
  );
};
export default ActionExceeded;
