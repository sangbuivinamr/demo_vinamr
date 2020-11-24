/*
* Contributor: 
    - Tiến 14/11/2020
*/

//Packages
import React from "react";
import HeaderRawData from "../../../components/app/HeaderRawData";

//Styles
import "./styles/NotCompleted.css";

const NotCompleted = (props) => {
  let bodyNotCompleted = props.bodyNotCompleted;
  const renderBody = () => {
    return (
      bodyNotCompleted &&
      bodyNotCompleted.map(
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
              <td>{status}</td>
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
    <div className="tab-3">
      <table className="table-3">
        <HeaderRawData />
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};
export default NotCompleted;
