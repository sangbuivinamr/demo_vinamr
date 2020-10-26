
import React, {useState, useEffect} from "react";


//Styles
import "./styles/QuotaOverview.css";
import QuotaRow from "../../../../components/app/QuotaRow";

const QuotaOverview = (props)=>{

    const renderHeader = () => {
        let headerElement = ['Quota Label', 'Expression']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    return (
        <>
            <table id='quota-overview-table'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody className="quota-overview-table--body">
                    <QuotaRow
                        quotaData={props.quotaData}
                        quotaClickStatus={props.quotaClickStatus}
                        setQuotaClickStatus={props.setQuotaClickStatus}
                        onChoosingQuota={props.onChoosingQuota}
                    />
                    <td>
                        <input
                            placeholder=""
                            value={props.quotaInput.quota_label}
                            onChange={(text) => props.setQuotaLabel(text.target.value)}
                            className="quota-overview-table--input"
                        />
                    </td>
                    <td>
                        <input
                            placeholder=""
                            value={props.quotaInput.quota_expression}
                            onChange={(text) => props.setQuotaExpression(text.target.value)}
                            className="quota-overview-table--input"
                        />
                    </td>
                    
                    
                </tbody>
            </table>
        </>
    )
}
export default QuotaOverview;