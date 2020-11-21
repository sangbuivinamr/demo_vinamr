//Packages
import React from "react";
import EditingTable from "../../../../components/app/EditingTable";
import { EDITING_TABLE_DATA, testTable } from "../../../../data/testing-data";

import '@grapecity/spread-sheets-react';
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";
import { SpreadSheets, Worksheet } from '@grapecity/spread-sheets-react';

import spreadExcel from "@grapecity/spread-excelio";

import GC from '@grapecity/spread-sheets';

import XLSX from 'xlsx';

import FileSaver from 'file-saver';

//Styles
import "./styles/QuotaTracking.css";

import {REFRESH} from '../assets/icons/IconConfig'

const SpreadJSKey = "W532000-J5-599135-06-65F23OF";
GC.Spread.Sheets.LicenseKey = SpreadJSKey;

const QuotaTracking = (props) => {

  const [tableSpread, setTableSpread] = React.useState({});

  const [convertedTable, setConvertedTable] = React.useState(null);

  const onChangeNav = (e) => {
    props.history.push(`/${e.target.value}`);
  };

  React.useEffect(() => convertEditingTableStructure(EDITING_TABLE_DATA), [])

  const onExport = (table) => {
    let workbook = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));
    let excelIO = new spreadExcel.IO();
    let fileName = "alo";
    if (fileName.substr(-5, 5) !== '.xlsx') {
        fileName += '.xlsx';
    }
    var json = JSON.stringify(tableSpread.toJSON());
    excelIO.save(json, (blob) => {
        FileSaver.saveAs(blob, fileName);
    }, (e) => {
        console.log(e);
    });
  }

  const workbookInit = (spread) => {
    setTableSpread(spread)
  }

  const exportToCSV = (csvData, fileName, fileExtension) => {

    console.log('csvfile', csvData)

    const ws = XLSX.utils.json_to_sheet(csvData);
    console.log('worksheet', ws);

    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }; console.log('workbook', wb);

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' }); console.log('excelBuffer', excelBuffer);

    const data = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"}); console.log('data', data);
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  const convertEditingTableStructure = (table) => {
    let newTable = [];

    const retrieveQuotaCount = (rowId, columnId) => {
    
      let quotaCount;
      
      for(let data in table.dataList){

        for(let info in table.dataList[data]){
          if(table.dataList[data][info]["rowID"] === rowId && table.dataList[data][info]["columnID"] === columnId){
            quotaCount = table.dataList[data][info]["quotaCount"];
            break;
          }
        }
      }

      return quotaCount;
    }

    for(let i = 0; i < table.rowList.length; i++){
      let rowList = table.rowList;
      let tableRow = {};
      let rowTitleId = "";

      // Retrieve the rowID of the title
      tableRow[""] = rowList[i]["text"];
      rowTitleId = rowList[i]["uniqueID"];

      for(let j = 0; j < table.columnList.length; j++){
        let tableColumn = table.columnList;
        let columnTitleId = tableColumn[j]["uniqueID"];
        tableRow[`${tableColumn[j]["text"]}`] = retrieveQuotaCount(rowTitleId, columnTitleId);
      }

      newTable.push(tableRow);

    }

    setConvertedTable(newTable);

  }

  return (
    <div className="quota-tracking--container">
      <div>
        <h2 className="quota-tracking--header">QUOTA SETTINGS</h2>
        <button id="ss" onClick={() => exportToCSV(convertedTable, "bitch", "xlsx")}>Export quota</button>
        <div className="quota-tracking--selection">
          <p className="quota-tracking--selection__mode">Mode:</p>
          <select className="quota-tracking--selection__select" onChange={onChangeNav}>
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
        {/* <SpreadSheets hostStyle={{width: '1100px', height: '800px'}} workbookInitialized={workbookInit}  >
            <Worksheet>
            </Worksheet>
        </SpreadSheets> */}
      </div>
    </div>
  );
};

export default QuotaTracking;
