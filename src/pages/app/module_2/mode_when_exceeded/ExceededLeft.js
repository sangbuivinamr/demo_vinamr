/*
 *Contributor: Tien 30/10/2020
 *Main function: render layout left
 */

//Packages
import React from "react";

//Styles
import "./styles/ExceededLeft.css";

const ExceededLeft = (props) => {
  const exceededLeft = props.exceededLeft;
  const exceededLeftHeader = props.exceededLeftHeader;
  

  //Function send data of the table to parent component
  const sendDataParent = (e) => {
   
    props.onChoosingCell(e);
  };
  // const deleteMessage = (e) =>{
  //   props.deleteMessage(e);
  // }

  const renderHeaderLayoutLeft = () => {
    return (
      exceededLeftHeader &&
      exceededLeftHeader.map(({ quota_index, quota_label }) => {
        return (
          <th className="header-left" key={quota_index}>
            {quota_label}
          </th>
        );
      })
    );
  };

  const renderExceedBodyLeft = () => {
    return (
      exceededLeft &&
      exceededLeft.map(({ type_index, type_car, check }) => {
        return (
          <tr key={type_index}>
            <td className="body-exceeded-left">{type_car}</td>
            {check.map((count) => {
              return (
                <td
                  className="cell"
                  onClick={(e) => {
                    sendDataParent(e);
                    // props.onChoosingQuota(e);
                    // deleteMessage(e)
                  }}
                >
                  {count}
                </td>
              );
            })}
          </tr>
        );
      })
    );
  };
  return (
    <div className="main-table">
      <table>
        <thead>
          <tr>
            <td></td>
            {renderHeaderLayoutLeft()}
          </tr>
        </thead>
        <tbody>{renderExceedBodyLeft()}</tbody>
      </table>
    </div>
  );
};
export default ExceededLeft;
