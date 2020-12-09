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
  let dataFromBE = props.dataExceeded;
  let dataHeaderBE = props.dataExceeded.colList;
  let dataBodyBE = props.dataExceeded;
  let apply = props.apply;
  let applyAll = props.applyAll;

  //Function send data of the table to parent component
  const sendDataParent = (e, indexCell) => {
    props.onChoosingCell(e, indexCell);
  };
  const sendIndex = (indexCell) => {
    props.sendIndex(indexCell);
  };
  if (dataFromBE.length === 0) {
    return <div></div>;
  }
  return (
    <div className="when-exceeded--main-table">
      <table>
        <thead>
          <tr>
            <td></td>
            <HeaderExceeded dataHeader={dataHeaderBE} />
          </tr>
        </thead>
        <tbody>
          <BodyExceeded
            dataBody={dataBodyBE}
            value={props.value}
            apply={apply}
            applyAll={applyAll}
            sendDataParent={(e, indexCell) => {
              sendDataParent(e, indexCell);
            }}
            sendIndex={(indexCell) => sendIndex(indexCell)}
          />
        </tbody>
      </table>
    </div>
  );
};
export default ExceededLeft;
