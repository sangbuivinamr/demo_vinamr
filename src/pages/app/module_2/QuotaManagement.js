/*

*Contributor: 
   *Tien 23/10/2020(init the codebase)


*Function: Render Screen Quota Management

*/

//Packages
import React from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import {IoIosArrowRoundDown} from "react-icons/io";
import {IoMdClose} from "react-icons/io";
import {IoIosSave} from "react-icons/io";
import QuotaOverview from "./QuotaOverview";


//Styles
import "./styles/QuotaManagementStyles.css";


const QuotaManagement = (props)=>{
    return(
        <div className="quota-page">
            <div className="quota-page default-bar">
                <h2 className="h2">
                    QUOTA SETTINGS
                </h2>
                <div className="up">
                    <i>
                    <IoIosArrowRoundUp
                        className="up icon"
                    />
                    </i>
                </div>
                <div className="up">
                    <i>
                    <IoIosArrowRoundDown
                        className="up icon"
                    />
                    </i>
                </div>
                <div className="up">
                    <i>
                    <IoMdClose
                        className="up icon"
                    />
                    </i>
                </div>
                <div className="up">
                    <i>
                    <IoIosSave
                        className="up icon"
                    />
                    </i>
                </div>
                <div className="mode">
                    Mode:
                </div>
                    <select className="select">
                        <option value="Expression"> Expression </option>
                        <option value="Editing"> Editing </option>
                        <option value="When Exceeded"> When Exceeded </option>
                        <option value="Tracking"> Tracking </option>
                    </select>
                <div className="expression-review">
                    <h2 className="review">
                        EXPRESSION REVIEW
                    </h2>
                    <p>Silde 05/334</p>
                </div>
            </div>
            <div className="quota-page--tables">
                <QuotaOverview/>
                <QuotaOverview/>
            </div>
        </div>
    );
};
export default QuotaManagement;