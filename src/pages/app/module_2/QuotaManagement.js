/*
*Contributor: 
   *Tien 23/10/2020(init the codebase)
*Function: Render Screen Quota Management
*/

//Packages
import React,{useState}  from "react";
import QuotaOverview from "./QuotaOverview";
import ExpressionReview from "./ExpressionReview";
import { IoIosArrowRoundUp } from "react-icons/io";
import {IoIosArrowRoundDown} from "react-icons/io";
import {IoMdClose} from "react-icons/io";
import {IoIosSave} from "react-icons/io";
import axios from 'axios';


//Styles
import "./styles/QuotaManagementStyles.css";
import { QUOTA_OVERVIEW_DATA, testing_quota } from "../../../data/testing-data";


const QuotaManagement = (props)=>{

    const [quotaData, setQuotaData] = useState(QUOTA_OVERVIEW_DATA);
    const [quotaInput, setQuotaInput] = useState({
        quota_index: null,
        quota_label: "",
        quota_expression: ""
    })

    const onAddingQuota = () => {
        let newQuotaData = quotaData.concat(quotaInput);

        console.log('newQuotaData', newQuotaData)

        setQuotaData(newQuotaData);

        setQuotaInput({
            quota_index: null,
            quota_label: "",
            quota_expression: ""
        })
    }

    const onAddingQuotaLabel = (quota_label) => {
        let newQuotaInput = {
            quota_index: quotaData.length,
            quota_label: quota_label,
            quota_expression: quotaInput.quota_expression
        };

        setQuotaInput(newQuotaInput)
        
    }

    const onAddingQuotaExpression = (quota_expression) => {
        let newQuotaInput = {
            quota_index: quotaData.length,
            quota_label: quotaInput.quota_label,
            quota_expression: quota_expression
        }
        setQuotaInput(newQuotaInput)
    }

    return(
        <div className="quota-page">
           <div className="quota-page default-bar">
                <h2 className="h2-default">
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
                        onClick={onAddingQuota}
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
                <QuotaOverview
                    quotaData={quotaData}
                    quotaInput={quotaInput}
                    setQuotaLabel={onAddingQuotaLabel}
                    setQuotaExpression={onAddingQuotaExpression}
                />
                <ExpressionReview/>
            </div>
        </div>
    );
};
export default QuotaManagement;