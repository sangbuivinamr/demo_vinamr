//Packages
import React from "react";

//Styles
import "./styles/CountedInterview.css";

const CountedInterview = (props) => {
  const bodyCounted = props.bodyCounted;
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
    <div className="table-1">
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
export default CountedInterview;
