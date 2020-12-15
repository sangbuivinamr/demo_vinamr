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
import Module4Export from "../../../components/app/Module4Export.js"
//Styles
import "./styles/RawData.css";
import { STATUS } from "../../../data/Status";

//Default URL`
import URL_MODULE_4 from "./config.js"
const RawData = (props) => {
  const [dataRawCheck, setDataRawCheck] = useState([]);
  const [isOpenCIStatModal, setIsOpenCIStatModal] = useState(false); // CIStat abbreviates for "Change Interview Status". 
  const [selectedCounted, setSelectedCounted] = useState();
  const [selectedCancel, setSelectedCancel] = useState();

  const [isOpenExpModal,setIsOpenExpModal] = useState(false);
  
  
  const [dataMedia, setDataMedia] = useState();
  const [questionData, setQuestionData] = useState();
  const [questionName, setQuestionName] = useState();
  const [confirmChangeSatus, setConfirmChangeStatus] = useState(false);
  console.log("----------------------------------------------------------------BEGINNING OF RENDERING----------------------------------------------------------------------------------------------")
  
  /**
   *@summary Function useEffect
   *@return void
   */
  useEffect(() => {
    // console.log("First useEffect")
    getRawData("0558");
    // console.log(" RawData.js - useEffect - rawDataCheck",dataRawCheck)
    // getMedia("0558");
    // console.log("Done GET")
    // getQuestionData("0558");
    // console.log("RawData.js _ getQuestionData_ questionData",questionData)
    let tempRawData = JSON.parse(JSON.stringify(URL_MODULE_4.TEMP_RAW_DATA));
    
    for(const rawData of tempRawData)
    {
      //Parse {String} kq into JSON
      rawData.kq = JSON.parse(rawData.kq);
      //Delete unnecessary properties
      delete rawData.tempcol;
      //Temporary create data to handle (As there is no {interviewStatus,status,step,type} data fetched from database )
      rawData.interviewStatus = Math.random() < 0.5 ? "Cancel" : "OK"
      rawData.status = Math.random() < 0.5 ? "Phone" : "Face"
      rawData.step = Math.random() < 0.5 ? "PendQC(1)" : "PendQC(2)"
      rawData.type = Math.random() < 0.5 ? "Part-time" : "Full-time"
    }
   setDataRawCheck(tempRawData)
    const response = URL_MODULE_4.TEMP_INTERVIEW;
    getQuestionName(response)
    setQuestionData(response)
   
  }, []);

  /**
   * @summary This second useEffect is to filter neccesary data from 3 different JSONs when all of them are successfully set
  
   */
 useEffect(() => {
    if(questionName !== undefined && questionData !== undefined && dataRawCheck !== undefined){
      handleAnswerData();
    }

 },[questionName]) //Only need to check questionName it is the last one to successfully change the state 

/**
 * @summary This function is to fill of the answers from interviewers to the rawDataCheck
 * First, add more questionName.name as properties to each element of rawDataCheck
 * Second, set value of all the new properties due to attribute {kq} of each element of dataRawCheck
 * NOTE: each questionName.name has different type => Need to handle different cases
 */
const handleAnswerData =() => {
  let tempName = JSON.parse(JSON.stringify(questionName)); //stringify and parse to deep copy JSON, avoid unattended change to state
      let tempRaw  = JSON.parse(JSON.stringify(dataRawCheck));
      //Add question Data properties
      
          const attrOfTempRaw  = Object.keys(tempRaw[0]) // The properties of all elements in tempRaw are the same  => just need to get the first properties
          for (const quesName of tempName){
          //Check if there are duplicate names between questions
            if (!attrOfTempRaw.includes(quesName.name)) 
            {
              tempRaw.map(row =>{
                row[quesName.name] = null //add props and values to tempRaw 
              })
              delete quesName.name; //For later comparision: make sure tempName does not have any props the same as tempRaw 
            }   
          }
          for (const rawData of tempRaw){

            const propsOfRawData  = Object.keys(rawData.kq)
            for (const prop of propsOfRawData)
            {   
                rawData[prop] = getValueFromQuestionData( prop,typeOfQuestionName(prop),rawData.kq[prop]);
                if(rawData[prop] === undefined) //handle undefined case 
                rawData[prop] = null 
            }
          }

          for (let rawData of tempRaw)
          {
            delete rawData.kq;
          }
          setDataRawCheck(tempRaw)
}
/**
 * @summary This function is to get the type of questionName 
 */
const typeOfQuestionName = (name) =>{
  for (const question of questionName)
{   
   if (name === question.name)
    return question.type;
  }
}
/**
 * @summary This function is to set values of all the quesitions into the properties of question Data
 */
const getValueFromQuestionData = (quesName,type,curData) =>{
  //Each type of data will have different way to display
  switch(type){
    case "text":
      {
        return curData;
      }
    
    case "radiogroup": case "rating":
      {
        for( const page of questionData) // each element of questionData array is a page, which contains questions
        { if(page.elements !== undefined)  // Check whether page has "elements" props
          for( const el of page.elements)
          {
            if( el.name === quesName)   //get to the right element that its value of "name" property is the same as quesName
            {
                for(const choice of el.choices) //Find the right choice to return the value
                {
                  if(choice.value === curData)    
                  return choice.text; 
                }
            }
          }
        }
        break;
      }
      case "multipletext":
        {
          const propsOfCurData = Object.keys(curData) //Get all the props of curData
          // We need to change "multipletext" to String
          let tempString=""; 
        
         for( const prop of propsOfCurData)
         {
           tempString  += prop +" "+curData[prop]+" ";
         }
         return tempString  
        }
        case "matrix":
          {
            for( const page of questionData) // each element of questionData array is a page, which contains questions
            { if(page.elements !== undefined)  // Check whether each page has "elements" props
              for( const el of page.elements)
              { if(el.hasOwnProperty("columns"))
                for (const col of el.columns)
                if( col.value === curData)   //get to the right element that its value of "name" property is the same as quesName
                {
                   return col.text
                }
              }
            }
            break;
          }
        default:
          {
            return curData;
          }
         
  }
}

  /**
   * @summary Handle open and close Export Selection modal 
   */
  const closeExpModal = () => {
    setIsOpenExpModal(false);
  };
  const openExpModal = () => {
    setIsOpenExpModal(true);
  }

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
    let dataRawCheck = response.data;
    
    for(const rawData of dataRawCheck)
    {
      //Parse {String} kq into JSON
      rawData.kq = JSON.parse(rawData.kq);
      //Delete unnecessary properties
      delete rawData.tempcol;
     
      
  }
    setDataRawCheck(dataRawCheck);
  };
  
  /**
   * 
   * @summary This function is to get anwser data from database 
   */
  const getQuestionData = async (projectId) => {
    const response = await axios.post(URL_MODULE_4.MODULE_4_QUESTION_DATA , {
      id: projectId
    })
    console.log(response.data)
    let data = response.data.json.surveyjson;
    let json = JSON.parse(data.slice(1 , data.length - 1))
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
    setQuestionName(filteredArray)
  }

  /**
   * @summary The function handle data is cancelled
   * @param selectedCounted
   * @return void
   */
  const onChangeOptionCounted = (selectedCounted) => {
    if(confirmChangeSatus === true)
    {
      setSelectedCounted(selectedCounted);
      setConfirmChangeStatus(false);
      setIsOpenCIStatModal(false)
    }
   
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
  const handleMoDule4Export = (type) =>{
    Module4Export(dataRawCheck,type)
  }
  const handleStatusConfirmChange =() =>{
    setIsOpenCIStatModal(false)
    setConfirmChangeStatus(true)
  }
  return (
    <div className="raw-data">
      <div className="content-raw-data">
        <h1 className="raw-data--header">{ dataRawCheck.length !==0 ? dataRawCheck[0].projectid :null}</h1>
        <div className="raw-data--text-list">
          <p className="raw-data--total">Total: {"905"} | </p>
          <p className="raw-data--total">Quota Counted Interviews: {"701"} | </p>
          <p className="raw-data--cancel">
            Cancelled Interview: <strong>{"132"}</strong> |{" "}
          </p>
          <p className="raw-data--total">Not Completed Interviews: {"72"} | </p>
          <p className="raw-data--approved">
            Approved: <strong>{627 + 10}</strong> |{" "}
          </p>
          <p className="raw-data--p-w">
            Pending FW: <strong>{"60"}</strong> |{" "}
          </p>
          <p className="raw-data--pending-qc-1">
            Pending QC {"(1)"}: <strong>{"4"}</strong> |{" "}
          </p>
          <p className="raw-data--pending-qc-2">
            Pending QC {"(2)"}: <strong>{"10"}</strong>{" "}
          </p>
        </div>
        <div className="raw-data--buttons-4">
          <div className="raw-data--button-1" onClick={openExpModal}>
            Export Data
          </div>
        </div>
        <div className="raw-data--content-area">

          <div className="raw-data--item-1">
            <label for="raw-data--first" className="raw-data--first-label">
              Quota Counted Interviews
            </label>
            <input type="checkbox" id="raw-data--first" />
            <AiFillCaretRight className="raw-data--arrow" />
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
              openCIStatModal={openCIStatModal}
            />
          </div>
          <div className="raw-data--item-2">
            <label className = '' for="raw-data--second">Cancelled Interviews</label>
            <input type="checkbox" id="raw-data--second" />
            <AiFillCaretRight className="raw-data--arrow" />
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
          <div className="raw-data--item-3">
            <label for="raw-data--third">Not Completed Interviews</label>
            <input type="checkbox" id="raw-data--third" />
            <AiFillCaretRight className="raw-data--arrow" />
            <NotCompleted bodyNotCompleted={dataRawCheck} questionName={questionName} questionData={questionData} />
          </div>
        </div>
      </div>
      <SelectionExportModal isOpen={isOpenExpModal} 
      closeExpModal={closeExpModal}
      Module4Export={handleMoDule4Export}
      />
     
    </div>
  );
};
export default RawData;
