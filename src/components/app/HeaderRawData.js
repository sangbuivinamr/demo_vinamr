/**
 * Contributor: Tiến 24/11/2020
 */

//Packages
import React,{useEffect,useState} from "react";
import { STATUS } from "../../data/Status";
//Styles
import "../../components/app/styles/HeaderRawData.css";

const HeaderRawData = (props) => {
 
  const [questionName,setQuestionName] = useState(props.questionName)
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
    "SrvyID","SrvyName","FOID","FOName","Area","RespName","RespAddress",	"RespPhone"	,"RespGender","RespBirth","stt"
  ];
  //useEffect to re-render every time the props change
  useEffect(() =>{
    setQuestionName(props.questionName)
  },[props.questionName])
  if (questionName !== undefined){
    for (const col of questionName)
    if(!header.includes(col.name))
    header.push(col.name)
  }

  const isNeededSelection = ["InterviewID", "Completed", "EndTime", "Duration"];
  const isStatus = ["Status"];
  const renderHeader = () => {
    return header.map((key, index) => {
      return (
        <th className={isStatus.includes(key) ? "sticky-element-header" : "element-header"} key={index}>
          {key}
          {isStatus.includes(key) ? (
            <select className="select-option">
              {STATUS &&
                STATUS.map((key) => {
                  return <option>{key}</option>;
                })}
            </select>
          ) : isNeededSelection.includes(key) ? (
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
