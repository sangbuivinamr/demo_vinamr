import React, {useState, useEffect} from 'react';
import { EDITING_TABLE_DATA } from '../../data/testing-data';
import "./styles/EditingTable.css";
const EditingTable = (props) => {
    console.log("Props of editing table",props)
    
  
    
    const [tableData,setTableData] = useState(props.editingTableData);
    //The useEfect is to make sure the state is updating
    useEffect(() => {
        setTableData(props.editingTableData);
      }, [props.editingTableData]);
    //Rendering the header of the table 
    const renderHeaderLayoutLeft =(props) =>{
        // console.log(" Render column props", props)
        return props.columnList && props.columnList.map((row)=>
        {   
            return ((
            <th className="header-left"> {row.text}</th>
            
            ))
        })
    }
    // const handleTotalRow = (props) =>{
       
    //     let tempTotal;
    //     for(const row of props)
    //     {   
    //         tempTotal = row.reduce((first,{quotaCount}) => first + quotaCount,0);
    //         totalRow.push(tempTotal);
    //     }
   
    // }
  
    // const sumOfAllCells = totalRow.reduce((first,   last) => first+ last,0);
    
    // const handleTotalColumn = (props) => {
    //     console.log("Handle Total Column props", props)
    //     // let indexOfRow, indexOfColumn;

    //     // for(const column of props.columnList){
    //     //     totalCol.push(0);
    //     //     for (const row of props.rowList)
    //     //     {
    //     //         indexOfColumn = props.columnList.indexOf(column);
    //     //         indexOfRow = props.rowList.indexOf(row)
    //     //         totalCol[indexOfColumn] += props.dataList[indexOfRow][indexOfColumn].quotaCount;
    //     //     }
    //     // }
    //     // totalCol.splice(0,props.columnList.length,0);
    //     totalCol = []
    //     for ( let i = 0; i< props.columnList.length; i++)
    //     {   totalCol.push(0);
    //         for (let j = 0; j < props.rowList.length; j++ )
    //     {
    //         totalCol[i]+= props.dataList[j][i].quotaCount;
    //     }
    //     }       
    //      }
    

    // handleTotalColumn(tableData); ///Implement the function right away to calculate the sum of all row and columns 

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
        // console.log("render Editing body",props)
        return props.dataList && props.dataList.map(row=>{
          {  i++;
           
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
                        {/* <td className="header-left-total">{totalRow[i]}</td> */}
                       
                    </tr>
            )
                    }
        })
    }
    if (tableData.columnList.length < 1 || tableData.rowList.length < 1 ) return (null)
    else return  (
        <div className="main-table">

            <table>
                <thead>
                    <tr>
                        <td></td>
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