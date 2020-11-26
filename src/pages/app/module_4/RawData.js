/*
* Contributor: 
    - Tiến 13/11/2020
*Main Function: render module_4
*/

//Packages
import React, { useState, useEffect } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import CancelledInterview from "./CancelledInterview";
import CountedInterview from "./CountedInterview";
import NotCompleted from "./NotCompleted";
import axios from "axios";
import SelectionExportModal from "../../../components/app/SelectionExportModal.js"
//Styles
import "./styles/RawData.css";

//Default URL
const URL_MODULE_4 = "https://115.73.222.254:8000/rawDataCheck/getRawData";

const RawData = (props) => {
  const [dataRawCheck, getDataRawCheck] = useState([]);
  const [selectedCounted, setSelectedCounted] = useState();
  const [selectedCancel, setSelectedCancel] = useState();
  const [isOpenExpModal,setIsOpenExpModal] = useState(false);
  /**
   *@summary Function useEffect
   *@return void
   */
  useEffect(() => {
    getRawData("0558");
  }, []);
  /**
   * 
   * @summary Handle open and close modal 
   */
  const closeExpModal =() =>{
    setIsOpenExpModal(false);
  }
  const openExpModal =() =>{
    setIsOpenExpModal(true);
  }
  /**
   *@summary The function getData for module_4
   *@param projectId
   *@return data from dataBase
   */
  const getRawData = async (projectId) => {
    const response = await axios.get(URL_MODULE_4 + `?projectId=${projectId}`);
    let dataRawCheck = response.data;
    console.log("GET", dataRawCheck)
    getDataRawCheck(dataRawCheck);
  };

  /**
   * @summary The function handle data is cancelled
   * @param selectedCounted
   * @return void
   */
  const onChangeOptionCounted = (selectedCounted) => {
    setSelectedCounted(selectedCounted);
  };
  /**
   * @summary The function handle data is cancelled
   * @param selectedOptionCancel
   * @return void
   */
  const onChangeOptionCancel = (selectedCancel) => {
    setSelectedCancel(selectedCancel);
  };
  return (
    <div className="raw-data">
      <div className="content-raw-data">
        <h1 className="header">{"[Project Name 2]"}</h1>
        <div className="text-list">
          <p className="total">Total: {"905"} | </p>
          <p className="total">Quota Counted Interviews: {"701"} | </p>
          <p className="cancel">
            Cancelled Interview: <strong>{"132"}</strong> |{" "}
          </p>
          <p className="total">Not Completed Interviews: {"72"} | </p>
          <p className="approved">
            Approved: <strong>{627 + 10}</strong> |{" "}
          </p>
          <p className="p-w">
            Pending FW: <strong>{"60"}</strong> |{" "}
          </p>
          <p className="pending-qc-1">
            Pending QC {"(1)"}: <strong>{"4"}</strong> |{" "}
          </p>
          <p className="pending-qc-2">
            Pending QC {"(2)"}: <strong>{"10"}</strong>{" "}
          </p>
        </div>
        <div className="buttons-4">
          <div className="button-1" onClick={openExpModal}>Export Data</div>
        </div>
        <div className="content-area">
          <div className="item-1">
            <label for="first" className="first-label">
              Quota Counted Interviews
            </label>
            <input type="checkbox" id="first" />
            <AiFillCaretRight className="arrow" />
            <CountedInterview
              bodyCounted={dataRawCheck}
              selectedCounted={selectedCounted}
              value={selectedCounted}
              onChangeOptionCounted={(selectedCounted) =>
                onChangeOptionCounted(selectedCounted.target.value)
              }
            />
          </div>
          <div className="item-2">
            <label for="second">Cancelled Interviews</label>
            <input type="checkbox" id="second" />
            <AiFillCaretRight className="arrow" />
            <CancelledInterview
              selectedCancel={selectedCancel}
              value={selectedCancel}
              bodyCancelled={dataRawCheck}
              onChangeOptionCancel={(selectedCancel) =>
                onChangeOptionCancel(selectedCancel.target.value)
              }
            />
          </div>
          <div className="item-3">
            <label for="third">Not Completed Interviews</label>
            <input type="checkbox" id="third" />
            <AiFillCaretRight className="arrow" />
            <NotCompleted bodyNotCompleted={dataRawCheck} />
          </div>
        </div>
      </div>
      <SelectionExportModal isOpen={isOpenExpModal} 
      closeExpModal={closeExpModal}
      >

      </SelectionExportModal>

    </div>
  );
};
export default RawData;
