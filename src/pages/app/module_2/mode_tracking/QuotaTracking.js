//Packages
import React from "react";
import EditingTable from "../../../../components/app/EditingTable";
import { EDITING_TABLE_DATA } from "../../../../data/testing-data";

import '@grapecity/spread-sheets-react';
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";
import { SpreadSheets, Worksheet } from '@grapecity/spread-sheets-react';

import spreadExcel from "@grapecity/spread-excelio";

import GC from '@grapecity/spread-sheets';

import { saveAs } from 'file-saver';

//Styles
import "./styles/QuotaTracking.css";

const SpreadJSKey = "W532000-J5-599135-06-65F23OF";
GC.Spread.Sheets.LicenseKey = SpreadJSKey;

const QuotaTracking = (props) => {

  const [tableSpread, setTableSpread] = React.useState({});

  const onChangeNav = (e) => {
    props.history.push(`/${e.target.value}`);
  };

  // const onExportQuota = (table) => {

  //   const spread = tableSpread;
  //   const fileName = "SalesData.xlsx";
  //   const excelIO = new ExcelIO.Spread.Excel.IO();
  //   const json = JSON.stringify(spread.toJSON({ 
  //       includeBindingSource: true,
  //       columnHeadersAsFrozenRows: true,
  //   }));
  //   excelIO.save(json, (blob) => {
  //       saveAs(blob, fileName);
  //   }, function (e) {  
  //       alert(e);  
  //   });    

  // }


  // function workbookInit(spread) {
  //   setTableSpread(spread)
  // }

  // function handleValueChanged(e, obj) {
  //   valueChangedCallback(obj.sheet.getDataSource());
  // }


  const onExport = (table) => {
    let workbook = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));
    let excelIO = new spreadExcel.IO();
    let fileName = "alo";
    if (fileName.substr(-5, 5) !== '.xlsx') {
        fileName += '.xlsx';
    }
    var json = JSON.stringify(tableSpread.toJSON());
    excelIO.save(json, (blob) => {
        saveAs(blob, fileName);
    }, (e) => {
        console.log(e);
    });
  }

  const workbookInit = (spread) => {
    setTableSpread(spread)
  }

  return (
    <div className="quota-tracking--container">
      <div>
        <h2 className="quota-tracking--header">QUOTA SETTINGS</h2>
        <button id="ss" onClick={() => onExport(EDITING_TABLE_DATA)}>Export quota</button>
        <div className="quota-tracking--selection">
          <p className="quota-tracking--selection__mode">Mode:</p>
          <select className="quota-tracking--selection__select" onChange={onChangeNav}>
            <option value="">Expression</option>
            <option value="editing">Editing</option>
            <option value="exceeded">When Exceeded</option>
            <option value="tracking">Tracking</option>
          </select>
        </div>
      </div>
      <div>
        <EditingTable
          editingTableData={EDITING_TABLE_DATA}
          onRenderingHeader={true}
        />
        <SpreadSheets hostStyle={{width: '1100px', height: '800px'}} workbookInitialized={workbookInit}  >
            <Worksheet>
            </Worksheet>
        </SpreadSheets>
      </div>
    </div>
  );
};

export default QuotaTracking;
