/*
* Contributor: 
    - Tiến 13/11/2020
*Main Function: render module_4
*/

//React API
import React, { useState, useEffect } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import axios from "axios";

//Components
import CancelledInterview from "./CancelledInterview";
import CountedInterview from "./CountedInterview";
import NotCompleted from "./NotCompleted";
import SelectionExportModal from "../../../components/app/SelectionExportModal.js"
import ChangeInterviewStatus from "../../../components/app/ChangeInterviewStatus.js"
import ExportToCSV from "../../../components/app/ExportToCSV.js"
//Styles
import "./styles/RawData.css";
import { STATUS } from "../../../data/Status";

//Default URL`
import URL_MODULE_4 from "./config.js"
const RawData = (props) => {
  const [dataRawCheck, setDataRawCheck] = useState([]);

  const [selectedCounted, setSelectedCounted] = useState();

  const [selectedCancel, setSelectedCancel] = useState();

  const [isOpenExpModal,setIsOpenExpModal] = useState(false);

  const [isOpenCIStatModal, setIsOpenCIStatModal] = useState(false); // CIStat abbreviates for "Change Interview Status". 
  
  const [dataMedia, setDataMedia] = useState();
  const [questionData, setQuestionData] = useState();
  const [questionName, setQuestionName] = useState();
  console.log("----------------------------------------------------------------BEGINNING OF RENDERING----------------------------------------------------------------------------------------------")
  
  /**
   *@summary Function useEffect
   *@return void
   */
  useEffect(() => {
    console.log("First useEffect")
    getRawData("0558");
    console.log(" RawData.js - useEffect - rawDataCheck",dataRawCheck)
    getMedia("0558");
    console.log("Done GET")
    getQuestionData("0558");
    console.log("RawData.js _ getQuestionData_ questionData",questionData)
    // let tempRawData = JSON.parse(JSON.stringify(URL_MODULE_4.TEMP_RAW_DATA));
    
    // for(const rawData of tempRawData)
    // {
    //   //Parse {String} kq into JSON
    //   rawData.kq = JSON.parse(rawData.kq);
    //   //Delete unnecessary attribute
    //   delete rawData.tempcol;


    // }
    // console.log("useEffect tempRawData",tempRawData)
    // setDataRawCheck(tempRawData)
    // const response = URL_MODULE_4.TEMP_INTERVIEW;
    // getQuestionName(response)
    // setQuestionData(response)
   
  }, []);

  /**
   * @summary This second useEffect is to filter neccesary data from 3 different JSONs
   * @step First, add more questionName.name as properties to each element of rawDataCheck
   * Second, set value of all the new properties due to attribute {kq} of each element of dataRawCheck
   * NOTE: each questionName.name has different type => Need to handle different cases
   */
 useEffect(() => {
   console.log("Second useEffect", questionData,questionName,dataRawCheck);
    if(questionName !== undefined && questionData !== undefined && dataRawCheck !== undefined){
      let tempName = JSON.parse(JSON.stringify(questionName)); //stringify and parse to deep copy JSON, avoid unattended change to state
      let tempData  = JSON.parse(JSON.stringify(questionData));
      let tempRaw  = JSON.parse(JSON.stringify(dataRawCheck));
      //Add question Data properties
      
          const attrOfTempRaw  = Object.keys(tempRaw[0]) // The properties of all elements in tempRaw are the same  => just need to get the first properties
          console.log("Listed properties", attrOfTempRaw)

          //Check if there are duplicate names between question
          for (const quesName of tempName){
            if (!attrOfTempRaw.includes(quesName.name))
            {
              tempRaw.map(el =>{
                el[quesName.name] = null
              })
            }
          }
          
          console.log("Temp data",tempRaw)

    }

 },[questionName]) //Only need to check questionName it is the last one to successfully change the state 
  /**
   * @summary Handle open and close Export Selection modal 
   */
  const closeExpModal = () => {
    setIsOpenExpModal(false);
  };
  const openExpModal = () => {
    setIsOpenExpModal(true);
  }

console.log("Get raw Data",dataRawCheck)
  /**
   * @summary Handle open and close Change Interview Status modal 
   */
  const closeCIStatModal =() =>{
    setIsOpenCIStatModal(false);
  }
  const  openCIStatModal = () =>{
    setIsOpenCIStatModal(true);
  }


  /**
   *@summary The function getData for module_4
   *@param projectId
   *@return data from dataBase
   */
  const getRawData = async (projectId,interviewId) => {
    const response = await axios.get(URL_MODULE_4.URL_DATA_MODULE_4 + `?projectId=${projectId}&interviewId=${interviewId}`);
    console.log("GetRawData",response)
    let dataRawCheck = response.data;
    
    for(const rawData of dataRawCheck)
    {
      //Parse {String} kq into JSON
      rawData.kq = JSON.parse(rawData.kq);
      //Delete unnecessary attribute
      delete rawData.tempcol;
  }
    setDataRawCheck(dataRawCheck);
  };
  /**
   * 
   * @summary 
   */
  /**
   * 
   * @summary This function is to get anwser data from database 
   */
  const getQuestionData = async (projectId) => {
    console.log('asfsfslfkjsahfkj')
    const response = await axios.post(URL_MODULE_4.MODULE_4_QUESTION_DATA , {
      id: projectId
    })
    console.log(response.data)
    let data = response.data.json.surveyjson;
    let json = JSON.parse(data.slice(1 , data.length - 1))
    console.log("RawData.js - getAnswerData", json)
    setQuestionData(json.pages)
    getQuestionName(json.pages)
  }
   
  /**
   *@summary The function getData for module_4
   *@param projectId
   *@return data from dataBase
   */
  const getMedia = async (projectId) => {
    const response = await axios.get(URL_MODULE_4.URL_MEDIA + `?projectId=${projectId}`);
    console.log("GetMedia",response)
    let dataMedia = response.data;
    setDataMedia(dataMedia);
  };
/**
 * @summary This function is to get filtered array of question column
 * @param {JSON} questionData The question data get from server 
 */

  const getQuestionName = (questionData) =>{
    let filteredArray = []
    if(questionData !== undefined)
      questionData.map(page => { 
        if (page.elements !== undefined)
        page.elements.map(el =>  filteredArray.push({name: el.name,type: el.type}))
    });
    filteredArray.splice(filteredArray.length -2,2)
    console.log("Filtered array AFTER",filteredArray)
    setQuestionName(filteredArray)
  }

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

  /**
   * @summary This fuction is to post to database
   */
  const postToDataBase = () =>{
    const tempData = 
      {
        interviewid: dataRawCheck[0].projectId,
        interviewStatus: "????",
        status: "Cancel",
        step: "Pending",
        type: " Fulltime"
        
        }
    
  }
  /**
   * @summary This function is to get the answers of all interviewers' data to fill into RaWDataCheck 
   * 
   */
  const handleAnswerData = () => {
  
  } 
  return (
    <div className="raw-data">
      <div className="content-raw-data">
        <h1 className="header">{ dataRawCheck.length !==0 ? dataRawCheck[0].projectid :null}</h1>
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
          <div className="button-1" onClick={openExpModal}>
            Export Data
          </div>
        </div>
        <div className="content-area">

          <div className="item-1">
            <label for="first" className="first-label">
              Quota Counted Interviews
            </label>
            <input type="checkbox" id="first" />
            <AiFillCaretRight className="arrow" />
            <CountedInterview
              status={STATUS}
              bodyCounted={dataRawCheck}
              selectedCounted={selectedCounted}
              value={selectedCounted}
              onChangeOptionCounted={(selectedCounted) =>
                onChangeOptionCounted(selectedCounted.target.value)
              }
              questionData={questionData}
              questionName={questionName}
            />
          </div>
          <div className="item-2">
            <label for="second">Cancelled Interviews</label>
            <input type="checkbox" id="second" />
            <AiFillCaretRight className="arrow" />
            <CancelledInterview
              status={STATUS}
              selectedCancel={selectedCancel}
              value={selectedCancel}
              bodyCancelled={dataRawCheck}
              onChangeOptionCancel={(selectedCancel) =>
                onChangeOptionCancel(selectedCancel.target.value)
              }
              onOpenCIStatModal={openCIStatModal}
              questionData={questionData}
              questionName={questionName}
            />
          </div>
          <div className="item-3">
            <label for="third">Not Completed Interviews</label>
            <input type="checkbox" id="third" />
            <AiFillCaretRight className="arrow" />
            <NotCompleted bodyNotCompleted={dataRawCheck} questionName={questionName} questionData={questionData} />
          </div>
        </div>
      </div>
      <SelectionExportModal isOpen={isOpenExpModal} 
      closeExpModal={closeExpModal}
      ExportToCSV={() => ExportToCSV(dataRawCheck)}
      />
      <ChangeInterviewStatus isOpen={isOpenCIStatModal} closeCIStatModal={closeCIStatModal}/>
      
    </div>
  );
};
export default RawData;
