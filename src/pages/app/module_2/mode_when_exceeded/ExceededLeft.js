/*
 *Contributor: Tien 30/10/2020
 *Main function: render layout left
 */

//Packages
import React from "react";
import BodyExceeded from "../../../../components/app/BodyExceeded";
import HeaderExceeded from "../../../../components/app/HeaderExceeded";

//Styles
import "./styles/ExceededLeft.css";

const ExceededLeft = (props) => {
 
  //Function send data of the table to parent component
  const sendDataParent = (e) => {
    props.onChoosingCell(e);
  };
  const deleteCell = (e) => {
    props.deleteCell(e)
  }
  const sendIndex = (indexCell) => {
    props.sendIndex(indexCell)
  }
  let dataFromBE = props.dataExceeded;
  let dataHeaderBE = props.dataExceeded.colList;
  let dataBodyBE = props.dataExceeded;
  if(dataFromBE.length === 0)
  {
    sendIndex(props.indexCell)
    return (<div></div>)
  }
  return (
    <div className="main-table">
      <table>
        <thead>
          <tr>
            <td></td>
            <HeaderExceeded dataHeader={dataHeaderBE} />
          </tr>
        </thead>
        <tbody>
          <BodyExceeded
           dataBody = {dataBodyBE}
           value = {props.value}
           onChange = {e => deleteCell(e.target.value)}
           sendDataParent = {(e) => {sendDataParent(e)}} 
           sendIndex = {(indexCell) => sendIndex(indexCell)}
          />
        </tbody>
      </table>
    </div>
  );
};
export default ExceededLeft;
