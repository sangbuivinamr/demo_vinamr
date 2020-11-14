import React from "react";

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
      return <th key={index}>{key}</th>;
    });
  };
  const renderBody = () => {
    const bodyCounted = props.bodyCounted;
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