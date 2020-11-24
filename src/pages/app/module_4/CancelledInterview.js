import React from "react";
import HeaderRawData from "../../../components/app/HeaderRawData"
import "./styles/CancelledInterview.css"
const CancelledInterview = (props) => {
  const renderBody = () => {
    const bodyCancelled = props.bodyCancelled;
  }
  return (
    <div className="table-2">
      <table>
       <HeaderRawData/>
        <tbody>
            {renderBody()}
        </tbody>
      </table>
    </div>
  );
};
export default CancelledInterview;
