/*
 *Contributor: Tien 30/10/2020
 *Main function: render layout right 
*/

//Packages
import React from "react";


//Styles
import './styles/QuotaName.css';

const QuotaName = (props)=>{
    const renderQuotaName = () =>{
        return props.dataCityTable !== "" && props.dataCarTable !== "" ?  <p className="name">{props.dataCityTable} {"."} {props.dataCarTable}</p> : null;
    }
        return (
            <div className="quota-name">
                <p className="quota-name-p">Quota Name</p>
                {renderQuotaName() }
            </div>
        )
   
}

export default QuotaName;