//Pakages
import React,{useState} from "react";
import HeaderRawData from "../../../components/app/HeaderRawData";
import { Link } from "react-router-dom";
import ChangeInterviewStatus from "../../../components/app/ChangeInterviewStatus"
//Styles
import "./styles/CancelledInterview.css";

const CancelledInterview = (props) => {
  
  let optionCancel = ""
  const statusChoices = props.status;
  const onChangeOptionCancel = (e) => {
    openCIStatModal();
    optionCancel = e.target.value
  };
  let bodyCancelled = JSON.parse(JSON.stringify(props.bodyCancelled));
  bodyCancelled = bodyCancelled.filter(row => row.interviewStatus === "Cancel")

  const [isOpenCIStatModal, setIsOpenCIStatModal] = useState(false); // CIStat abbreviates for "Change Interview Status". 
  
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
    // props.changeRawDataStatus();
  }
  const renderBody = () => {
    return (
      bodyCancelled &&
      bodyCancelled.map(
        (
          interviewInfo,
          index
        ) => {
          const { interviewid, complete,interviewStatus,status,step,type,curDate, Latitude,Longtitude, duration,projectid,RecordURL,...otherProps} =interviewInfo
          const otherPropsData = Object.entries(otherProps) 
          return (
            <tr key={index}>
              <td>{interviewid}</td> 
              <td>{complete}</td>
              
                <td className="module-4--table--status-td">
                  {optionCancel}
                  {String(interviewStatus + " - " + status + " – " + step + " – " + type)}
                  <select
                    className="module-4--cancelled-interview--select-option-body"
                    value= {String(interviewStatus + " - " + status + " – " + step + " – " + type)}
                    onChange={(optionCounted) =>{
                      onChangeOptionCancel(optionCounted)
                      console.log("Clicked")
                    }
                     
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
              {(otherPropsData!== undefined) ? otherPropsData.map((cell,index) =>
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
    <div className="module-4--cancelled-interview--tab-2">
      <table className="module-4--cancelled-interview--table-2">
        <HeaderRawData questionName={props.questionName} />
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
    <ChangeInterviewStatus isOpen={isOpenCIStatModal} closeCIStatModal={closeCIStatModal} onConfirmChange = {handleStatusConfirmChange}/>
    </>
  );
};
export default CancelledInterview;
