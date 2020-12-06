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
  ];
  //useEffect to re-render every time the props change
  useEffect(() =>{
    setQuestionName(props.questionName)
  },[props.questionName])


  //Filter the the question from the question data

  // if(questionData !== undefined)
  //   questionData.map(page => {
  //     let tempArray =[] 
  //     if (page.elements !== undefined)
  //     page.elements.map(el =>  filteredArray.push(el.name))
  // });
  // filteredArray.splice(filteredArray.length -2,2)
  // console.log("HeaderRawData.js _ filterHeader _ filteredArray ",filteredArray)

  if (questionName !== undefined){
    for (const col of questionName)
    header.push(col.name)
  }
  

  const isHeaderNeeded = ["InterviewID", "Completed", "EndTime", "Duration"];
  const isStatus = ["Status"];
  const renderHeader = () => {
    return header.map((key, index) => {
      return (
        <th className="element-header" key={index}>
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
