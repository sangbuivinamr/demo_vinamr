/*
Contributor: Dev03 -Ha Tien Dat
Date: 27/10/2020
Functionality: Display the quota label and select the columns or rows 
*/ 
import React, {useState} from 'react';
import "./styles/QuotaRowColumnAdjustment.css";
import {ImSigma} from "react-icons/im";

 const QuotaRowColumnAdjustment = (props) =>{
    const addedColumn = props.columnData;
    const addedRow = props.rowData;
    const renderHeader = () => {
        let headerElement = ['Rows', 'Columns']

        return headerElement.map((key, index) => {
            return <th key={index} style={{width: (index===0 && "50%") || (index==1 && "50%")}}>{key}</th>
        })
    }
    return (
        <>
            <table className='quota-management-page--adjust-rows-cols'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody className="quota-label-selection-table--body">
                 <tr>
         {/* This is the row adjustment's part */}
                   <td>
                        <div className="sigma-total-rounded-box">
                        <ImSigma className="sigma-icon" style={{size:"10px"}} /> <text> Total</text>
                        </div>
                        {addedRow.map(col => {return(  <div className="selected--expression--box"> 
                            {col}
                            </div>)})}
                          

                   </td>
    {/* This is the column adjustment's part */}
                   <td>
                   <div className="sigma-total-rounded-box">
                   <ImSigma className="sigma-icon" style={{size:"10px"}} /> Total
                        </div>
                        {addedColumn.map(row => {return(  <div className="selected--expression--box"> 
                            {row}
                            </div>)})}
                   </td>
                </tr>   
                    
                </tbody>
            </table>
        </>
    )
    
}
export default QuotaRowColumnAdjustment;
