//Pakages
import React from "react";
import HeaderRawData from "../../../components/app/HeaderRawData";
import { Link } from "react-router-dom";

//Styles
import "./styles/CancelledInterview.css";

const CancelledInterview = (props) => {
  let optionCancel = props.selectedCancel;
  const statusChoices = props.status;
  const onChangeOptionCancel = (optionCancel) => {
    props.onChangeOptionCancel(optionCancel);
  };
  let bodyCancelled = JSON.parse(JSON.stringify(props.bodyCancelled));
  bodyCancelled = bodyCancelled.filter(row => row.complete === "Not Completed")
  console.log("CancelledInterview.js - bodyCancelled",bodyCancelled)
  const renderBody = () => {
    return (
      bodyCancelled &&
      bodyCancelled.map(
        (
          interviewInfo,
          index
        ) => {
          const { interviewid, complete,status, curDate, Latitude,Longtitude, duration,projectid,RecordURL,...otherProps} =interviewInfo
          const propsOfRest = Object.keys(otherProps) //The rest is the answer data needed to render
          const restData = Object.entries(otherProps) 
          console.log("Props of Rest",restData,propsOfRest)
          return (
            <tr key={index}>
              <td>{interviewid}</td> 
              <td>{complete}</td>
              
                <td className="module-4--table--status-td">
                  {optionCancel}
                  <select
                    className="module-4--cancelled-interview--select-option-body"
                    value={optionCancel}
                    onChange={(optionCounted) =>
                      onChangeOptionCancel(optionCounted)
                    }
                  >
                    {statusChoices &&
                      statusChoices.map((key) => {
                        return <option>{key}</option>;
                      })}                                                         
                  </select>
                </td>
              
              <td>{curDate}</td> 
              
                <td>
                  <Link
                    to={{
                      pathname: "/preview",
                      state: { interviewid, complete },
                    }}
                  >
                    Link
                  </Link>
                </td>
              
              
                <td>
                  {/* This link for photos */}
                  <Link
                    to={{
                      pathname: "/preview",
                      state: { interviewid, complete },
                    }}
                  >
                    Link
                  </Link>
                </td>
               
              <td>{Latitude}</td> 
              <td>{Longtitude}</td> 
              <td>{duration}</td> 
              {(restData!== undefined) ? restData.map((cell,index) =>
              { 
                return( 
                  <td>{
                    (cell[1] !== null) ?
                    String(cell[1]): null
                    }</td>
                )
              }) : null}
            </tr>
          );
        }
      )
    );
  };
  return (
    <div className="module-4--cancelled-interview--tab-2">
      <table className="module-4--cancelled-interview--table-2">
        <HeaderRawData questionName={props.questionName} />
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};
export default CancelledInterview;
