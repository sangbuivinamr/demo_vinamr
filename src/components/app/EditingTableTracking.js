import React, { useState, useEffect } from "react";

import "./styles/EditingTable.css";

const EditingTableTracking = (props) => {
  console.log("props.editingTableData", props.editingTableData);
  let colTotalQuotas = [];
  let colTotal;
  let currentColTotalQuotas = [];
  let currentColTotal;
  const [tableData, setTableData] = useState();

  React.useEffect(() => setTableData(props.editingTableData), [
    props.editingTableData,
  ]);

  //Rendering the header of the table
  const renderHeaderLayoutLeft = (table) => {
    return (
      tableData &&
      table.colList &&
      table.colList.map((col) => {
        return <th className="header-left">{col.text}</th>;
      })
    );
  };

  const renderTableRowOfColTotals = (table) => {
    return (
      <tr>
        <td className="header-left-total">Total</td>
        {tableData &&
          table.colList &&
          table.colList.map((col, colIndex) => {
            colTotalQuotas.push(getColumnMaxQuotaTotalList(col["uniqueID"]));
            currentColTotalQuotas.push(
              getColumnCurrentMaxQuotaTotalList(col["uniqueID"])
            );

            colTotal = colTotalQuotas.reduce(quotaListSum);
            currentColTotal = currentColTotalQuotas.reduce(quotaListSum);

            return (
              <td className="cell">
                {getColumnCurrentMaxQuotaTotalList(col["uniqueID"])}/
                {getColumnMaxQuotaTotalList(col["uniqueID"])}
              </td>
            );
          })}
        <td className="cell">
          {currentColTotal}/{colTotal}
        </td>
      </tr>
    );
  };

  const getMaxQuotaList = (cellId, cellType) => {
    let maxQuotaList = [];
    let currentMaxQuotaList = [];

    tableData.data.map((el) => {
      if (el[cellType === "ROW" ? "row" : "column"] === cellId)
        maxQuotaList.push(el["maxQuota"]);
      currentMaxQuotaList.push(el["current"]);
    });

    return {
      maxQuotaList,
      currentMaxQuotaList,
    };
  };

  const quotaListSum = (prev, curr) => parseInt(prev) + parseInt(curr);

  const getRowMaxQuotaTotalList = (rowId) =>
    getMaxQuotaList(rowId, "ROW").maxQuotaList.reduce(quotaListSum);

  const getColumnMaxQuotaTotalList = (colId) =>
    getMaxQuotaList(colId, "COLUMN").maxQuotaList.reduce(quotaListSum);

  const getRowCurrentMaxQuotaTotalList = (rowId) =>
    getMaxQuotaList(rowId, "ROW").currentMaxQuotaList.reduce(quotaListSum);

  const getColumnCurrentMaxQuotaTotalList = (colId) =>
    getMaxQuotaList(colId, "COLUMN").currentMaxQuotaList.reduce(quotaListSum);

  const renderEditingBody = (table) => {
    return (
      tableData &&
      table.rowList &&
      table.rowList.map((el, elIndex) => {
        return (
          <tr>
            <td className="body-exceeded-left">
              {table.rowList[elIndex].text}
            </td>
            {getMaxQuotaList(el["uniqueID"], "ROW").maxQuotaList.map(
              (quota, index) => (
                <td className="cell">
                  {
                    getMaxQuotaList(el["uniqueID"], "ROW").currentMaxQuotaList[
                      index
                    ]
                  }
                  /{quota}
                </td>
              )
            )}
            <td className="cell">
              {getRowCurrentMaxQuotaTotalList(el["uniqueID"])}/
              {getRowMaxQuotaTotalList(el["uniqueID"])}
            </td>
          </tr>
        );
      })
    );
  };

  if (
    props.editingTableData.colList.length < 1 ||
    props.editingTableData.rowList.length < 1
  )
    return null;
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
