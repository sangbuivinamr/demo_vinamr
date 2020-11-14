//Packages
import React, { useState } from "react";
import { FaSyncAlt } from "react-icons/fa";

//Styles
import "./styles/QuotaTracking.css";

const QuotaTracking = (props) => {
  const [selectedTracking, setSelectedTracking] = useState("tracking");

  const onChangeNav = (e) => {
    props.history.push(`/${e.target.value}`);
  };
  return (
    <div className="tracking">
      <div className="tracking tracking-bar">
        <div className="bar">
          <h2 className="h2-tracking">QUOTA SETTINGS</h2>
          <div className="export area">
            <div className="export">
              <p className="p-tracking">Export Quota</p>
            </div>
            <div className="mode-tracking">Mode:</div>
            <select
              className="select"
              onChange={onChangeNav}
              value={selectedTracking} //Initialize state for the mode when user naivgate to this mode
            >
              <option value="quotaManagement">Expression</option>
              <option value="editing">Editing</option>
              <option value="exceeded">When Exceeded</option>
              <option value="tracking">Tracking</option>
              <option value="interview">Interview Preview</option>
            </select>
            <div className="icon-sync">
              <i>
                <FaSyncAlt
                  className="sync-icon"
                  onClick={() => console.log("nguasa")}
                />
              </i>
            </div>
            <p
              // onChange=
              className="sync"
            >
              Last Update
            </p>
          </div>
        </div>

        <div className="content-tracking"></div>
      </div>
    </div>
  );
};

export default QuotaTracking;
