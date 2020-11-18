/**
 * Contributor:
 *  Tiến 16/11/2020
 * Main function: render body and data inside the table
 */
import React from "react";

export default function BodyExceeded(props) {
  let stateTextArea = props.value;
  let dataBodyExceeded = props.dataBody;

  //Function send data of the table to parent component
  const sendDataFromBody = (e) => {
    props.sendDataParent(e);
  };
  const deleteCell = (e) => {
    props.deleteCell(e);
  };
  const sendIndex = (indexCell) => {
    props.sendIndex(indexCell);
  };
  console.log("textarea",stateTextArea)
  return (
    dataBodyExceeded.rowList &&
    dataBodyExceeded.rowList.map(({ text }, uniqueID) => {
      return (
        <tr>
          <td className="body-exceeded-left" key={uniqueID}>
            {text}
          </td>
          {dataBodyExceeded.data.map(({ maxQuota }, index) => {
            return (
              <td
                className="cell"
                onClick={(e) => {
                  sendDataFromBody(e);
                  sendIndex(index);
                }}
                value={props.value}
                onChange={(e) => deleteCell(e.target.value)}
                key={index}
              >
                {maxQuota}
              </td>
            );
          })}
        </tr>
      );
    })
  );
}
