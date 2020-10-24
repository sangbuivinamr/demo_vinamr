/*

*Contributor: 
   *Tien 23/10/2020(init the codebase)


*Function: Render Screen Quota Management

*/

//Packages
import React from "react";
import QuotaOverview from "./QuotaOverview";
import DefaultBar from "../../../components/DefaultBar";

//Styles
import "./styles/QuotaManagementStyles.css";


const QuotaManagement = (props)=>{
    return(
        <div className="quota-page">
            <DefaultBar/>    
            <div className="quota-page--tables">
                <QuotaOverview/>
                {/* <QuotaOverview/> */}
            </div>
        </div>
    );
};
export default QuotaManagement;