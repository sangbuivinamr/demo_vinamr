import React from "react";
import "./styles/CancelledInterview.css"
const CancelledInterview = (props) => {
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
      return (
        <tr className="cell-header">
          <span>
            <td key={index}>{key}</td>
            <select className="select-option">
              <option>hi</option>
              <option>hi2</option>
              <option>hi2</option>
              <option>hi2</option>
            </select>
          </span>
        </tr>
      );
    });
  };
  const renderBody = () => {
    const bodyCancelled = props.bodyCancelled;
    return (
      bodyCancelled &&
      bodyCancelled.map(
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
            <tr key={data_index} className="cell-body">
              <td>
                <div className=" check-area">
                  <input type="checkbox" className="input-checkbox" />
                </div>
              </td>

              <td>{interviewId}</td>
              <td>
                {completed}
                <select>
                  <option>hih</option>
                </select>
              </td>
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
    <div className="table-2">
      <table>
        <tr>
          <thead>
            <th></th>
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
export default CancelledInterview;
