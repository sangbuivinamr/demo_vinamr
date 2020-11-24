/**
 * Contributor: Tiến 24/11/2020
 */

//Packages
import React, { Fragment } from "react";

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
  const isHeaderNeeded = [
    "InterviewID",
    "Completed",
    "Status",
    "EndTime",
    "Duration",
  ];
  const renderHeader = () => {
    return header.map((key, index) => {
      return (
        <th className="element-header">
          {key}
          {isHeaderNeeded.includes(key) ? (
            <select className="select-option">
              <option>hi</option>
              <option>hi2</option>
              <option>hi2</option>
              <option>hi2</option>
            </select>
          ) : null}
        </th>
      );
    });
  };
  return <thead className="header-component">{renderHeader()}</thead>;
};
export default HeaderRawData;
