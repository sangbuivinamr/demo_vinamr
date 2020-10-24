
import React, {useState, useEffect} from "react";


//Styles
import "./styles/QuotaOverview.css";
import { QUOTA_OVERVIEW_DATA } from "../../../data/testing-data";


const QuotaOverview = (props)=>{

    const renderHeader = () => {
        let headerElement = ['Quota Label', 'Expression']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {

        return QUOTA_OVERVIEW_DATA && QUOTA_OVERVIEW_DATA.map(({ quota_label, expression }) => {
            return (
                <tr key={quota_label}>
                    <td>{quota_label}</td>
                    <td>{expression}</td>
                </tr>
            )
        })
    }

    return (
        <>
            <table id='employee'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
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