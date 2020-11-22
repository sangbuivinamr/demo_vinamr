import React, {useState, useEffect} from 'react';
import { EDITING_TABLE_DATA } from '../../data/testing-data';
import "./styles/EditingTable.css";
const EditingTable = (props) => {
    const TOTAL = "Total" // In case of changing TOTAL into "Tổng Cộng"
    console.log("Props of editing table",props)
    const [tableData,setTableData] = useState(props.editingTableData);
    //The useEfect is to make sure the state is updating
    useEffect(() => {
        setTableData(props.editingTableData);
      }, [props.editingTableData]);
    //Rendering the header of the table 
    let totalRowIDList = []
    let totalColIDList = []

    const getTotalID = (table) =>{
       totalRowIDList = table.rowList.filter(row => (row.uniqueID)&&(row.text === TOTAL))
       totalColIDList = table.columnList.filter(col => (col.uniqueID)&&(col.text === TOTAL))
    }
   
    getTotalID(tableData);
    const isToTalRowID = (id) => {
        for( const row of totalRowIDList)
        if(id === row.uniqueID)
        return true;

        return false;
    }
    const isToTalColID = (id) => {
        for( const col of totalColIDList)
        if(id === col.uniqueID)
        return true;

        return false;
    }
    

    console.log("Editing Table - totalRowID ",totalRowIDList);
    console.log("Editing Table - totalColID ",totalColIDList);

    const renderHeaderLayoutLeft =(props) =>{
        // console.log(" Render column props", props)
        return props.columnList && props.columnList.map((row)=>
        {  if (row.text === TOTAL) //Styling the total Row
        return[
     
             <th className="header-left-total" >{TOTAL}</th>,
             ,
                    <td className="editing-empty-td"></td>
     
        ];
           else return ((
            <th className="header-left"> {row.text}</th>
            
            ))
        })
    }

    
    const renderTableRowOfColTotals = (props) => {

        return(
            <tr>
                {/* <td className="header-left-total"> Total</td> */}
                {props.map (total =>{
                    return (
                        <td className="header-left-total">
                            {total}
                        </td>
                    )
                })}
              {/* <td className = "sum-all-cols-rows-cell">{sumOfAllCells}</td> */}
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
       
        return props.dataList && props.dataList.map(row=>{
          {  i++;
           
            return[
                    <tr key={row.columnID}>
                        {props.rowList[i].text === TOTAL ? (<td className="header-left-total">{TOTAL}</td>) : 
                        (<td className="editing-table-label">{props.rowList[i].text}</td>)}
                        
                        {row.map(cell => {
                            if( isToTalRowID(cell.rowID) && isToTalColID(cell.columnID))
                            return[
                                <td key={cell.columnID} className = "sum-all-cols-rows-cell">{cell.quotaCount}</td>,
                                <td className="editing-empty-td"></td>
                        ];
                            else if (isToTalRowID(cell.rowID) )
                            return[ <td key={cell.columnID} className="header-left-total">
                            {cell.quotaCount}
                        </td>]
                        // <td className="editing-empty-td"></td>]
                        else if (isToTalColID(cell.columnID))
                        return[<td key={cell.columnID} className="header-left-total">
                        {cell.quotaCount}
                    </td>,
                    <td className="editing-empty-td"></td>]
                                    
                                
                               
                            
                            else return(
                                <td key={cell.columnID} className="cell">
                                {cell.quotaCount}
                            </td>
                            )
                        })}
                        {/* <td className="header-left-total">{totalRow[i]}</td> */}
                       
                    </tr>,
                   <tr> {props.rowList[i].text === TOTAL ? (<td style={{height:"10px"}}></td>) : 
                   (<td style ={{display: "none"}}></td>)}</tr>
            ]
                    }
        })
    }
    if (tableData.columnList.length < 1 || tableData.rowList.length < 1 ) return (null)
    else return  (
        <div className="main-editing-table">

            <table>
                <thead>
                    <tr>
                        <td className = "editing-empty-td"></td>
                        {(props.onRenderingHeader) && renderHeaderLayoutLeft(tableData)}
                        {/* {(props.onRenderingHeader) && <td className="header-left-total"> Total</td>} */}
                        
                    </tr>
                </thead>
                <tbody>
                    {renderEditingBody(tableData)}
                    {/* {renderTableRowOfColTotals(totalCol)} */}
                </tbody>
                
                
            </table>
        </div>
    )
}

export default EditingTable;