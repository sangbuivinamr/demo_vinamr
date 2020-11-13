//Packages
import React,{useState} from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import {IoIosArrowRoundDown} from "react-icons/io";
import {IoMdClose} from "react-icons/io";
import {IoIosSave} from "react-icons/io";
import {IoIosUndo} from "react-icons/io";
import {IoIosRedo} from "react-icons/io";
import {ImSigma} from "react-icons/im";
import QuotaLabelSelection from "./QuotaLabelSelection";
import QuotaRowColumnAdjustment from "./QuotaRowColumnAdjustment";
import EditingTable from "../../../../components/app/EditingTable";

//Styles
import "./styles/QuotaEditing.css";
/*  exceededLeft={ EXCEEDED_LAYOUT_LEFT}
                        exceededLeftHeader={QUOTA_OVERVIEW_DATA}
                        exceededLeftSex={EXCEEDED_SEX_LEFT}  */
//Data
import {QUOTA_LABEL_SELECTION_DATA, EDITING_TABLE_DATA} from "../../../../data/testing-data";

const QuotaEditing = (props)=>{
    const [quotaData, setQuotaData] = useState(QUOTA_LABEL_SELECTION_DATA);
    const [quotaInput, setQuotaInput] = useState({
        quota_index: null,
        quota_label: "",
        quota_expression: ""
    })
    const [quotaClickStatus, setQuotaClickStatus] = useState({
        quotaLabel: "", 
        status: false
    })
    const [editingtable,setEditingTable] = useState([{
        columnList: [],
        rowList: [],
        dataList: []
        }]
        )
    const [addedRow,setAddedRow] = useState([]);
    const [addedColumn,setAddedColumn] = useState([]);
    const onCheckingNotAnyHighlightedQuota = () => quotaClickStatus.quotaLabel === "" && quotaClickStatus.status === false;
    const onCheckingNotAnyInputtedQuota = () => quotaInput.quota_index === null && quotaInput.quota_label === "" && quotaInput.quota_expression === "";
    
    /**
     * @summary Swap the quota row in the table
     * @param {string} swapType The type of the swap: UP/ DOWN
     */
    // const onSwappingQuotaRow = (swapType) => {

    //     if(onCheckingNotAnyHighlightedQuota()) return;

    //     const currentQuotaData = [].concat(quotaData);
        
    //     let selectedQuotaIndex;

    //     // Finding the index of the highlighted quota row
    //     for(let quotaIndex = 0; quotaIndex < currentQuotaData.length; quotaIndex++){
    //         if(currentQuotaData[quotaIndex]["quota_label"] === quotaClickStatus.quotaLabel) selectedQuotaIndex = quotaIndex;
    //     }

    //     // Swapping
    //     const tempQuota = currentQuotaData[selectedQuotaIndex];
    //     if(swapType === "UP"){
    //         currentQuotaData[selectedQuotaIndex] = currentQuotaData[selectedQuotaIndex - 1]
    //         currentQuotaData[selectedQuotaIndex - 1] = tempQuota
    //     }else{
    //         currentQuotaData[selectedQuotaIndex] = currentQuotaData[selectedQuotaIndex + 1]
    //         currentQuotaData[selectedQuotaIndex + 1] = tempQuota
    //     }
        
    //     setQuotaData(currentQuotaData)
    // }

    /**
     * @summary Add a quota row to the table
     */
    const onAddingQuota = () => {

        // Check if the user has actually inputted a quota
        if(onCheckingNotAnyInputtedQuota()){
            alert("You haven't typed any quota")
            return;
        }

        let newQuotaData = quotaData.concat(quotaInput);

        setQuotaData(newQuotaData);

        // After we've added a quota, the input will be cleaned up
        setQuotaInput({
            quota_index: null,
            quota_label: "",
            quota_expression: ""
        })
    }

    /**
     * @summary Handle the input change for the label input in the quota table
     * @param {string} quota_label The label (aka value of the input at the label column)
     */
    const onAddingQuotaLabel = (quota_label) => {
        let newQuotaInput = {
            quota_index: quotaData.length,
            quota_label: quota_label,
            quota_expression: quotaInput.quota_expression
        };

        setQuotaInput(newQuotaInput)
        
    }
    /*
    */

    /**
     * @summary Make the selected (clicked) row to be highlighted
     * @param {string} quotaLabel The label of the current selected quota row
     */
    const onChoosingQuota = (quotaLabel) => {

        let newQuotaStatus = {
            quotaLabel: quotaLabel,
            status: true
        }
        setQuotaClickStatus(newQuotaStatus);
    }
 

    /**
     * @summary Delete the selected quota row in the table
     */
    const onDeletingQuota = () => {
        if(onCheckingNotAnyHighlightedQuota()){
            alert("Please indicate the quota you want to remove!")
            return;
        }
        let currentQuotaData = [];
        currentQuotaData = currentQuotaData.concat(quotaData);

        // Filter out the selected quota row
        let newQuotaData = currentQuotaData.filter(quota => quota.quota_label !== quotaClickStatus.quotaLabel)
        setQuotaData(newQuotaData);

    }


    const onChangeNavtoExpression=(e)=>{
          
        props.history.push(`/${e.target.value}`)
  
}

/** 
 * @summary This function is to check whether the label has been selected or not, having already added to row/columns or not
 *@param {string} takenQuotaLabel is the name of the selected quota
 * @return {boolean} false if the label is not valid, true if the label is valid 
 *  **/
const checkLabelValidity = (takenQuotaLabel) => {
    if (takenQuotaLabel==="") {
        alert("You haven't chosen any labels")
        return false;
    }
for( const table of editingtable)
    for(const column of table.columnList)
        if (takenQuotaLabel === column.text)
        {
            alert("You have already added to column this quota Label")
            return false;
        }
for( const table of editingtable)
    for(const row of table.rowList)
            if (takenQuotaLabel === row.text)
            {
                alert("You have already added to row this quota Label")
                return false;
            }   
    
return true;
}

/**  
* @summary handle add to row when clicked add to Row 
*/
const handleAddToRow = (quotaLabel) => {
    const {quotaLabel: takenQuotaLabel} = quotaLabel
    if (!checkLabelValidity(takenQuotaLabel)) {
        
        return;
    }
    const getUniqueID = getUniqueIDByPassingQuotaLabel(takenQuotaLabel); // This is just temporary
    
for( const table of editingtable)
    for(const row of table.rowList)
        if (takenQuotaLabel === row)
        {
            alert("You have already added to row this quota Label")
            return;
        }
        
        let tempArray = [].concat(addedRow);
        tempArray.push(takenQuotaLabel)
        setAddedRow(tempArray);
        let tempTable = editingtable;
        let indexOfTable = 0;
        tempTable[indexOfTable].rowList.push({text: takenQuotaLabel, uniqueID: getUniqueID })
        tempTable[indexOfTable].dataList.push([]);
        setEditingTable(tempTable)
        
}

console.log("Changed table", editingtable)

/**  
* @summary handle add to row when clicked add to Row 
*/
const handleAddToColumn = (quotaLabel) => {
    const {quotaLabel: takenQuotaLabel} = quotaLabel
    if (!checkLabelValidity(takenQuotaLabel)) {
        
        return;
    }
    const getUniqueID = getUniqueIDByPassingQuotaLabel(takenQuotaLabel);
        let tempArray = [].concat(addedColumn);
        tempArray.push(takenQuotaLabel)
        setAddedColumn(tempArray);
        let tempTable = editingtable;
        let indexOfTable = 0;
        tempTable[indexOfTable].columnList.push({text: takenQuotaLabel, uniqueID: getUniqueID })
        setEditingTable(tempTable)
        
}

/** 
@summary This function is just a temporary function. It is to return the id of the selected quota Label 
@param {string} quotaLabel The name of the selected quota Label
@return {string} the uniqueID of the label that is passed to the function
**/
const getUniqueIDByPassingQuotaLabel = (quotaLabel) => {
    for( const label of QUOTA_LABEL_SELECTION_DATA)
        {
            if (quotaLabel === label.quota_label)
          
        return label.uniqueID;
        }
}
/**
 * @summary This function is to return the quotaCount for the cell corresponding to the columnID and rowID by searching the whole dataList
 * @param {string} rowID  
 * @param {string} columnID
 * @return {number} quotaCount that corresponds to the columnID and rowID
 */
const getTheQuotaCorrespondingtoColIDAndRowID = (rowID, columnID) => {
    for (const row of EDITING_TABLE_DATA.dataList){
        for(const cell of row)
        {
         if(cell.rowID === rowID && cell.columnID === columnID)
         {
            return cell.quotaCount;
         }   
         else if ( cell.rowID === columnID && cell.columnID === rowID){
             return cell.quotaCount;
         }
        }
    }
      
}
/**
 * @summary This function is to update the DataList of {editingTable}
 */

 const updatingTheEditingTable = (props) => {
     const indexOfTable  = 0;
    let indexOfRow;
     let tempTable = props;
     let quotaCount;
    
      for ( const row of props[indexOfTable].rowList)
        for ( const column of props[indexOfTable].columnList)
        {
            quotaCount = getTheQuotaCorrespondingtoColIDAndRowID(row.uniqueID, column.uniqueID);
            if (typeof quotaCount === "undefined") quotaCount = 0; //Check 
            for (const subArray of props[indexOfTable].dataList){
                indexOfRow = tempTable[indexOfTable].dataList.indexOf(subArray);
            console.log("index of row ",indexOfRow)
            }
            tempTable[indexOfTable].dataList[indexOfRow].push({rowID: row.uniqueID, columnID: column.uniqueID, quotaCount: quotaCount })
        }
       
        console.log("Temp table",tempTable)    
    setEditingTable(tempTable);
    
 }
 const updateColumn = (quotaLabel) => {
    handleAddToColumn(quotaLabel);
    updatingTheEditingTable(editingtable)
}
const updateRow = (quotaLabel) => {
    handleAddToRow(quotaLabel);
    updatingTheEditingTable(editingtable)
}

    return(
        <div className="quota-page">
            <div className="quota-page default-bar">
                <h2 className="h2-default">QUOTA SETTINGS</h2>
                <div className="display--square--button">
                    <i><IoIosUndo className="up icon"/></i>
                </div>
                <div className="display--square--button">
                    <i><IoIosRedo className="up icon"/></i>
                </div>
           
                <div className="display--square--button">
                    <i><IoIosSave className="up icon"/></i>
                </div>
                <div className="mode">
                    Mode: 
                </div>
                <select className="select"onChange={onChangeNavtoExpression}>
                    <option
                        value=""
                    >
                        Expression
                    </option>
                    <option 
                        value="editing"
                    >
                        Editing
                    </option>
                    <option
                        value="exceeded"
                    >
                        When Exceeded 
                    </option>
                    <option 
                        value="tracking"
                    >
                        Tracking
                    </option>
                </select>
                <div className="expression-review">
                    <h2 className="review">
                        QUOTA LABEL <br/> SELECTION
                    </h2>
                    <button id ="quota--management--page--add--to-row--btn" onClick ={() =>updateRow(quotaClickStatus)} >
                    Add to <br/> Row
                    </button>
                   <button id ="quota--management--page--add--to-column--btn" onClick ={() => updateColumn(quotaClickStatus)}>
                    Add to <br/> Column
                   </button>
                </div>

            </div>
            <div id = "quota--management--page--editing-mode--content">
              
                
                <div id = "quota--display--added--table">
                    <EditingTable  
                     editingTableData={EDITING_TABLE_DATA}
                     ></EditingTable>
                </div>
                <div id ="quota--label--selection">
                 
                    <QuotaLabelSelection 
                        quotaData ={quotaData} 
                        onChoosingQuota={onChoosingQuota}
                        quotaClickStatus={quotaClickStatus}
                        setQuotaClickStatus={setQuotaClickStatus}/>
                </div>
                <div id= "quota--management--adjust--rows--cols">
                    <div id="quota--management--adjust--rows--cols--btn--div">
                        <div className="display--square--button">                
                            <IoIosArrowRoundUp className="up icon" />
                    
                    </div>
                        <div className="display--square--button">
                            <IoIosArrowRoundDown className="up icon"/>
                        
                        </div>
                        <div className="display--square--button">
                        
                            <IoMdClose className="up icon" />
                        
                        </div>
                        <div className="quota--management--add--total--cols-rows--btn">
                            <ImSigma className="sigma-icon" />
                            <text> Rows</text>
                        </div>
                        <div className="quota--management--add--total--cols-rows--btn">
                            <ImSigma className="sigma-icon" />
                            <text> Columns</text>
                        </div>
                    </div>
                    <QuotaRowColumnAdjustment rowData={addedRow} columnData={addedColumn} />
              
                </div>
            </div>
               
        </div>
    );
};

export default QuotaEditing;