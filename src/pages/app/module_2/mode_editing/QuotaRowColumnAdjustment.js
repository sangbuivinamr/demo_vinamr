/*
Contributor: Dev03 -Ha Tien Dat
Date: 27/10/2020
Functionality: Display the quota label and select the columns or rows 
*/ 
import React, {useState} from 'react';
import "./styles/QuotaRowColumnAdjustment.css";
import {ImSigma} from "react-icons/im";

 const QuotaRowColumnAdjustment = (props) =>{
    const totalRows =  props.totalRowsData;
    // console.log("Total Row",totalRows)
    const totalColumns = props.totalColumnsData;
    // console.log("Total Columns",totalColumns)
    const addedColumn = props.columnData;
    const addedRow = props.rowData;
    const renderHeader = () => {
        let headerElement = ['Rows', 'Columns']

        return headerElement.map((key, index) => {
            return <th key={index} style={{width: (index===0 && "50%") || (index==1 && "50%")}}>{key}</th>
        })
    }
    const onChangingColorBasedOnClickStatus = (status, defaultStatus) => status === defaultStatus ? 'orange' : 'white';
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
                            {totalRows.map(totalRow =>{
                                return(
                                    //  <div>
                                    <div key={parseInt(Math.random() * 10000)} className="sigma-total-rounded-box">
                                <ImSigma className="sigma-icon" style={{size:"10px"}} /> <p> {totalRow.text}</p>
                                
                            </div>
                            // {/* {total.map(row => {
                            //     return(  
                            //         <div style={{backgroundColor: onChangingColorBasedOnClickStatus(props.chosenRowStatus, row)}} onClick={() => props.onChoosingRow(row)} className="selected--expression--box"> 
                            //             {row.text}
                            //         </div>
                            //     )})
                            // } */}
                            //     // </div>
                                     
                                );
                            })}
                           
                            {addedRow.map(row => {
                                return(  
                                    <div key={parseInt(Math.random() * 10000)} style={{backgroundColor: onChangingColorBasedOnClickStatus(props.chosenRowStatus, row)}} onClick={() => props.onChoosingRow(row)} className="selected--expression--box"> 
                                        {row.text}
                                    </div>
                                )})
                            }
                        </td>
                        {/* This is the column adjustment's part */}
                        <td>
                                {/* <div className="sigma-total-rounded-box">
                                <ImSigma className="sigma-icon" style={{size:"10px"}} /> Total
                            </div> */}
                            {totalColumns.map(totalColumn =>{
                                return(
                                    //  <div>
                                    <div key={parseInt(Math.random() * 10000)} className="sigma-total-rounded-box">
                                <ImSigma className="sigma-icon" style={{size:"10px"}} /> <p> {totalColumn.text}</p>
                                
                            </div>
                            // {/* {total.map(row => {
                            //     return(  
                            //         <div style={{backgroundColor: onChangingColorBasedOnClickStatus(props.chosenRowStatus, row)}} onClick={() => props.onChoosingRow(row)} className="selected--expression--box"> 
                            //             {row.text}
                            //         </div>
                            //     )})
                            // } */}
                            //     // </div>
                                     
                                );
                            })}
                            {addedColumn.map(col => {
                                return(
                                    <div key={parseInt(Math.random() * 10000)} style={{backgroundColor: onChangingColorBasedOnClickStatus(props.chosenColumnStatus, col)}} onClick={() => props.onChoosingColumn(col)} className="selected--expression--box"> 
                                        {col.text}
                                    </div>
                                )})
                            }
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </>
    )
    
}
export default QuotaRowColumnAdjustment;
