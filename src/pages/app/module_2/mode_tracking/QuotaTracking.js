//Packages
import React from "react";
import EditingTable from "../../../../components/app/EditingTable";
import { EDITING_TABLE_DATA, testTable } from "../../../../data/testing-data";
import { REFRESH } from "../assets/icons/IconConfig";
import { getQuotaTableTrackingMode } from "../utils/getTracking";

import XLSX from "xlsx";

import FileSaver from "file-saver";

//Styles
import "./styles/QuotaTracking.css";

const QuotaTracking = (props) => {
  const [tableSpread, setTableSpread] = React.useState({});
  const [quotaTable, setQuotaTable] = React.useState(null);
  const [convertedTable, setConvertedTable] = React.useState(null);

  const onChangeNav = (e) => {
    props.history.push(`/${e.target.value}`);
  };

  React.useEffect(() => {
    const projectId = localStorage.getItem("currentprojectid");

    getQuotaTableTrackingMode(projectId).then((table) => {
      console.log("fetched table", table);
      setQuotaTable(table);
    });
  }, []);

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

  const convertEditingTableStructure = (table) => {
    let newTable = [];

    const retrieveQuotaCount = (rowId, columnId) => {
      let quotaCount;

      for (let data in table.dataList) {
        for (let info in table.dataList[data]) {
          if (
            table.dataList[data][info]["rowID"] === rowId &&
            table.dataList[data][info]["columnID"] === columnId
          ) {
            quotaCount = table.dataList[data][info]["quotaCount"];
            break;
          }
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

      for (let j = 0; j < table.columnList.length; j++) {
        let tableColumn = table.columnList;
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
            const newTable = convertEditingTableStructure(EDITING_TABLE_DATA);

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
          </select>
        </div>
        <div className="quota-tracking--refresh-icon">
          <img src={REFRESH} />
        </div>
        <p>Last Update: 6:41AM Thu 14 May 2020</p>
      </div>
      <div>
        <EditingTable
          editingTableData={EDITING_TABLE_DATA}
          onRenderingHeader={true}
        />
      </div>
    </div>
  );
};

export default QuotaTracking;
