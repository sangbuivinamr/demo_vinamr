import React, {useState, useEffect} from 'react';
import { EDITING_TABLE_DATA } from '../../data/testing-data';
import "./styles/EditingTable.css";
const EditingTable = (props) => {
    
    
    let totalCol = [];  ///This is an array that each value is the sum of all cells in a column
    let totalRow =[]; // This is an array that each value is the sum of all cells in a row
    
    //The testing data, will move to testing data later
    const [tableData,setTableData] = useState(props.editingTableData);

   
    const renderHeaderLayoutLeft =(props) =>{
        console.log(" Render column props", props)
        return props.columnList && props.columnList.map((row)=>
        {   
            return ((
            <th className="header-left"> {row.text}</th>
            
            ))
        })
    }
    const handleTotalRow = (props) =>{
       
        let tempTotal;
        for(const row of props)
        {   
            tempTotal = row.reduce((first,{quotaCount}) => first + quotaCount,0);
            totalRow.push(tempTotal);
        }
   
    }
    handleTotalRow(tableData.dataList) /// Implement this function right away to calculate the sum of all row and columns 
    const sumOfAllCells = totalRow.reduce((first,   last) => first+ last,0);
    
    const handleTotalColumn = (props) => {
      
         for(var i = 0; i < props.length;i++){
             totalCol.push(0);
             for(var j  =0; j< props[i].length;j++){
            totalCol[i] +=props[j][i].quotaCount;
             
                }
         }
    }

    handleTotalColumn(tableData.dataList); ///Implement the function right away to calculate the sum of all row and columns 

    const renderTableRowOfColTotals = (props) => {

        return(
            <tr>
                <td className="header-left-total"> Total</td>
                {props.map (total =>{
                    return (
                        <td className="header-left-total">
                            {total}
                        </td>
                    )
                })}
              <td className = "sum-all-cols-rows-cell">{sumOfAllCells}</td>
            </tr>
        )
    }
//    const checkEquivalenceSampleSize = () => {
//        const sumOfTotalRow = totalRow.reduce((first, last) => first+ last,0);
//        console.log("Sum of TotalRow", sumOfTotalRow)
//        const sumOfTotalCol = totalCol.reduce((first, last) => first + last,0);
//        console.log("Sum of TotalRow", sumOfTotalCol)
//        return (sumOfTotalCol === sumOfTotalRow) && true; 
//    }
//    console.log("Check equivalene ",checkEquivalenceSampleSize());

    const renderEditingBody =(props)=>{
        let i = -1; // Need i to print out the rowList 
        console.log("render Editing body",props)
        return props.dataList.map(row=>{
            i++;
           
            return(
                    <tr>
                        <td className="body-exceeded-left">{props.rowList[i].text}</td>
                        {row.map(({quotaCount}) => {
                            return(
                                <td className="cell">
                                    {quotaCount}
                                </td>
                            )
                        })}
                        <td className="header-left-total">{totalRow[i]}</td>
                    </tr>
            )})
    }
    if (tableData.columnList.length < 1 || tableData.rowList.length < 1 ) return (null)
   else return  (
        <div className="main-table">
            {tableData.columnList.length}
            <table>
                <thead>
                    <tr>
                        <td></td>
                        {renderHeaderLayoutLeft(tableData)}
                        <td className="header-left-total"> Total</td>
                    </tr>
                </thead>
                <tbody>
                    {renderEditingBody(tableData)}
                    {renderTableRowOfColTotals(totalCol)}
                </tbody>
                
                
            </table>
        </div>
    )
}

export default EditingTable;