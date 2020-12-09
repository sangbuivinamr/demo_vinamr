/*
Contributor: Dev03 -Ha Tien Dat
Date: 27/10/2020
Functionality: Display the quota label and select the columns or rows 
*/ 
import React from 'react';
import "./styles/QuotaLabelSelection.css";
import QuotaRow from "../../../../components/app/QuotaRow";

 const QuotaLabelSelection = (props) =>{
     console.log("Quota Label Selection", props)
    const renderHeader = () => {
        let headerElement = ['Name', 'Expression']

        return headerElement.map((key, index) => {
            return <th key={index} style={{width: (index===0 && "60%") || (index==1 && "40%")}}>{key}</th>
        })
    }
    return (
        <>
            <table id='quota-label-selection-table'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody className="quota-label-selection-table--body">
                    <QuotaRow
                        quotaData={props.quotaData}
                        quotaClickStatus={props.quotaClickStatus}
                        setQuotaClickStatus={props.setQuotaClickStatus}
                        onChoosingQuota={props.onChoosingQuota}
                    />
                    
                    
                </tbody>
            </table>
        </>
    )
    
}
export default QuotaLabelSelection;
