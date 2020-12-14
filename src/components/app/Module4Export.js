import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

 const Module4Export = (csvData,exportTypes) => {
    console.log("Module4Export", csvData)
    console.log("Module4Export - type",exportTypes)
    let exportData = JSON.parse(JSON.stringify(csvData)) // parse and stringify to deep copy csvData
     if(exportData === undefined || exportData.length === 0 ) {
        alert("Cannot export empty data")    
         return;
     }
     /**
      * @summary Filter the data to export 
      */
     const filterCsvData = () =>{
      let tempArray =[]
      //"Quota Counted Interviews"  "Cancelled Interviews"  "Not Completed Interviews"
      for(const exType of exportTypes)
      {
        switch(exType){
          case "All data":
            tempArray = [].concat(exportData)
            break;
          case "Quota Counted Interviews":
            const quotaTemp = exportData.filter(element => element.complete === "Completed" && element.interviewStatus !=="Cancel")
            for(const data of quotaTemp)
            tempArray.push(data)
            break;
          case "Cancelled Interviews":
            const cancelledTemp = exportData.filter(element => element.interviewStatus === "Cancel")
            for(const data of cancelledTemp)
            tempArray.push(data)
            break;
          case "Not Completed Interviews":
            const notCompletedTemp= exportData.filter(element => element.complete === "Not Completed" )
            for(const data of notCompletedTemp)
            tempArray.push(data)
        }
     
      }
      exportData = tempArray
     console.log("filtered tempArray",tempArray)
      for( const row of exportData){
         //Unify all the props {interviewStatus, status, step,type} into {status} only to render     
         row.status = row.interviewStatus + " - " + row.status + " - " + row.step + " - " + row.type;
         delete row.interviewStatus;
         delete row.step;
         delete row.type;
      }
      
   
     }
     filterCsvData();
       /**
   * @summary Get current date and times
   */
    const getCurrentDate = () => {
        let  today = new Date();
        //Add '0' to the year/date then get the 2 last char by using String.slice() method 
        let date = today.getFullYear() + ('0'+today.getMonth()+1).slice(-2) + ('0'+today.getDate()).slice(-2);  
        let time = ('0' +today.getHours()).slice(-2)+('0'+today.getMinutes()).slice(-2);
       
        return date+'_'+time;
          }
    let dataName =""
    for (const type of exportTypes){
      dataName += ""+ type+"_";
    }
    const fileName = `${exportData[0].projectid}_${dataName}_${getCurrentDate()}`;
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
}
export default Module4Export;