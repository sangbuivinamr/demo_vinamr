import React from "react";
import HeaderRawData from "../../../components/app/HeaderRawData"
import "./styles/CancelledInterview.css"
const CancelledInterview = (props) => {
    const bodyCancelled = props.bodyCancelled;
    const renderBody = () => {
      return (
        bodyCancelled &&
        bodyCancelled.map(
          (
            {
              interviewId,
              completed,
              status,
              endTime,
              audio,
              photos,
              latitude,
              longitude,
              duration,
            },
            index
          ) => {
            return (
              <tr key={index}>
                <td>{interviewId}</td>
                <td>{completed}</td>
                <td>
                  {status}
                  <select className="select-option-body">
                    <option>Pending QC (1)</option>
                    <option>Approved</option>
                    <option>Pending QC (2)</option>
                    <option>Pending FW</option>
                  </select>
                </td>
                <td>{endTime}</td>
                <td>{audio}</td>
                <td>{photos}</td>
                <td>{latitude}</td>
                <td>{longitude}</td>
                <td>{duration}</td>
              </tr>
            );
          }
        )
      );
  
  }
  return (
    <div className="tab-2">
      <table className = "table-2">
       <HeaderRawData/>
        <tbody>
            {renderBody()}
        </tbody>
      </table>
    </div>
  );
};
export default CancelledInterview;
