
import React, {useState, useEffect} from "react";


//Styles
import "./styles/QuotaOverview.css";
import { QUOTA_OVERVIEW_DATA } from "../../../data/testing-data";
import QuotaRow from "../../../components/app/QuotaRow";


const QuotaOverview = (props)=>{

    const [quotaData, setQuotaData] = useState(QUOTA_OVERVIEW_DATA);

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
                <tbody>
                    <QuotaRow
                        quotaData={quotaData}
                    />
                    <input
                        placeholder=""
                        value={props.inputQuota}
                        onChange={(text) => props.setInputQuota(text.target.value)}
                        className="quota-overview-table--input"
                    />
                    
                </tbody>
            </table>
        </>
    )
}
export default QuotaOverview;