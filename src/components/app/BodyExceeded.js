/**
 * Contributor:
 *  Tiến 16/11/2020
 * Main function: render body and data inside the table
 */
import React from "react";

export default function BodyExceeded(props) {
  let dataBodyExceeded = props.dataBody;
  let apply = props.apply;
  let applyAll = props.applyAll;
  //Function send data of the table to parent component
  const sendDataFromBody = (e, indexCell) => {
    props.sendDataParent(e, indexCell);
  };
  const sendIndex = (indexCell) => {
    props.sendIndex(indexCell);
  };
  return (
    dataBodyExceeded.rowList &&
    dataBodyExceeded.rowList.map(({ text }) => {
      return (
        <tr 
        key={parseInt(Math.random() * 1000000)}>
          <td className="body-exceeded-left">
            {text}
          </td>
            {dataBodyExceeded.data.map(({ row, maxQuota }, index) => {
              if (row === text) {
                return (
                  <td
                    className="cell"
                    onClick={(e) => {
                      sendDataFromBody(e, index);
                      sendIndex(index);
                    }}
                    key={parseInt(Math.random() * 1000000)}
                  >
                    {maxQuota}
                    {/* {applyAll === undefined ? maxQuota : applyAll} */}
                  </td>
                  
                );
              }
            })}
        </tr>
      );
    })
  );
}
