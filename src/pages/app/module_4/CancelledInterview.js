import React, { useState } from "react";
import HeaderRawData from "../../../components/app/HeaderRawData";
import "./styles/CancelledInterview.css";
const CancelledInterview = (props) => {
  let optionCancel = props.selectedCancel
  const onChangeOptionCancel = (optionCancel) => {
    props.onChangeOptionCancel(optionCancel);
  };
  const bodyCancelled = props.bodyCancelled;
  const renderBody = () => {
    return (
      bodyCancelled &&
      bodyCancelled.map(
        (
          { interviewid, complete, curDate, Latitude, Longtitude, duration },
          index
        ) => {
          return (
            <tr key={index} className="body-counted">
              {complete === "Completed" ? <td>{interviewid}</td> : null}
              {complete === "Completed" ? <td>{complete}</td> : null}
              {complete === "Completed" ? (
                <td>
                  {optionCancel}
                  <select
                    className="select-option-body"
                    value={optionCancel}
                    onChange={(optionCancel) => onChangeOptionCancel(optionCancel)}
                  >
                    <option>Pending QC (1)</option>
                    <option>Pending FW</option>
                    <option>Pending QC (2)</option>
                    <option>Approved</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              ) : null}
              {complete === "Completed" ? <td>{curDate}</td> : null}
              {complete === "Completed" ? <td>Link</td> : null}
              {complete === "Completed" ? <td>Link</td> : null}
              {complete === "Completed" ? <td>{Latitude}</td> : null}
              {complete === "Completed" ? <td>{Longtitude}</td> : null}
              {complete === "Completed" ? <td>{duration}</td> : null}
            </tr>
          );
        }
      )
    );
  };
  return (
    <div className="tab-2">
      <table className="table-2">
        <HeaderRawData />
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};
export default CancelledInterview;
