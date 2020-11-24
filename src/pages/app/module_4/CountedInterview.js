//Packages
import React from "react";
import HeaderRawData from "../../../components/app/HeaderRawData";

//Styles
import "./styles/CountedInterview.css";

const CountedInterview = (props) => {
  const bodyCounted = props.bodyCounted;
  const renderBody = () => {
    return (
      bodyCounted &&
      bodyCounted.map(
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
            <tr key={index} className="body-counted">
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
  };
  return (
    <div className="tab-1">
      <table className="table-1">
        <HeaderRawData />
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};
export default CountedInterview;
