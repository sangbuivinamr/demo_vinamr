import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

 const ExportToCSV = (csvData) => {
    console.log("ExportToCSV", csvData)
     if(csvData === undefined || csvData.length === 0 ) {
        alert("Cannot export empty data")    
         return;
     }
       /**
   * @summary Get current date and time
   */
    const getCurrentDate = () => {
        let  today = new Date();
        //Add '0' to the year/date then get the 2 last char by using String.slice() method 
        let date = today.getFullYear() + ('0'+today.getMonth()+1).slice(-2) + ('0'+today.getDate()).slice(-2);  
        let time = ('0' +today.getHours()).slice(-2)+('0'+today.getMinutes()).slice(-2);
       
        return date+'_'+time;
          }


    const fileName = `${csvData[0].projectid}_All Data_${getCurrentDate()}`;
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
}
export default ExportToCSV;