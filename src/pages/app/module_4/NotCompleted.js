/*
* Contributor: 
    - Tiến 14/11/2020
*/

//Packages
import React from "react";
import HeaderRawData from "../../../components/app/HeaderRawData";
import { Link } from "react-router-dom";

//Styles
import  "./styles/NotCompleted.css";

const NotCompleted = (props) => {
  let bodyNotCompleted = JSON.parse(JSON.stringify(props.bodyNotCompleted));
  bodyNotCompleted = bodyNotCompleted.filter(row => row.complete === "Not Completed")
  const renderBody = () => {
    return (
      bodyNotCompleted &&
      bodyNotCompleted.map(
        (
          interviewInfo,
          index
        ) => {
          const { interviewid, complete,interviewStatus,status,step,type,curDate, Latitude,Longtitude, duration,projectid,RecordURL,...otherProps} =interviewInfo
          const restData = Object.entries(otherProps) 
          return (
            <tr key={index}>
              <td>{interviewid}</td> 
              <td>{complete}</td>
              
                <td className="module-4--table--status-td">
                  Not completed
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
export default NotCompleted;
