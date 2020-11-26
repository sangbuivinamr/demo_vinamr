/**
 * Contributor: Tiến 24/11/2020
 */

//Packages
import React from "react";

//Styles
import "../../components/app/styles/HeaderRawData.css";

const HeaderRawData = (props) => {
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
  const isHeaderNeeded = ["InterviewID", "Completed", "EndTime", "Duration"];
  const isStatus = ["Status"];
  const renderHeader = () => {
    return header.map((key, index) => {
      return (
        <th className="element-header">
          {key}
          {isStatus.includes(key) ? (
            <select className="select-option">
              <option>Pending QC (1)</option>
              <option>Pending FW</option>
              <option>Pending FW</option>
              <option>Pending FW</option>
            </select>
          ) : isHeaderNeeded.includes(key) ? (
            <select className="select-option">
              <option>test</option>
              <option>test</option>
              <option>test</option>
              <option>test</option>
            </select>
          ) : null}
        </th>
      );
    });
  };
  return <thead className="header-component">{renderHeader()}</thead>;
};
export default HeaderRawData;
