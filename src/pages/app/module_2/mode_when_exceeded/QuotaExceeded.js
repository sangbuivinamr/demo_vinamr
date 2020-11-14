//Packages
import React, { useState, useEffect } from "react";
import { IoIosSave } from "react-icons/io";
import { IoIosUndo } from "react-icons/io";
import { IoIosRedo } from "react-icons/io";
import ExceededLeft from "./ExceededLeft";
import QuotaName from "./QuotaName";
import ActionExceeded from "./ActionExceeded";
import Message from "./Message";
import axios from "axios";

//Styles
import "./styles/QuotaExceeded.css";

//Data
import {
  QUOTA_OVERVIEW_DATA,
  EXCEEDED_LAYOUT_LEFT,
  EXCEEDED_SEX_LEFT,
} from "../../../../data/testing-data";

const QuotaExceeded = (props) => {
  const [quotaData, setQuotaData] = useState(QUOTA_OVERVIEW_DATA);
  const [quotaInput, setQuotaInput] = useState({
    quota_index: null,
    quota_label: "",
    quota_expression: "",
  });
  const [quotaClickStatus, setQuotaClickStatus] = useState({
    quotaLabel: "",
    status: false,
  });
  const [typeCar, setTypeCar] = useState("");
  const [notification, setNotification] = useState();
  const [city, setCity] = useState("");
  const [selectedExceeded, setSelectedExceeded] = useState("exceeded"); // Initialize the state, so when the user navigate to this mode, the mode will have the mode is interview in the option
  const onCheckingNotAnyHighlightedQuota = () =>
    quotaClickStatus.quotaLabel === "" && quotaClickStatus.status === false;
  const onCheckingNotAnyInputtedQuota = () =>
    quotaInput.quota_index === null &&
    quotaInput.quota_label === "" &&
    quotaInput.quota_expression === "";

  /**
   * @summary Add a quota row to the table
   */
  const onAddingQuota = () => {
    // Check if the user has actually inputted a quota
    if (onCheckingNotAnyInputtedQuota()) {
      alert("You haven't typed any quota");
      return;
    }

    let newQuotaData = quotaData.concat(quotaInput);

    setQuotaData(newQuotaData);

    // After we've added a quota, the input will be cleaned up
    setQuotaInput({
      quota_index: null,
      quota_label: "",
      quota_expression: "",
    });
  };

  // /**
  //  * @summary Handle the input change for the label input in the quota table
  //  * @param {string} quota_label The label (aka value of the input at the label column)
  //  */
  // const onAddingQuotaLabel = (quota_label) => {
  //     let newQuotaInput = {
  //         quota_index: quotaData.length,
  //         quota_label: quota_label,
  //         quota_expression: quotaInput.quota_expression
  //     };
  //     setQuotaInput(newQuotaInput)
  // }

  // /**
  //  * @summary Handle the input change for the expression input in the quota table
  //  * @param {string} quota_expression The expression (aka value of the input at the expression column)
  //  */
  // const onAddingQuotaExpression = (quota_expression) => {
  //     let newQuotaInput = {
  //         quota_index: quotaData.length,
  //         quota_label: quotaInput.quota_label,
  //         quota_expression: quota_expression
  //     }
  //     setQuotaInput(newQuotaInput)
  // }

  /**
   * @summary Make the selected (clicked) row to be highlighted
   * @param {string} quotaLabel The label of the current selected quota row
   */
  const onChoosingQuota = (quotaLabel) => {
    let newQuotaStatus = {
      quotaLabel: quotaLabel,
      status: true,
    };
    setQuotaClickStatus(newQuotaStatus);
  };

  /**
   * @summary The function save and push the data from client slide to server
   * @param
   * @return void
   */
  // const onSave = () => {

  // }

  const onChangeNav = (e) => {
    props.history.push(`/${e.target.value}`);
  };

  /**
   * @summary This function take the data from chilren to parent
   * @param {*} e took from table layout left
   * @return void
   */
  const onChoosingCell = (e) => {
    let type_car = e.target.parentNode.childNodes[0].innerText;
    let notification = e.target.innerText;

    //The cellClicked will define which index the user clicked on the table to match with the header
    let cellClicked = e.target.cellIndex;

    //The header in the table
    let city =
      e.target.offsetParent.childNodes[0].childNodes[0].cells[cellClicked]
        .innerText;

    // set 2 state for compononent QuotaName
    setTypeCar(type_car);
    setCity(city);

    // set state for component Message
    setNotification(notification);
  };
  /**
   * @summary Function useEffect
   * @return void
   */
  useEffect(() => {
    // getDataInformation("1");
    // getDataExpression("0515", code);
  }, []);

  const getDataTableExceeded = () => {
    axios.get();
  }
  return (
    <div className="exceeded">
      <div className="exceeded exceeded-bar">
        <h2 className="h2-exceeded">QUOTA SETTINGS</h2>
        <div className="up">
          <i>
            <IoIosUndo
              className="up icon"
              // onClick={() => onUndo()}
            />
          </i>
        </div>
        <div className="up">
          <i>
            <IoIosRedo
              className="up icon"
              // onClick={() => onRedo()}
            />
          </i>
        </div>
        <div className="up">
          <i>
            <IoIosSave className="up icon" onClick={() => onAddingQuota()} />
          </i>
        </div>
        <div className="mode-exceeded">Mode:</div>
        <select
          className="select"
          onChange={onChangeNav}
          value={selectedExceeded} //Initialize state for the mode when user naivgate to this mode
        >
          <option value="quotaManagement">Expression</option>
          <option value="editing">Editing</option>
          <option value="exceeded">When Exceeded</option>
          <option value="tracking">Tracking</option>
          <option value="interview">Interview Preview</option>
        </select>
        <h2 className="review">ACTION & MESAGES</h2>
      </div>
      <div className="layouts">
        <div className="layout-left">
          <ExceededLeft
            exceededLeft={EXCEEDED_LAYOUT_LEFT}
            exceededLeftHeader={QUOTA_OVERVIEW_DATA}
            exceededLeftSex={EXCEEDED_SEX_LEFT}
            onChoosingCell={(e) => onChoosingCell(e)}
            setQuotaClickStatus={setQuotaClickStatus}
            onChoosingQuota={(e) => onChoosingQuota(e)}
            quotaClickStatus={quotaClickStatus}
          />
        </div>
        <div className="layout-right">
          <div>
            <QuotaName dataCityTable={city} dataCarTable={typeCar} />
          </div>
          <div>
            <ActionExceeded />
          </div>
          <div>
            <Message mess={notification} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotaExceeded;
