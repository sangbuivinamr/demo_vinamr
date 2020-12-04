/**
 * Contributor: Tiến 24/11/2020
 */

//Packages
import React,{useEffect,useState} from "react";
import { STATUS } from "../../data/Status";
//Styles
import "../../components/app/styles/HeaderRawData.css";

const HeaderRawData = (props) => {
  
  const [questionData,setQuestionData] = useState(props.questionData)
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
  //useEffect to re-render every time the props change
  useEffect(() =>{
    setQuestionData(props.questionData)
  },props.questionData)


  console.log("JSON data", questionData)

  //Filter the the question from the question data
  let filteredArray = []
  if(questionData !== undefined)
    questionData.map(page => {
      let tempArray =[] 
      if (page.elements !== undefined)
      page.elements.map(el =>  filteredArray.push(el.name))
  });
  filteredArray.splice(filteredArray.length -2,2)
  console.log("HeaderRawData.js _ filterHeader _ filteredArray ",filteredArray)
  for (const col of filteredArray)
    header.push(col)
  
  
  const isHeaderNeeded = ["InterviewID", "Completed", "EndTime", "Duration"];
  const isStatus = ["Status"];
  const renderHeader = () => {
    return header.map((key, index) => {
      return (
        <th className="element-header" KEY={index}>
          {key}
          {isStatus.includes(key) ? (
            <select className="select-option">
              {STATUS &&
                STATUS.map((key) => {
                  return <option>{key}</option>;
                })}
            </select>
          ) : isHeaderNeeded.includes(key) ? (
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
