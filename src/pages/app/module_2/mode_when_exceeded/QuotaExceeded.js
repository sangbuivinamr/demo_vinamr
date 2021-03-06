//Packages
import React, { useState, useEffect } from "react";
import { IoIosSave } from "react-icons/io";
import ExceededLeft from "./ExceededLeft";
import QuotaName from "./QuotaName";
import ActionExceeded from "./ActionExceeded";
import Message from "./Message";
import axios from "axios";

//Styles
import "./styles/QuotaExceeded.css";


//Default URL
const URL_DATA_EXCEEDED = "https://115.73.222.254:8000/quota/quotaExceeded";
const QuotaExceeded = (props) => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  //Initial States

  const [typeCar, setTypeCar] = useState("");
  const [city, setCity] = useState("");
  const [selectedExceeded, setSelectedExceeded] = useState("exceeded"); // Initialize the state, so when the user navigate to this mode, the mode will have the mode is interview in the option
  const [clicked, setClicked] = useState(false);
  const [dataExceeded, setDataExceeded] = useState([]);
  const [text, setText] = useState();
  const [indexCell, setIndexCell] = useState();
  const [placeHolder, setPlaceHolder] = useState();
  const [action, setAction] = useState();
  const [actionPlaceholder, setActionPlaceholder] = useState();
  const [actionExceeded, setActionExceeded] = useState();

  /**
   * @summary The function naviagte to another page
   * @param {*} e
   * @return void
   */
  const onChangeNav = (e) => {
    props.history.push(`/${e.target.value}`);
  };

  /*******************************GET DATA***********************************/
  /**
   * @summary Function useEffect
   * @return void
   */
  useEffect(() => {
    getDataExceeded(localStorage.getItem('currentprojectid'));
  }, []);

  const getDataExceeded = async (projectId) => {
    const response = await axios.get(
      URL_DATA_EXCEEDED + `?projectId=${projectId}`
    );
    let dataTable = response.data;
    if(dataTable.message === 'no projectID matching') return;
    setDataExceeded(dataTable);
  };

 
  /*************************************************************************/

  const sendIndex = (indexCell) => {
    setIndexCell(indexCell);
  };

  /**
   * @summary This function take the data from chilren to parent
   * @param {*} e took from table layout left
   * @return void
   */
  const onChoosingCell = (e, indexCell) => {
    //The cellClicked will define which index the user clicked on the table to match with the header
    let cellClicked = e.target.cellIndex;

    //The data cell in the table
    let type_car = e.target.parentNode.childNodes[0].innerText;
    let notification = e.target.innerText;
    //The header in the table
    let city =
      e.target.offsetParent.childNodes[0].childNodes[0].cells[cellClicked]
        .innerText;
    // set 2 state for compononent QuotaName
    setTypeCar(type_car);
    setCity(city);
    let dataAction = dataExceeded.data[indexCell].action;
    setActionPlaceholder(dataAction);
    // set state for component Message
    setPlaceHolder(notification);
    let mode =dataExceeded.data[indexCell].selected
    setActionExceeded(mode)
    console.log("mode",mode)
  };
  /**
   * @summary This function pass from children to parent
   * @param {*} e The param pass from Exceeded Left component to parent component
   * @return void
   */
  const handleClicked = () => {
    setClicked(!clicked);
    setPlaceHolder("");
  };

  /**
   * @summary the function handle input of the textarea
   * @param text
   * @return void
   */
  const onChangeText = (text) => {
    setText(text);
  };
  /**
   * @summary the function handle input of action
   * @param action
   * @return void
   */
  const onChangeAction = (action) => {
    setAction(action);
  };
  /**
   *@summary The function onClick Apply button
   *@return void
   */
  const onApply = () => {
    let i;
    let dataLength = dataExceeded.length;
    let arrayLength = dataExceeded.data.length;

    //Clear the data cell when user click on checkbox
    if (dataLength !== 0) {
      if (indexCell !== undefined && clicked === true) {
        for (i = 0; i < arrayLength; i++) {
          if (indexCell === i) {
            let temp = dataExceeded;
            temp.data[i].maxQuota = "";
            setDataExceeded(temp);
          }
        }
      }

      //Update the cell in the table when user input
      if (indexCell !== undefined && clicked === false) {
        for (let i = 0; i < arrayLength; i++) {
          if (indexCell === i) {
            let newData = dataExceeded;
            newData.data[i].maxQuota = text;
            setDataExceeded(newData);
          }
        }
      }

      //The alert will be shown when user neither choosing a cell on table nor clicked check box
      if (indexCell === undefined && clicked !== true) {
        alert("CHOOSE THE CELL YOU WANT TO CHANGE!");
      }
      forceUpdate();
    }
  };

  const onApplyAll = () => {
    let arrayLength = dataExceeded.data.length;

    // User can input and apply All to change the cell in the table without clicking check box
    if (clicked === true) {
      for (let i = 0; i < arrayLength; i++) {
        let newData = dataExceeded;
        newData.data[i].maxQuota = "";
        setDataExceeded(newData);
      }
    } else {
      for (let i = 0; i < arrayLength; i++) {
        let newData = dataExceeded;
        newData.data[i].maxQuota = text;
        setDataExceeded(newData);
      }
    }
    forceUpdate();
  };

  /**
   *@summary The function onClick Apply button
   *@return void
   */
  const onApplyAction = () => {
    let dataLength = dataExceeded.length;
    let arrayLength = dataExceeded.data.length;

    //Clear the data cell when user click on checkbox
    if (dataLength !== 0) {
      //Update the cell in the table when user input
      if (indexCell !== undefined) {
        for (let i = 0; i < arrayLength; i++) {
          if (indexCell === i) {
            let temp = dataExceeded;
            temp.data[i].action = action;
            let selected = dataExceeded;
            selected.data[i].selected = actionExceeded
            setDataExceeded(temp,selected);
            console.log("check",dataExceeded)
          }
        }
      }

      //The alert will be shown when user neither choosing a cell on table nor clicked check box
      if (indexCell === undefined) {
        alert("CHOOSE THE CELL YOU WANT TO CHANGE!");
      }
      forceUpdate();
    }
  };

  const onApplyAllAction = () => {
    let arrayLength = dataExceeded.data.length;

    // User can input and apply All to change the cell in the table without clicking check box
    for (let i = 0; i < arrayLength; i++) {
      let temp = dataExceeded;
      temp.data[i].action = action;
      let selected =dataExceeded;
      selected.data[i].selected = actionExceeded
      setDataExceeded(temp,selected);
      console.log("nwe",temp)
    }

    forceUpdate();
  };
  const selectAction = (actionExceeded) => {

    setActionExceeded(actionExceeded);
  };

   /**
   * @summary The function save and push the data from client slide to server
   * @param
   * @return void
   */
  const onSave = (projectId) => {
    axios.post(URL_DATA_EXCEEDED + `?projectId=${projectId}`, dataExceeded);
  };
  return (
    <div className="exceeded">
      <div className="exceeded exceeded-bar">
        <h2 className="h2-exceeded">QUOTA SETTINGS</h2>
        <div className="up">
          <i>
            <IoIosSave className="up icon" onClick={() => onSave("1")} />
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
      <div className="when-exceed--layouts">
        <div className="when-exceed--layout-left">
          <ExceededLeft
            dataExceeded={dataExceeded}
            onChoosingCell={(e, indexCell) => onChoosingCell(e, indexCell)}
            value={text}
            sendIndex={(indexCell) => sendIndex(indexCell)}
          />
        </div>
        <div className="when-exceed--layout-right">
          <div>
            <QuotaName dataCityTable={city} dataCarTable={typeCar} />
          </div>
          <div>
            <ActionExceeded
              onApply={() => onApplyAction(action,actionExceeded)}
              placeHolder={actionPlaceholder}
              onApplyAll={() => onApplyAllAction(action)}
              value={action}
              selectedMode = {actionExceeded}
              actionPlaceholder={actionPlaceholder}
              onChangeAction={(action) => onChangeAction(action.target.value)}
              selectAction={selectAction}
            />
          </div>
          <div>
            <Message
              mess={placeHolder}
              onApply={() => onApply(text)}
              onApplyAll={() => onApplyAll(text)}
              handleClicked={(e) => handleClicked(e)}
              value={text}
              onChangeText={(text) => onChangeText(text.target.value)}
              sendIndex={(indexCell) => sendIndex(indexCell)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotaExceeded;
