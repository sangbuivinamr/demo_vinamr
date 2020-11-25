/*
 *Contributor: Tien 30/10/2020
 *Main function: render layout right
 */

//Packages
import React from "react";

//Styles
import "./styles/QuotaName.css";

const QuotaName = (props) => {
  const renderQuotaName = () => {
    return props.dataCityTable !== "" && props.dataCarTable !== "" ? (
      <p className = "when-exceed--name">
        {props.dataCarTable} {"."} {props.dataCityTable}
      </p>
    ) : null;
  };
  return (
    <div className="when-exceed--quota-name-area">
      <p className="when-exceed--quota-name-p-area">Quota Name</p>
      {renderQuotaName()}
    </div>
  );
};

export default QuotaName;
