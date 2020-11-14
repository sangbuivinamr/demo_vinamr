/*
* Contributor: 
    - Tiến 14/11/2020
*/
import React from "react";

const NotCompleted = (props) => {
  let bodyCounted = props.bodyCounted;
  const renderHeader = () => {
    let header = [
      "InterviewID",
      "Completed",
      "Status",
      "EndTime",
      "Audio",
      "Photos",
      "Latitude",
      "Longitude",
      "Duration",
    ];
    return header.map((key, index) => {
      return <th key={index}>{key}</th>;
    });
  };
  const renderBody = () => {
    return (
      bodyCounted &&
      bodyCounted.map(
        ({
          data_index,
          interviewId,
          completed,
          status,
          endTime,
          audio,
          photos,
          latitude,
          longitude,
          duration,
        }) => {
          return (
            <tr key={data_index}>
              <td></td>
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
    <div className="table-3">
      <table>
        <tr>
          <thead>
            <td></td>
            {renderHeader()}
          </thead>
        </tr>
        <tr>
          <tbody>
            <td>{renderBody()}</td>
          </tbody>
        </tr>
      </table>
    </div>
  );
};
export default NotCompleted;
