//Packages
import React, { useState, useEffect } from "react";
import InterviewRow from "./InterviewRow";

import { EXCEEDED_LAYOUT_LEFT } from "../../../../data/testing-data";
//Styles
import "./styles/QuotaInterview.css";
import axios from "axios";

const URL_INTERVIEW =
  "https://115.73.222.254:8000/interviewer/interviewerReview";
const QuotaInteview = (props) => {
  const [selectedInterview, setSelectedInterview] = useState("interview"); // Initialize the state, so when the user navigate to this mode, the mode will have the mode is interview in the option
  const [dataInterview, setDataInterview] = useState([]);

  /**
   * @summary Function useEffect
   */
  useEffect(() => {
    getDataInterview("0560");
  }, []);

  const getDataInterview = async (projectId) => {
    const response = await axios.get(URL_INTERVIEW + `?projectId=${projectId}`);
    let dataTable = response.data;
    setDataInterview(dataTable);
    console.log("resp", response);
  };
  console.log("dad");

  const onChangeNav = (e) => {
    props.history.push(`/${e.target.value}`);
    setSelectedInterview(selectedInterview);
  };
  const renderHeader = () => {
    let headerElement = ["Name", "Completed"];

    return headerElement.map((key, index) => {
      return <th key={index}>{key}</th>;
    });
  };

  // if (dataInterview.length !== 0) console.log("datda", dataInterview);
  return (
    <div className="interview">
      <div className="interview interview-bar">
        <h2 className="h2-interview">QUOTA SETTINGS</h2>

        <div className="mode-interview">Mode:</div>
        <select
          className="select"
          onChange={onChangeNav}
          value={selectedInterview} //Initialize state for the mode when user naivgate to this mode
        >
          <option value="">Expression</option>
          <option value="editing">Editing</option>
          <option value="exceeded">When Exceeded</option>
          <option value="tracking">Tracking</option>
          <option value="interview">Interview Preview</option>
        </select>
      </div>
      <div id="prev">
        <table id="table-prev">
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>
            <InterviewRow dataInterview={dataInterview} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuotaInteview;
