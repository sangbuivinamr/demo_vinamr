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
import { QUOTA_OVERVIEW_DATA } from "../../../../data/testing-data";

//Default URL
const URL_DATA_EXCEEDED = "https://115.73.222.254:8000/quota/quotaExceeded";
const QuotaExceeded = (props) => {
  //Initial States
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
  const [clicked, setClicked] = useState(false);
  const [dataExceeded, setDataExceeded] = useState([]);
  const [text, setText] = useState();
  const [indexCell, setIndexCell] = useState();

  const onCheckingNotAnyHighlightedQuota = () =>
    quotaClickStatus.quotaLabel === "" && quotaClickStatus.status === false;
  const onCheckingNotAnyInputtedQuota = () =>
    quotaInput.quota_index === null &&
    quotaInput.quota_label === "" &&
    quotaInput.quota_expression === "";

  /**
   * @summary Function useEffect
   * @return void
   */
  useEffect((e) => {
    getDataExceeded("1");
  }, []);

  const getDataExceeded = async (projectId) => {
    await axios
      .get(URL_DATA_EXCEEDED + `?projectId=${projectId}`)
      .then((res) => {
        let dataTable = res.data;
        setDataExceeded(dataTable);
      });
  };

  /**
   * @summary Make the selected (clicked) row to be highlighted
   * @param {string} exceededCell The cell of the current selected quota row
   */
  const onChoosingQuota = (exceededCell) => {
    let newQuotaStatus = {
      quotaLabel: exceededCell,
      status: true,
    };
    setQuotaClickStatus(newQuotaStatus);
  };

  const onChangeNav = (e) => {
    props.history.push(`/${e.target.value}`);
  };

  const sendIndex = (indexCell) => {
      setIndexCell(indexCell);
  };
  console.log("chec", indexCell);
  // console.log("dd", dataExceeded.data[indexCell])
  /**
   * @summary This function take the data from chilren to parent
   * @param {*} e took from table layout left
   * @return void
   */
  const onChoosingCell = async (e) => {
    //The cellClicked will define which index the user clicked on the table to match with the header
    let cellClicked = e.target.cellIndex;

    //The data cell in the table
    let type_car = e.target.parentNode.childNodes[0].innerText;
    let notification = e.target.innerText;

    //The header in the table
    let city =
      e.target.offsetParent.childNodes[0].childNodes[0].cells[cellClicked]
        .innerText;
      const  rowTitle = async () =>
      {
     let rowTitleList = dataExceeded.data[indexCell]; 
     console.log("row",rowTitleList)

    }
        rowTitle()
    // set 2 state for compononent QuotaName
    setTypeCar(type_car);
    setCity(city);

    // set state for component Message
    setNotification(notification);

  };

  /**
   * @summary This function pass from children to parent
   * @param {*} e The param pass from Exceeded Left component to parent component
   * @return void
   */
  const handleClicked = (e) => {
    setClicked(!clicked);
    if (!clicked === true) {
      if (notification !== "" && notification !== undefined) {
        noMess(e);
      }
    }
  };

  /**
   * @summary This function will clear the notifcation of the cell is clicked when onClick noMessage
   * @return void
   */
  const noMess = () => {
    setNotification("");
  };

  /**
   //! need to consider
   * @summary This function will clear the data of the cell is clicked when onClick noMessage
   * @param {*} e
   * @return void
   */

  const deleteCell = () => {
    console.log("test", indexCell);
  };
  
  const onChangText = (text) => {
    setText(text);
  };
  return (
    <div className="exceeded">
      <div className="exceeded exceeded-bar">
        <h2 className="h2-exceeded">QUOTA SETTINGS</h2>
        <div className="up">
          <i>
            <IoIosSave className="up icon" />
          </i>
        </div>
        <div className="mode-exceeded">Mode:</div>
        <select
          className="select"
          onChange={onChangeNav}
          value={selectedExceeded} //Initialize state for the mode when user naivgate to this mode
        >
          <option value="">Expression</option>
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
            dataExceeded={dataExceeded}
            onChoosingCell={(e) => onChoosingCell(e)}
            setQuotaClickStatus={setQuotaClickStatus}
            onChoosingQuota={(e) => onChoosingQuota(e)}
            quotaClickStatus={quotaClickStatus}
            deleteCell={(e) => deleteCell(e)}
            value={text}
            sendIndex={(indexCell) => sendIndex(indexCell)}
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
            <Message
              mess={notification}
              handleClicked={(e) => handleClicked(e)}
              deleteCell={(e) => deleteCell(e)}
              onChangText={(e) => onChangText(e)}
              value={text}
              sendIndex={(indexCell) => sendIndex(indexCell)}
            />
            <button onClick={() => deleteCell(indexCell)}>asas</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotaExceeded;

/**
 * @summary The function save and push the data from client slide to server
 * @param
 * @return void
 */
// const onSave = () => {

// }
