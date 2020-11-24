/*
* Contributor: 
    - Tiến 14/11/2020
*/

//Packages
import React from "react";
import HeaderRawData from "../../../components/app/HeaderRawData"


//Styles
import "./styles/NotCompleted.css";


const NotCompleted = (props) => {
  let bodyCounted = props.bodyCounted;
  const renderBody = () => {
    
  };
  return (
    <div className="table-3">
      <table>
        <HeaderRawData/>
        <tr>
          <tbody>
            <td>{renderBody()}</td>
          </tbody>
        </tr>
      </table>
    </div>
  );
};
export default NotCompleted;
