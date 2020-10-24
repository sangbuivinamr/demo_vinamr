/*

*Contributor: 
   *Tien 23/10/2020(init the codebase)


*Function: Render Screen Quota Management

*/
import React from "react";


//Styles
import "./styles/QuotaManagementStyles.css";


const QuotaManagement =()=>{
    return(
            <div className="quota-page">
                <h2 className="h2">
                    QUOTA SETTINGS
                </h2>
                <p> UP</p>
                <p> down</p>
                <p> delete</p>
                <p>SAVE</p>
                <select
                    className="select"
                >
                    <option>

                    </option>
                </select>
            </div>
    );
};
export default QuotaManagement;