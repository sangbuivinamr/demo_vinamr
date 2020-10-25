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
    const [quotaClickStatus, setQuotaClickStatus] = useState({
        quotaLabel: "",
        status: false
    })

    /**
     * @summary Add a quota row to the table
     */
    const onAddingQuota = () => {

        // Check if the user has actually inputted a quota
        if(quotaInput.quota_label == "" && quotaInput.quota_expression == ""){
            alert("You haven't typed any quota")
            return;
        }

        let newQuotaData = quotaData.concat(quotaInput);

        setQuotaData(newQuotaData);

        // After we've added a quota, the input will be cleaned up
        setQuotaInput({
            quota_index: null,
            quota_label: "",
            quota_expression: ""
        })
    }

    /**
     * @summary Handle the input change for the label input in the quota table
     * @param {string} quota_label The label (aka value of the input at the label column)
     */
    const onAddingQuotaLabel = (quota_label) => {
        let newQuotaInput = {
            quota_index: quotaData.length,
            quota_label: quota_label,
            quota_expression: quotaInput.quota_expression
        };

        setQuotaInput(newQuotaInput)
        
    }

    /**
     * @summary Handle the input change for the expression input in the quota table
     * @param {string} quota_expression The expression (aka value of the input at the expression column) 
     */
    const onAddingQuotaExpression = (quota_expression) => {
        let newQuotaInput = {
            quota_index: quotaData.length,
            quota_label: quotaInput.quota_label,
            quota_expression: quota_expression
        }
        setQuotaInput(newQuotaInput)
    }

    /**
     * @summary Make the selected (clicked) row to be highlighted
     * @param {string} quotaLabel The label of the current selected quota row
     */
    const onChoosingQuota = (quotaLabel) => {

        let newQuotaStatus = {
            quotaLabel: quotaLabel,
            status: true
        }
        setQuotaClickStatus(newQuotaStatus);
    }

    const onDeletingQuota = () => {
        if(quotaClickStatus.quotaLabel == "" && !quotaClickStatus.status){
            alert("Please indicate the quota you want to remove!")
            return;
        }
        let currentQuotaData = [];
        currentQuotaData = currentQuotaData.concat(quotaData);
        let newQuotaData = currentQuotaData.filter(quota => quota.quota_label !== quotaClickStatus.quotaLabel)
        setQuotaData(newQuotaData);
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
                        onClick={onDeletingQuota}
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
                    onChoosingQuota={onChoosingQuota}
                    quotaClickStatus={quotaClickStatus}
                    setQuotaClickStatus={setQuotaClickStatus}
                />
                <ExpressionReview/>
            </div>
        </div>
    );
};
export default QuotaManagement;