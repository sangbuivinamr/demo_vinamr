//Packages
import React, { useState } from "react";
import EditingTableTracking from "../../../../components/app/EditingTableTracking";
import { EDITING_TABLE_DATA, testTable } from "../../../../data/testing-data";
import { REFRESH } from "../assets/icons/IconConfig";
import { getQuotaTableTrackingMode } from "../utils/getTracking";

import XLSX from "xlsx";

import FileSaver from "file-saver";

//Styles
import "./styles/QuotaTracking.css";

/**
 * @summary Render the tracking mode of module 2
 * @param {object} props JSX Props
 */
const QuotaTracking = (props) => {
  const [tableSpread, setTableSpread] = React.useState({});
  const [quotaTable, setQuotaTable] = React.useState(null);
  const [convertedTable, setConvertedTable] = React.useState(null);
  const [fetchedQuotaTable, setFetchedQuotaTable] = useState(false);

  /**
   * @summary Navigate modes of module 2
   * @param {object} e
   */
  const onChangeNav = (e) => {
    props.history.push(`/${e.target.value}`);
  };

  /**
   * @summary A callback used to fetch the quota table
   */
  const getQuotaTable = React.useCallback(() => {
    const projectId = localStorage.getItem("currentprojectid");
    getQuotaTableTrackingMode(projectId).then((table) => {
      if(Object.keys(table.data).includes('error')) return;
      setQuotaTable(table.data);
      setFetchedQuotaTable(true);
    });
  }, [quotaTable]);

  React.useEffect(() => getQuotaTable(), []);

  /**
   * @summary Export the table object to a CSV file
   * @param {object} csvData The table needed to be exported
   * @param {string} fileName The name of the file we want to save
   * @param {string} fileExtension Extension of the file
   */
  const exportToCSV = (csvData, fileName, fileExtension) => {
    const ws = XLSX.utils.json_to_sheet(csvData);

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const data = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    FileSaver.saveAs(data, fileName + fileExtension);
  };

  /**
   * @summary Convert the current table structure into a proper one for Excel requirements
   * @param {object} table The table needed to be converted
   * @returns {object} A new converted table which will be used for CSV exporting
   */
  const convertEditingTableStructure = (table) => {
    let newTable = [];

    /**
     * @summary Retrieve the quotaCount in the table based on the ids of a row and a column
     * @param {string} rowId Id of the row
     * @param {string} columnId Id of the column
     * @returns {number} The quotaCount of the row and corresponding column
     */
    const retrieveQuotaCount = (rowId, columnId) => {
      let quotaCount;

      for (let data in table.data) {
        if (
          table.data[data]["row"] === rowId &&
          table.data[data]["column"] === columnId
        ) {
          quotaCount = table.data[data]["maxQuota"];
          break;
        }
      }

      return quotaCount;
    };

    for (let i = 0; i < table.rowList.length; i++) {
      let rowList = table.rowList;
      let tableRow = {};
      let rowTitleId = "";

      // Retrieve the rowID of the title
      tableRow[""] = rowList[i]["text"];
      rowTitleId = rowList[i]["uniqueID"];

      for (let j = 0; j < table.colList.length; j++) {
        let tableColumn = table.colList;
        let columnTitleId = tableColumn[j]["uniqueID"];
        tableRow[`${tableColumn[j]["text"]}`] = retrieveQuotaCount(
          rowTitleId,
          columnTitleId
        );
      }

      newTable.push(tableRow);
    }

    return newTable;
  };

  return (
    <div className="quota-tracking--container">
      <div>
        <h2 className="quota-tracking--header">QUOTA SETTINGS</h2>
        <button
          id="ss"
          onClick={() => {
            const newTable = convertEditingTableStructure(quotaTable);

            exportToCSV(newTable);
          }}
        >
          Export quota
        </button>
        <div className="quota-tracking--selection">
          <p className="quota-tracking--selection__mode">Mode:</p>
          <select
            className="quota-tracking--selection__select"
            onChange={onChangeNav}
          >
            <option value="">Expression</option>
            <option value="editing">Editing</option>
            <option value="exceeded">When Exceeded</option>
            <option value="tracking">Tracking</option>
            <option value = 'interview'>Interview Preview</option>
          </select>
        </div>
        <img
          className="quota-tracking--refresh-icon"
          src={REFRESH}
          onClick={getQuotaTable}
        />
        <p className="quota-tracking--update-date">
          Last Update: 6:41AM Thu 14 May 2020
        </p>
      </div>
      <div>
        {fetchedQuotaTable && quotaTable && (
          <EditingTableTracking
            editingTableData={quotaTable}
            onRenderingHeader={true}
          />
        )}
      </div>
    </div>
  );
};

export default QuotaTracking;
