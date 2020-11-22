import React, {useState, useEffect} from 'react';
import { EDITING_TABLE_DATA } from '../../data/testing-data';
import "./styles/EditingTable.css";
const EditingTable = (props) => {
    // console.log("Props of editing table",props)
    
    let totalCol = [];  ///This is an array that each value is the sum of all cells in a column
    let totalRow =[]; // This is an array that each value is the sum of all cells in a row
    
    //The testing data, will move to testing data later
    const [tableData,setTableData] = useState(props.editingTableData);
    //Rendering the header of the table 
    const renderHeaderLayoutLeft =(props) =>{
        // console.log(" Render column props", props)
        return props.colList && props.colList.map((col)=>
        {   
            return ((
            <th className="header-left"> {col.text}</th>
            
            ))
        })
    }
    const handleTotalRow = (props) =>{
        
        let tempTotal;
        for(const row of props)
        {   
            tempTotal = row.reduce((first,{maxQuota}) => first + maxQuota,0);
            totalRow.push(tempTotal);
        }
   
    }
    handleTotalRow(tableData.data) /// Implement this function right away to calculate the sum of all row and columns 
    const sumOfAllCells = totalRow.reduce((first,   last) => first+ last,0);
    
    const handleTotalColumn = (props) => {
        // console.log("Handle Total Column props", props)
        let indexOfRow, indexOfColumn;

        for(const column of props.colList){
            totalCol.push(0);
            for (const row of props.rowList)
            {
                indexOfColumn = props.colList.indexOf(column);
                indexOfRow = props.rowList.indexOf(row)
                totalCol[indexOfColumn] += props.data[indexOfRow][indexOfColumn].maxQuota;
            }
        }
      
   
           
             
                
         }
    

    handleTotalColumn(tableData); ///Implement the function right away to calculate the sum of all row and columns 

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
        // console.log("render Editing body",props)
        return props.data && props.data.map(row=>{
          {  i++;
            return(
                    <tr>
                        <td className="body-exceeded-left">{props.rowList[i].text}</td>
                        {row.map(({maxQuota}) => {
                            return(
                                <td className="cell">
                                    {maxQuota}
                                </td>
                            )
                        })}
                        <td className="header-left-total">{totalRow[i]}</td>
                       
                    </tr>
            )
                    }
        })
    }
    if (tableData.colList.length < 1 || tableData.rowList.length < 1 ) return (null)
    else return  (
        <div className="main-table">

            <table>
                <thead>
                    <tr>
                        <td></td>
                        {(props.onRenderingHeader) && renderHeaderLayoutLeft(tableData)}
                        {(props.onRenderingHeader) && <td className="header-left-total"> Total</td>}
                        
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