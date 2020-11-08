/*
 *Contributor: Tien 30/10/2020
 *Main function: render layout right 
*/

//Packages
import React from "react";


//Styles
import './styles/QuotaName.css';

const QuotaName = (props)=>{
    return (

        <div className="quota-name">
            <p className="quota-name-p">Quota Name</p>
            <p className="name">{props. dataFromTable}</p>
        </div>
    )
}

export default QuotaName;