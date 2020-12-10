//Packages
import React from "react";
import HeaderRawData from "../../../components/app/HeaderRawData";
import { Link } from "react-router-dom";

//Styles
import "./styles/CountedInterview.css";

const CountedInterview = (props) => {
 
  const optionCounted = props.selectedCounted;
  const statusChoices = props.status;
  const onChangeOptionCounted = (optionCounted) => {
    props.onChangeOptionCounted(optionCounted);
  };
  let bodyCounted = JSON.parse(JSON.stringify( props.bodyCounted))
  bodyCounted = bodyCounted.filter(row => row.complete === "Completed")
  const renderBody = () => {
    return (
      bodyCounted &&
      bodyCounted.map(
        (
          interviewInfo,
          index
        ) => {
          const { interviewid, complete,status, curDate, Latitude,Longtitude, duration,projectid,RecordURL,...otherProps} =interviewInfo
          const propsOfRest = Object.keys(otherProps) //The rest is the answer data needed to render
          const restData = Object.entries(otherProps) 
          console.log("Props of Rest",restData,propsOfRest)
          return (
            <tr key={index} className="module-4--counted-interview--table--tr">
              <td>{interviewid}</td> 
              <td>{complete}</td>
               
                <td className="module-4--sticky-status-td">
                  {optionCounted}
                  <select
                    className="module-4--counted-interview--select-option-body"
                    value={optionCounted}
                    onChange={(optionCounted) =>
                      onChangeOptionCounted(optionCounted)
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
                  <td key={index}>{
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
    <div className="module-4--counted-interview--tab-1">
      <table className="module-4--counted-interview--table-1">
        <HeaderRawData questionName = {props.questionName} />
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};
export default CountedInterview;
