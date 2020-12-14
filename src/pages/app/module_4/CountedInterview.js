//Packages
import React, {useEffect,useState} from "react";
import HeaderRawData from "../../../components/app/HeaderRawData";
import ChangeInterviewStatus from "../../../components/app/ChangeInterviewStatus"
import { Link } from "react-router-dom";

//Styles
import "./styles/CountedInterview.css";

const CountedInterview = (props) => {
  const [isOpenCIStatModal, setIsOpenCIStatModal] = useState(false); // CIStat abbreviates for "Change Interview Status". 
  
  const [optionCounted,setOptionCounted] = useState(props.selectedCounted);
  const statusChoices = props.status;
  useEffect(() => {
    
  console.log("CountedInterview - props changes",props.selectedCounted)
    setOptionCounted(props.selectedCounted)
  }, [props.selectedCounted])

/**
   * @summary Handle open and close Change Interview Status modal 
   */
  const closeCIStatModal =() =>{
    setIsOpenCIStatModal(false);
  }
  const  openCIStatModal = () =>{
    setIsOpenCIStatModal(true);
  }
  const handleStatusConfirmChange =() =>{
    setIsOpenCIStatModal(false)
  }
  const onChangeOptionCounted = (optionCounted) => {
    openCIStatModal();
    props.onChangeOptionCounted(optionCounted);
  };
  let bodyCounted = JSON.parse(JSON.stringify( props.bodyCounted))
  // bodyCounted = bodyCounted.filter(row => row.complete === "Completed" && row.interviewStatus !=="Cancel")
  bodyCounted = bodyCounted.filter(row => row.complete === "Completed")
  const renderBody = () => {
    return (
      bodyCounted &&
      bodyCounted.map(
        (
          interviewInfo,
          index
        ) => {
          const { interviewid, complete,interviewStatus,status,step,type, curDate, Latitude,Longtitude, duration,projectid,RecordURL,...otherProps} =interviewInfo;
          const restData = Object.entries(otherProps) 
          return (
            <tr key={index} className="module-4--counted-interview--table--tr">
              <td>{interviewid}</td> 
              <td>{complete}</td>
               
                <td className="module-4--sticky-status-td">
                  {optionCounted}
                  {String(interviewStatus + " - " + status + " - " + step + " - " + type)}
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
    <>
    <div className="module-4--counted-interview--tab-1">
      <table className="module-4--counted-interview--table-1">
        <HeaderRawData questionName = {props.questionName} />
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
    <ChangeInterviewStatus isOpen={isOpenCIStatModal} closeCIStatModal={closeCIStatModal} onConfirmChange = {handleStatusConfirmChange} 
    // onConfirmChange ={handleStatusConfirmChange}
    />
    </>
  );
};
export default CountedInterview;
