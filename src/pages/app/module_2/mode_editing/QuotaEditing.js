//Packages
import React,{useState} from "react";

import {IoMdClose, IoIosSave, IoIosUndo, IoIosRedo, IoIosArrowRoundDown, IoIosArrowRoundUp} from "react-icons/io";
import {ImSigma} from "react-icons/im";

import QuotaLabelSelection from "./QuotaLabelSelection";
import QuotaRowColumnAdjustment from "./QuotaRowColumnAdjustment";
import EditingTable from "../../../../components/app/EditingTable";

//Styles
import "./styles/QuotaEditing.css";
/*  exceededLeft={ EXCEEDED_LAYOUT_LEFT}
    exceededLeftHeader={QUOTA_OVERVIEW_DATA}
    exceededLeftSex={EXCEEDED_SEX_LEFT}  
*/
// Data
import {QUOTA_LABEL_SELECTION_DATA, EDITING_TABLE_DATA} from "../../../../data/testing-data";
import { QUOTA_MOVING_DIRECTION, TABLE_TYPE } from "./config";

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
    const [chosenRowStatus, setChosenRowStatus] = useState({
        text: "",
        uniqueID: ""
    })
    const [chosenColumnStatus, setChosenColumnStatus] = useState({
        text: "",
        uniqueID: ""
    })

    const onCheckingNotAnyHighlightedQuota = () => quotaClickStatus.quotaLabel === "" && quotaClickStatus.status === false;
    const onCheckingNotAnyInputtedQuota = () => quotaInput.quota_index === null && quotaInput.quota_label === "" && quotaInput.quota_expression === "";
    
    console.log('addedRows', addedRow);
    console.log('addedCaddedColumns',addedColumn);

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
    * @param {string} takenQuotaLabel is the name of the selected quota
    * @return {boolean} false if the label is not valid, true if the label is valid 
    *  
    **/
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
    * @summary This function is a temporary function. It is to return the id of the selected quota Label 
    * @param {string} quotaLabel The name of the selected quota Label
    * @return {string} the uniqueID of the label that is passed to the function
    */
    const getUniqueIDByPassingQuotaLabel = (quotaLabel) => {
        for( const label of QUOTA_LABEL_SELECTION_DATA)
            {
                if (quotaLabel === label.quota_label)
            
            return label.uniqueID;
            }
    }

    const onChoosingRow = (rowData) => {
        console.log('row data', rowData);
        setChosenRowStatus(rowData);
    }
    
    const onChoosingColumn = (colData) => {
        console.log('col data', colData);
        setChosenColumnStatus(colData)
    }

    const getCurrentEditingTable = (tableType) => tableType === TABLE_TYPE.ROW ?  [].concat(editingtable[0].rowList) : [].concat(editingtable[0].columnList);
    const getChosenRowColumnStatus = (tableType) => tableType === TABLE_TYPE.ROW ? chosenRowStatus : TABLE_TYPE.COLUMN ? chosenColumnStatus : "";

    const isChosenRowStatus = () => chosenRowStatus.text !== "" && chosenRowStatus.uniqueID !== "" && chosenColumnStatus.text === "" && chosenColumnStatus.uniqueID === "";
    const isChosenColumnStatus = () => chosenColumnStatus.text !== "" && chosenColumnStatus.uniqueID !== "" && chosenRowStatus.text === "" && chosenRowStatus.uniqueID === "";

    const getCurrentTableType = () => isChosenRowStatus() ? TABLE_TYPE.ROW : isChosenColumnStatus() ? TABLE_TYPE.COLUMN : "";

    /**
     * @summary Reset the initial clicked row/ column in the total section
     */
    const onResetChosenRowColumnStatus = () => {
        let initialChosenRowColumnStatus = {
            text: "",
            uniqueID: ""
        };
        setChosenColumnStatus(initialChosenRowColumnStatus);
        setChosenRowStatus(initialChosenRowColumnStatus);
    }

    /**
     * @summary Check if the move is valid
     * @param {number} index The index of the quota label
     * @param {string} dir The direction of the move
     * @param {number} tableLength The length of the table (rowList/ columnList)
     * @returns {boolean}
     */
    const isMovingQuotaLabelValid = (index, dir, tableLength) => (index === 0 && dir === QUOTA_MOVING_DIRECTION.UP) || (index === tableLength - 1 && dir === QUOTA_MOVING_DIRECTION.DOWN) || index === -1 || tableLength <= 1

    const onDeletingSelectedQuotaLabel = () => {
        // Type of clicked total board (the row or column section)
        const tableType = getCurrentTableType();

        // Get the clicked row/ column quota label array
        const quotaLabelId = getChosenRowColumnStatus(tableType);

        if(tableType === "" || quotaLabelId === "") return;

        // Get the current quota label array, which depends on the tableType. If tableType is Row, we'll get the rowList property of the editingTable, etc...
        const currentChosenEditingList = getCurrentEditingTable(tableType);

        const newChosenEditingList = currentChosenEditingList.filter(el => el !== quotaLabelId);

        const newEditingTable = [].concat(editingtable)

        if(tableType === TABLE_TYPE.ROW){
            newEditingTable[0].rowList = newChosenEditingList;
        }else if(tableType === TABLE_TYPE.COLUMN){
            newEditingTable[0].columnList = newChosenEditingList
        }

        setEditingTable(newEditingTable);
        onResetChosenRowColumnStatus();

    }

    /**
     * @summary Move the quota label in the total area up/ down
     * @param {string} direction The direction of the move (UP or DOWN)
     */
    const onMovingSelectedLabelUpDown = (direction) => {

        // Type of clicked total board (the row or column section)
        const tableType = getCurrentTableType();

        // Get the clicked row/ column quota label array
        const quotaLabelId = getChosenRowColumnStatus(tableType);

        // Get the current quota label array, which depends on the tableType. If tableType is Row, we'll get the rowList property of the editingTable, etc...
        const currentChosenEditingList = getCurrentEditingTable(tableType)
        // Get the index of the clicked row/ column quota label
        const selectedQuotaIndex = currentChosenEditingList.indexOf(quotaLabelId);
        
        // Check if the move is valid
        if(isMovingQuotaLabelValid(selectedQuotaIndex, direction, currentChosenEditingList.length)){
            onResetChosenRowColumnStatus();
            return;
        }

        // Get the index of the DESIRED quota label to shift
        const selectedQuotaToShiftIndex = direction === QUOTA_MOVING_DIRECTION.UP ? selectedQuotaIndex - 1 : selectedQuotaIndex + 1;

        // Swap the labels
        [
            currentChosenEditingList[selectedQuotaIndex], 
            currentChosenEditingList[selectedQuotaToShiftIndex]
        ] = [
            currentChosenEditingList[selectedQuotaToShiftIndex], 
            currentChosenEditingList[selectedQuotaIndex]
        ];

        // Set state for the new table
        const currentEditingTableFull = [].concat(editingtable);

        if(tableType === TABLE_TYPE.ROW){
            currentEditingTableFull[0].rowList = currentChosenEditingList;
        }else if(tableType === TABLE_TYPE.COLUMN){
            currentEditingTableFull[0].columnList = currentChosenEditingList
        }

        setEditingTable(currentEditingTableFull);
        onResetChosenRowColumnStatus();

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
       return 0; 
    }
    /**
     * @summary This function is to update the DataList of {editingTable}
     */

    const updatingTheEditingTable = (props) => {
        const indexOfTable  = 0;
        let indexOfRow, indexOfColumn;
        let tempTable = props;
        let quotaCount;
        
        for ( const row of props[indexOfTable].rowList)
        for ( const column of props[indexOfTable].columnList)
        {
            quotaCount = getTheQuotaCorrespondingtoColIDAndRowID(row.uniqueID, column.uniqueID);
       
            // for (const subArray of props[indexOfTable].dataList){
                indexOfRow = tempTable[indexOfTable].rowList.indexOf(row);
                indexOfColumn = tempTable[indexOfTable].columnList.indexOf(column);
            console.log("index of row ",indexOfRow)
            // }
            tempTable[indexOfTable].dataList[indexOfRow].splice(indexOfColumn, 1,{rowID: row.uniqueID, columnID: column.uniqueID, quotaCount: quotaCount })
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
                     editingTableData={editingtable[0]}
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
                            <IoIosArrowRoundUp onClick={() => onMovingSelectedLabelUpDown(QUOTA_MOVING_DIRECTION.UP)} className="up icon" />
                    
                    </div>
                        <div className="display--square--button">
                            <IoIosArrowRoundDown onClick={() => onMovingSelectedLabelUpDown(QUOTA_MOVING_DIRECTION.DOWN)} className="up icon"/>
                        
                        </div>
                        <div className="display--square--button">
                        
                            <IoMdClose onClick={onDeletingSelectedQuotaLabel} className="up icon" />
                        
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
                    <QuotaRowColumnAdjustment 
                        rowData={editingtable[0]['rowList']} 
                        columnData={editingtable[0]['columnList']} 
                        onChoosingColumn={(col) => onChoosingColumn(col)}
                        onChoosingRow={(row) => onChoosingRow(row)}
                        chosenRowStatus={chosenRowStatus}
                        chosenColumnStatus={chosenColumnStatus}
                    />
              
                </div>
            </div>
               
        </div>
    );
};

export default QuotaEditing;