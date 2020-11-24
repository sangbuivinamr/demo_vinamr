import React, {useState, useEffect} from 'react';
import { EDITING_TABLE_DATA } from '../../data/testing-data';
import "./styles/EditingTable.css";
const EditingTable = (props) => {


    const TOTAL = "Total" // In case of changing TOTAL into "Tổng Cộng"
    const [tableData,setTableData] = useState(props.editingTableData);
<<<<<<< HEAD
    //The useEfect is to make sure the state is updating
    useEffect(() => {
        setTableData(props.editingTableData);
      }, [props.editingTableData]);
    //Rendering the header of the table 
    let totalRowIDList = []
    let totalColIDList = []

    const getTotalID = (table) =>{
        if(table === undefined) return;
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

=======
    //Rendering the header of the table 
>>>>>>> Tracking
    const renderHeaderLayoutLeft =(props) =>{
        if(props === undefined) return null;
        // console.log(" Render column props", props)
<<<<<<< HEAD
        return props.columnList && props.columnList.map((row)=>
        {  if (row.text === TOTAL) //Styling the total Row
        return[
     
             <th className="header-left-total" >{TOTAL}</th>,
             ,
                    <td className="editing-empty-td"></td>
     
        ];
           else return ((
            <th className="header-left"> {row.text}</th>
=======
        return props.colList && props.colList.map((col)=>
        {   
            return ((
            <th className="header-left"> {col.text}</th>
>>>>>>> Tracking
            
            ))
        })
    }
<<<<<<< HEAD

    
=======
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

>>>>>>> Tracking
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

    const renderEditingBody =(props , parentProps)=>{
        console.log('NIGGA' , props);
        if(props === undefined) return null;
        let i = -1; // Need i to print out the rowList 
<<<<<<< HEAD
       
        return props.dataList && props.dataList.map(row=>{
          {  i++;
           
            return[
                    <tr key={row.columnID}>
                        {props.rowList[i].text === TOTAL ? (<td className="header-left-total">{TOTAL}</td>) : 
                        (<td className="editing-table-label">{props.rowList[i].text}</td>)}
                        
                        {row.map(cell => {
                            if( isToTalRowID(cell.rowID) && isToTalColID(cell.columnID))
                            return[
                                <td key={cell.columnID} className = "sum-all-cols-rows-cell"><input type = 'number' value = {parentProps.getValue(cell.rowID , cell.columnID)} onChange = {(e) => {parentProps.changeValue(cell.rowID, cell.columnID , e.target.value)}}/>
                                </td>,
                                <td className="editing-empty-td"></td>  
                        ];
                            else if (isToTalRowID(cell.rowID) )
                            return[ <td key={cell.columnID} className="header-left-total">
                            {cell.maxQuota}
                        </td>]
                        // <td className="editing-empty-td"></td>]
                        else if (isToTalColID(cell.columnID))
                        return [
                        <td key={cell.columnID} className="header-left-total"><input type = 'number' value = {parentProps.getValue(cell.rowID , cell.columnID)} onChange = {(e) => {parentProps.changeValue(cell.rowID, cell.columnID , e.target.value)}}/>
                        </td>,
                    <td className="editing-empty-td"></td>]
                                    
                                
                               
                            
                            else return(
                                <td key={cell.columnID} className="cell">
                                <input type = 'number' value = {parentProps.getValue(cell.rowID , cell.columnID)} onChange = {(e) => {parentProps.changeValue(cell.rowID, cell.columnID , e.target.value)}}/>
                            </td>
=======
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
>>>>>>> Tracking
                            )
                        })}
                        <td className="header-left-total">{totalRow[i]}</td>
                       
                    </tr>,
                   <tr> {props.rowList[i].text === TOTAL ? (<td style={{height:"10px"}}></td>) : 
                   (<td style ={{display: "none"}}></td>)}</tr>
            ]
                    }
        })
    }
<<<<<<< HEAD
    //if (tableData.columnList.length < 1 || tableData.rowList.length < 1 ) return (null)
    return  (
        <div className="main-editing-table">
=======
    if (tableData.colList.length < 1 || tableData.rowList.length < 1 ) return (null)
    else return  (
        <div className="main-table">
>>>>>>> Tracking

            <table>
                <thead>
                    <tr>
                        <td className = "editing-empty-td"></td>
                        {(props.onRenderingHeader) && renderHeaderLayoutLeft(tableData)}
                       
                        
                    </tr>
                </thead>
                <tbody>
<<<<<<< HEAD
                    {renderEditingBody(tableData, props)}
                 
=======
                    {renderEditingBody(tableData)}  
                    {renderTableRowOfColTotals(totalCol)}
>>>>>>> Tracking
                </tbody>
                
                
            </table>
        </div>
    )
}

export default EditingTable;