import React, { useState, useEffect } from "react";
import { EDITING_TABLE_DATA } from "../../data/testing-data";
import "./styles/EditingTable.css";
const EditingTableTracking = (props) => {
  const [totalCol, setTotalCol] = useState([]);
  const [totalRow, setTotalRow] = useState([]);
  const [tableData, setTableData] = useState(props.editingTableData);

  //Rendering the header of the table
  const renderHeaderLayoutLeft = (table) => {
    return (
      table.colList &&
      table.colList.map((col) => {
        return <th className="header-left"> {col.text}</th>;
      })
    );
  };

  const getColumnRowTotal = () => totalCol.reduce((prev, current) => prev + current) + totalRow.reduce((prev, current) => prev + current);
  
  const renderTableRowOfColTotals = (table) => {

    console.log('table in renderColTotal', table)
    console.log('totalCol', totalCol);
    console.log('totalRow', totalRow);

    return(
        <tr>
            <td className="header-left-total">Total</td>
            {table.colList && table.colList.map((col) => {

              return(
                <td className="cell">{getColumnMaxQuotaTotalList(col["uniqueID"])}</td>
              )
            })}
            {/* <td>{getColumnRowTotal()}</td> */}
        </tr>
    )
  };

  const getMaxQuotaList = (cellId, cellType) => {
    let maxQuotaList = [];
    tableData.data.map((el) => {
      if (el[cellType === "ROW" ? "row" : "column"] === cellId)
        maxQuotaList.push(el["maxQuota"]);
    });

    console.log('maxQuotaList', maxQuotaList);

    // if(cellType === "ROW") setTotalRow(maxQuotaList);
    // else setTotalCol(maxQuotaList);

    return maxQuotaList;
  };

  const getRowMaxQuotaTotalList = (rowId) =>
    getMaxQuotaList(rowId, "ROW").reduce(
      (prev, current) => parseInt(prev) + parseInt(current)
    );

  const getColumnMaxQuotaTotalList = (colId) =>
    getMaxQuotaList(colId, "COLUMN").reduce(
      (prev, current) => parseInt(prev) + parseInt(current)
    );

  const renderEditingBody = (table) => {
    return (
      table.rowList &&
      table.rowList.map((el, elIndex) => {
        
        return (
          <tr>
            <td className="body-exceeded-left">
              {table.rowList[elIndex].text}
            </td>
            {getMaxQuotaList(el["uniqueID"], "ROW").map((quota) => (
              <td className="cell">{quota}</td>
            ))}
            <td className="cell">{getRowMaxQuotaTotalList(el["uniqueID"])}</td>
          </tr>
        );
      })
    );
  };

  if (tableData.colList.length < 1 || tableData.rowList.length < 1) return null;
  else
    return (
      <div className="main-table">
        <table>
          <thead>
            <tr>
              <td></td>
              {props.onRenderingHeader && renderHeaderLayoutLeft(tableData)}
              {props.onRenderingHeader && (
                <td className="header-left-total">Total</td>
              )}
            </tr>
          </thead>
          <tbody>
            {renderEditingBody(tableData)}
            {renderTableRowOfColTotals(tableData)}
          </tbody>
        </table>
      </div>
    );
};

export default EditingTableTracking;
