//Packages
import React from "react";

//Styles
import "./styles/InterviewRow.css";
const InterviewRow = (props) => {
  const dataInterview = props.dataInterview;
  return (
    dataInterview &&
    dataInterview.map(({ dataName, current }, index) => {
      return (
        <tr key={index} id="t-row">
          <td id="td-1">
            <div id="col-name">
              <img
                alt=""
                src={require("../../../../assets/images/prev.png")}
                className="icon-finish"
              />
              <p>{dataName}</p>
            </div>
          </td>
          <td id="td-2">
            <p>{current}</p>
          </td>
        </tr>
      );
    })
  );
};
export default InterviewRow;
