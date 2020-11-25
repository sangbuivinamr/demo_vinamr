//Packages
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IoMdClose,
  IoIosSave,
  IoIosUndo,
  IoIosRedo,
  IoIosArrowRoundDown,
  IoIosArrowRoundUp,
} from "react-icons/io";
import { ImSigma } from "react-icons/im";

import QuotaLabelSelection from "./QuotaLabelSelection";
import QuotaRowColumnAdjustment from "./QuotaRowColumnAdjustment";
import EditingTable from "../../../../components/app/EditingTable";

//Styles
import "./styles/QuotaEditing.css";

// Data
import {
  QUOTA_LABEL_SELECTION_DATA,
  EDITING_TABLE_DATA,
} from "../../../../data/testing-data";
import {
  QUOTA_MOVING_DIRECTION,
  TABLE_TYPE,
  QUOTA_EDITING_TABLE,
} from "./config";

const QuotaEditing = (props) => {
  const PROJECT_ID = "0560";
  const [quotaData, setQuotaData] = useState(QUOTA_LABEL_SELECTION_DATA);

  const [quotaClickStatus, setQuotaClickStatus] = useState({
    quotaLabel: "",
    status: false,
  });

  //This is the state of editing table
  const [editingtable, setEditingTable] = useState([
    {
      columnList: [],
      rowList: [],
      dataList: [],
    },
  ]);
  const [addedRow, setAddedRow] = useState([]);
  const [addedColumn, setAddedColumn] = useState([]);
  const [chosenRowStatus, setChosenRowStatus] = useState({
    text: "",
    uniqueID: "",
  });
  const [chosenColumnStatus, setChosenColumnStatus] = useState({
    text: "",
    uniqueID: "",
  });

  const [totalRows, setTotalRows] = useState([]); //This state is to deal with break row feature
  const [currentIndexTotalRows, setCurrentIndexTotalRows] = useState(-1);
  const [totalColumns, setToTalColumns] = useState([]); //This state is to deal with break column feature
  const [currentIndexTotalColumns, setCurrentIndexTotalColumns] = useState(-1);
  const [tempData, setTempData] = useState([
    {
      columnList: [],
      rowList: [],
      dataList: [],
    },
  ]);

  const [undoQuotaStack, setUndoQuotaStack] = useState([]);
  const [redoQuotaStack, setRedoQuotaStack] = useState([]);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  console.log(
    "editing table at the beginning of the rendering",
    editingtable[0]
  ); //NEED DELETING
  console.log("Total Row", totalRows);
  console.log("Total column", totalColumns);

  const getDataFromBE = async (projectId) => {
    const response = await axios.get(
      QUOTA_EDITING_TABLE + `?projectId=${projectId}`
    );
    setTempData(response.data);
    setTempData([
      {
        columnList: EDITING_TABLE_DATA.columnList,
        rowList: EDITING_TABLE_DATA.rowList,
        dataList: EDITING_TABLE_DATA.dataList,
      },
    ]);

    //     // const result = await axios.post([ip] , {JSON});
  };
  const postDataToBE = async () => {
    const post = await axios
      .post(QUOTA_EDITING_TABLE + `?projectId=${PROJECT_ID}`, tempData)
      .then((res) => console.log(res));
    console.log("post successfully");
  };

  useEffect(() => {
    getDataFromBE(PROJECT_ID);
  }, []);

  console.log("TempData", tempData);
  /**
   * @sumary This function is to generate universally unique id for the Total Row/Columns
   *  */
  const generate_uuid = () => {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  };
  /**
   * @sumnary This function is to check whether the id is of the Total Row
   */
  const isUniqueIdOfTotalRow = (uniqueID) => {
    for (const totalRow of totalRows) {
      if (uniqueID === totalRow.uniqueID) return true;
    }
    return false;
  };
  /**
   * @summary This function is to check whether the id is of the Total Column
   * @param {String} totalRow
   */
  const isUniqueIdOfTotalColumn = (uniqueID) => {
    for (const totalColumn of totalColumns) {
      if (uniqueID === totalColumn.uniqueID) return true;
    }
    return false;
  };

  /**
   *
   * */
  const getValue = (row, col) => {
    let index_i, index_j;
    for (let i = 0; i < tempData[0].dataList.length; i++)
      for (let j = 0; j < tempData[0].dataList[i].length; j++) {
        let currentData = tempData[0].dataList[i][j];
        if (currentData.columnID === col && currentData.rowID === row) {
          index_i = i;
          index_j = j;
          break;
        }
      }
    return tempData[0].dataList[index_i][index_j].maxQuota;
  };
  const changeValue = (row, col, val) => {
    let index_i, index_j;
    for (let i = 0; i < tempData[0].dataList.length; i++)
      for (let j = 0; j < tempData[0].dataList[i].length; j++) {
        let currentData = tempData[0].dataList[i][j];
        if (currentData.columnID === col && currentData.rowID === row) {
          index_i = i;
          index_j = j;
          break;
        }
      }
    console.log("Quota Editing  - val ", val);
    val = val === "" ? 0 : val;
    //Handle val is NaN

    val = parseInt(val, 10);
    let newData = [].concat(tempData);
    newData[0].dataList[index_i][index_j].maxQuota = val;
    setTempData(newData);
    forceUpdate();
  };
  /**
   * @summary Make the selected (clicked) row to be highlighted
   * @param {string} quotaLabel The label of the current selected quota row
   */
  const onChoosingQuota = (quotaLabel) => {
    let newQuotaStatus = {
      quotaLabel: quotaLabel,
      status: true,
    };
    setQuotaClickStatus(newQuotaStatus);
  };

  const onChangeNavtoExpression = (e) => {
    props.history.push(`/${e.target.value}`);
  };
  /**
   * @summary This function is to check whether the label has been selected or not, having already added to row/columns or not
   * @param {string} takenQuotaLabel is the name of the selected quota
   * @return {boolean} false if the label is not valid, true if the label is valid
   *
   **/
  const checkLabelValidity = (takenQuotaLabel) => {
    //Check the Label is selected or not
    if (takenQuotaLabel === "") {
      alert("You haven't chosen any labels");
      return false;
    }
    //The nested for loop is to check whether the label has already added or not. If the label is already added, return FALSE
    for (const table of editingtable) //NEED DELETING
      for (const column of table.columnList)
        if (takenQuotaLabel === column.text) {
          alert("You have already added to column this quota Label");
          return false;
        }
    for (const table of editingtable) //NEED DELETING
      for (const row of table.rowList)
        if (takenQuotaLabel === row.text) {
          alert("You have already added to row this quota Label");
          return false;
        }
    //Returning TRUE as the label has not been added and is not added
    return true;
  };

  /**
   * @summary handle add to row when clicked add to Row
   */
  const handleAddToRow = (quotaLabel) => {
    console.log("Editing table in handleAd  dToRow", editingtable[0]); //NEED DELETING

    const { quotaLabel: takenQuotaLabel } = quotaLabel;
    if (!checkLabelValidity(takenQuotaLabel)) {
      return;
    }
    const getUniqueID = getUniqueIDByPassingQuotaLabel(takenQuotaLabel); // This is just temporary

    if (totalRows.length === 0) {
      alert("You  haven't chosen any the Sigma Total Row");
      return;
    }
    for (const table of editingtable) /// //NEED DELETING
      for (const row of table.rowList)
        if (takenQuotaLabel === row) {
          alert("You have already added to row this quota Label");
          return;
        }
    //This is to deal with break rows
    let tempTotalRows = [].concat(totalRows);
    //the second parameter "-1" of splice method means that it will insert at the position of the second last element
    tempTotalRows[currentIndexTotalRows].rowList.splice(-1, 0, {
      text: takenQuotaLabel,
      uniqueID: getUniqueID,
    });
    // setTotalRows(tempTotalRows)

    //This is to deal with the addedRow (unneccesary)
    let tempArray = [].concat(addedRow);
    tempArray.push(takenQuotaLabel);
    setAddedRow(tempArray);
    //This is to deal with the dataList of editing Table
    let tempTable = [].concat(editingtable); //NEED DELETING
    let indexOfTable = 0;
    tempTable[indexOfTable].rowList = [];
    tempTotalRows.map((totalRow) => {
      totalRow.rowList.map(
        (
          row // row of the rowList
        ) => {
          tempTable[indexOfTable].rowList.push(row);
          tempTable[indexOfTable].dataList.push([]);
        }
      );
    });
    onChangeEditingTable(tempTable);
  };

  /**
   * @summary handle add to row when clicked add to Row
   */
  const handleAddToColumn = (quotaLabel) => {
    const { quotaLabel: takenQuotaLabel } = quotaLabel;
    if (totalColumns.length === 0) {
      alert("You  haven't chosen any the Sigma Total Column");
      return;
    }
    if (!checkLabelValidity(takenQuotaLabel)) {
      return;
    }

    const getUniqueID = getUniqueIDByPassingQuotaLabel(takenQuotaLabel);
    let tempArray = [].concat(addedColumn);
    tempArray.push(takenQuotaLabel);
    setAddedColumn(tempArray);

    let tempTotalColumns = [].concat(totalColumns);
    tempTotalColumns[currentIndexTotalColumns].columnList.splice(-1, 0, {
      text: takenQuotaLabel,
      uniqueID: getUniqueID,
    });
    setToTalColumns(tempTotalColumns);

    let tempTable = [].concat(editingtable); //NEED DELETING
    let indexOfTable = 0;
    tempTable[indexOfTable].columnList = []; //Empty the columnList array to add to column from the beginning
    tempTotalColumns.map((totalColumn) => {
      totalColumn.columnList.map((col) => {
        tempTable[indexOfTable].columnList.push(col);
      });
    });
    console.log("QuotaEditing.js - handleAddToColumn - tempTable", tempTable);
    onChangeEditingTable(tempTable);
    return true;
  };

  /**
   * @summary This function is a temporary function. It is to return the id of the selected quota Label
   * @param {string} quotaLabel The name of the selected quota Label
   * @return {string} the uniqueID of the label that is passed to the function
   */
  const getUniqueIDByPassingQuotaLabel = (quotaLabel) => {
    for (const label of QUOTA_LABEL_SELECTION_DATA) {
      if (quotaLabel === label.quota_label) return label.uniqueID;
    }
  };

  const onChoosingRow = (rowData) => {
    setChosenRowStatus(rowData);
  };

  const onChoosingColumn = (colData) => {
    setChosenColumnStatus(colData);
  };

  const getCurrentEditingTable = (tableType) =>
    tableType === TABLE_TYPE.ROW
      ? [].concat(editingtable[0].rowList)
      : [].concat(editingtable[0].columnList); //NEED DELETING
  const getChosenRowColumnStatus = (tableType) =>
    tableType === TABLE_TYPE.ROW
      ? chosenRowStatus
      : TABLE_TYPE.COLUMN
      ? chosenColumnStatus
      : "";

  const isChosenRowStatus = () =>
    chosenRowStatus.text !== "" &&
    chosenRowStatus.uniqueID !== "" &&
    chosenColumnStatus.text === "" &&
    chosenColumnStatus.uniqueID === "";
  const isChosenColumnStatus = () =>
    chosenColumnStatus.text !== "" &&
    chosenColumnStatus.uniqueID !== "" &&
    chosenRowStatus.text === "" &&
    chosenRowStatus.uniqueID === "";

  const getCurrentTableType = () =>
    isChosenRowStatus()
      ? TABLE_TYPE.ROW
      : isChosenColumnStatus()
      ? TABLE_TYPE.COLUMN
      : "";

  /**
   * @summary Reset the initial clicked row/ column in the total section
   */
  const onResetChosenRowColumnStatus = () => {
    let initialChosenRowColumnStatus = {
      text: "",
      uniqueID: "",
    };
    setChosenColumnStatus(initialChosenRowColumnStatus);
    setChosenRowStatus(initialChosenRowColumnStatus);
  };

  /**
   * @summary Check if the move is valid
   * @param {number} index The index of the quota label
   * @param {string} dir The direction of the move
   * @param {number} tableLength The length of the table (rowList/ columnList)
   * @returns {boolean}
   */
  const isMovingQuotaLabelValid = (index, dir, tableLength) =>
    (index === 0 && dir === QUOTA_MOVING_DIRECTION.UP) ||
    (index === tableLength - 1 && dir === QUOTA_MOVING_DIRECTION.DOWN) ||
    index === -1 ||
    tableLength <= 1;

  const onDeletingSelectedQuotaLabel = () => {
    // Type of clicked total board (the row or column section)
    const tableType = getCurrentTableType();

    // Get the clicked row/ column quota label array
    const quotaLabelId = getChosenRowColumnStatus(tableType);

    if (tableType === "" || quotaLabelId === "") return;

    // Get the current quota label array, which depends on the tableType. If tableType is Row, we'll get the rowList property of the editingTable, etc...
    const currentChosenEditingList = getCurrentEditingTable(tableType);

    const newChosenEditingList = currentChosenEditingList.filter(
      (el) => el !== quotaLabelId
    );

    const newEditingTable = [].concat(editingtable); //NEED DELETING

    if (tableType === TABLE_TYPE.ROW) {
      newEditingTable[0].rowList = newChosenEditingList;
    } else if (tableType === TABLE_TYPE.COLUMN) {
      newEditingTable[0].columnList = newChosenEditingList;
    }

    setEditingTable(newEditingTable);
    onResetChosenRowColumnStatus();
  };

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
    const currentChosenEditingList = getCurrentEditingTable(tableType);
    // Get the index of the clicked row/ column quota label
    const selectedQuotaIndex = currentChosenEditingList.indexOf(quotaLabelId);

    // Check if the move is valid
    if (
      isMovingQuotaLabelValid(
        selectedQuotaIndex,
        direction,
        currentChosenEditingList.length
      )
    ) {
      onResetChosenRowColumnStatus();
      return;
    }

    // Get the index of the DESIRED quota label to shift
    const selectedQuotaToShiftIndex =
      direction === QUOTA_MOVING_DIRECTION.UP
        ? selectedQuotaIndex - 1
        : selectedQuotaIndex + 1;

    // Swap the labels
    [
      currentChosenEditingList[selectedQuotaIndex],
      currentChosenEditingList[selectedQuotaToShiftIndex],
    ] = [
      currentChosenEditingList[selectedQuotaToShiftIndex],
      currentChosenEditingList[selectedQuotaIndex],
    ];

    // Set state for the new table
    const currentEditingTableFull = [].concat(editingtable); //NEED DELETING

    if (tableType === TABLE_TYPE.ROW) {
      currentEditingTableFull[0].rowList = currentChosenEditingList;
    } else if (tableType === TABLE_TYPE.COLUMN) {
      currentEditingTableFull[0].columnList = currentChosenEditingList;
    }

    setEditingTable(currentEditingTableFull);
    onResetChosenRowColumnStatus();
  };

  /**
   * @summary This function is to return the maxQuota for the cell corresponding to the columnID and rowID by searching the whole dataList
   * @param {string} rowID
   * @param {string} columnID
   * @return {number} maxQuota that corresponds to the columnID and rowID
   */
  const getTheQuotaCorrespondingtoColIDAndRowID = (rowID, columnID) => {
    for (const row of EDITING_TABLE_DATA.dataList) {
      for (const cell of row) {
        if (cell.rowID === rowID && cell.columnID === columnID) {
          return cell.maxQuota;
        } else if (cell.rowID === columnID && cell.columnID === rowID) {
          return cell.maxQuota;
        }
      }
    }
    return 0;
  };
  /**
   * @summary This function is to update the DataList of {editingTable}
   */

  const updatingTheEditingTable = (props) => {
    // console.log("Flag editing table updated")

    const indexOfTable = 0;
    let indexOfRow, indexOfColumn;
    let tempTable = [].concat(props); //NEED DELETING
    let maxQuota;

    for (const row of tempTable[indexOfTable].rowList) //NEED DELETING
      for (const column of tempTable[indexOfTable].columnList) { //NEED DELETING
        //Initially the maxQuota corresponding to current column's unique Id and current row's uniqueId
        maxQuota = getTheQuotaCorrespondingtoColIDAndRowID(
          row.uniqueID,
          column.uniqueID
        );

        //Get the index of the curent row and the current Column
        indexOfRow = tempTable[indexOfTable].rowList.indexOf(row); //NEED DELETING
        indexOfColumn = tempTable[indexOfTable].columnList.indexOf(column); //NEED DELETING

        //This splice method is to update the current editing table by replacing each element corresponding to column's uniqueId and row's uniqueId
        tempTable[indexOfTable].dataList[indexOfRow].splice(indexOfColumn, 1, {
          rowID: row.uniqueID,
          columnID: column.uniqueID,
          maxQuota: maxQuota,
        }); //NEED DELETING
      }
    // This while loop is to handle deleting row as the above splice method above just replace the rows and columns due to their length. The deleting function
    // just delete the {row} in the rowList or {column} of the ColumnList of the editingTable
    while (
      tempTable[indexOfTable].dataList.length >
      tempTable[indexOfTable].rowList.length
    )
      //NEED DELETING

      //Each iteration will delete the last uneccessary row by using pop() method
      tempTable[indexOfTable].dataList.pop();

    for (const row of props[indexOfTable].dataList) { //NEED DELETING
      //The row.length is the number of columns. We compare the length of row to the length of columnList to eliminate unecessary columns
      while (row.length > tempTable[indexOfTable].columnList.length) {
        //NEED DELETING
        //Each iteration will delete the last uneccessary column of a specific row by using pop() method
        row.pop();
      }
    }

    // console.log("The editing table data at the end",tempTable[0], 'vs the current one', editingtable[0])
    onChangeEditingTable(tempTable);
  };

  const updateColumn = (quotaLabel) => {
    handleAddToColumn(quotaLabel);
    updatingTheEditingTable(editingtable);
    updatingTheTotalColOfTable(editingtable); //NEED DELETING
    console.log("QuotaEditing.js - updateColumn - editingtable", editingtable);
    updatingTheTotalRowOfTable(editingtable);
  };
  const updateRow = (quotaLabel) => {
    // alert(JSON.stringify(editingtable[0]));
    handleAddToRow(quotaLabel);
    updatingTheEditingTable(editingtable); //NEED DELETING
    updatingTheTotalColOfTable(editingtable);
    updatingTheTotalRowOfTable(editingtable);
  };

  const moveQuota = (direction) => {
    onMovingSelectedLabelUpDown(direction);
    updatingTheEditingTable(editingtable); //NEED DELETING
    updatingTheTotalColOfTable(editingtable);
    updatingTheTotalRowOfTable(editingtable);
  };
  const deleteQuota = () => {
    onDeletingSelectedQuotaLabel();
    updatingTheEditingTable(editingtable); //NEED DELETING
    updatingTheTotalColOfTable(editingtable);
    updatingTheTotalRowOfTable(editingtable);
  };

  const isBreakRowValid = (array) => {
    if (array.length > 1) {
      const index = array.length - 2;
      if (array[index].rowList.length === 1) {
        alert("You haven't added any rows yet");
        return false;
      }
    }
    return true;
  };

  const handleBreakRows = () => {
    console.log("Break row ");
    let tempArray = [].concat(totalRows);
    const uuid = generate_uuid();

    console.log("QuotaEditing - handleBreakRows", currentIndexTotalRows);
    tempArray.push({
      uniqueID: uuid,
      rowList: [{ text: "Total", uniqueID: uuid }],
    });
    if (isBreakRowValid(tempArray)) {
      setCurrentIndexTotalRows((count) => count + 1); //Iterating the selected table
      setTotalRows(tempArray);
      console.log(totalRows);
    }
  };
  const isBreakColValid = (array) => {
    if (array.length > 1) {
      const index = array.length - 2;
      if (array[index].columnList.length === 1) {
        alert("You haven't added any columns yet");
        return false;
      }
    }
    return true;
  };
  const handleBreakColumns = () => {
    console.log("Break column ");
    let tempArray = [].concat(totalColumns);
    const uuid = generate_uuid();

    tempArray.push({
      uniqueID: uuid,
      columnList: [{ text: "Total", uniqueID: uuid }],
    });
    if (isBreakColValid(tempArray)) {
      setCurrentIndexTotalColumns((count) => count + 1);
      setToTalColumns(tempArray);
    }
  };
  const handleTotalColumn = (
    table,
    preTotalRowIndex,
    curTotalRowIndex,
    preTotalColIndex,
    curTotalColIndex
  ) => {
    let tempTotal = 0;
    //k is the index of the totalCol[]. Variable k is to make sure the first totalCol's value starts at index 0.
    for (
      let iterCol = preTotalColIndex + 1;
      iterCol < curTotalColIndex;
      iterCol++
    ) {
      tempTotal = 0;
      for (
        let iterRow = preTotalRowIndex + 1;
        iterRow < curTotalRowIndex;
        iterRow++
      ) {
        tempTotal += table.dataList[iterRow][iterCol].maxQuota;
      }
      table.dataList[curTotalRowIndex][iterCol].maxQuota = tempTotal;
    }
    console.log("QuotaEditing.js - handleTotalColumn - var: table", table);
    return table;
  };

  const handleTotalRow = (table, preTotalColIndex, curTotalColIndex) => {
    let tempTotal = 0;
    for (let iterRow = 0; iterRow < table.rowList.length; iterRow++) {
      for (
        let iterCol = preTotalColIndex + 1;
        iterCol < curTotalColIndex;
        iterCol++
      ) {
        tempTotal += table.dataList[iterRow][iterCol].maxQuota;
      }
      table.dataList[iterRow][curTotalColIndex].maxQuota = tempTotal;
      tempTotal = 0;
    }

    console.log("QuotaEditing.js - handleTotalRow - var: table", table);
    return table;
  };

  const updatingTheTotalRowOfTable = (props) => {
    console.log(
      "QuotaEditing - updatingTheTotalRowOfTable - var: props:",
      props
    );
    let arrayOfTables = props; //NEED DELETING
    let tempTable = {};
    tempTable = Object.assign(tempTable, arrayOfTables[0]);
    let preTotalColIndex = -1,
      curTotalColIndex = 0;
    for (const col of tempTable.columnList) {
      if (isUniqueIdOfTotalColumn(col.uniqueID)) {
        curTotalColIndex = tempTable.columnList.indexOf(col);
        for (const row of tempTable.rowList) {
          tempTable = handleTotalRow(
            tempTable,
            preTotalColIndex,
            curTotalColIndex
          );
        }
        preTotalColIndex = curTotalColIndex;
      }
    }

    console.log(
      "QuotaEditing.js - updatingTheTotalRowOfTable - var: tempTable",
      tempTable
    );
    arrayOfTables.splice(0, 1, tempTable);
    console.log(
      "QuotaEditing.js - updatingTheTotalRowOfTable - var: arrayOfTables",
      arrayOfTables
    );
    //   onChangeEditingTable(arrayOfTables)
  };

  const updatingTheTotalColOfTable = (props) => {
    let arrayOfTables = props; //NEED DELETING
    let tempTable = {};
    tempTable = Object.assign(tempTable, arrayOfTables[0]);
    let preTotalColIndex = -1,
      curTotalColIndex = 0;
    let preTotalRowIndex = -1,
      curTotalRowIndex = 0;
    for (const row of tempTable.rowList) {
      if (isUniqueIdOfTotalRow(row.uniqueID)) {
        curTotalRowIndex = tempTable.rowList.indexOf(row);
        for (const col of tempTable.columnList) {
          if (isUniqueIdOfTotalColumn(col.uniqueID)) {
            curTotalColIndex = tempTable.columnList.indexOf(col);
            tempTable = handleTotalColumn(
              tempTable,
              preTotalRowIndex,
              curTotalRowIndex,
              preTotalColIndex,
              curTotalColIndex
            );

            preTotalColIndex = curTotalColIndex; //Updating the preTotalColIndex
          }
        }
        preTotalRowIndex = curTotalRowIndex;
      }
      preTotalColIndex = -1;
      curTotalColIndex = 0;
    }

    console.log("updatingTheTotalOfTable", tempTable);
    arrayOfTables.splice(0, 1, tempTable);
    console.log("arrayOfTables", arrayOfTables);
    //   onChangeEditingTable(arrayOfTables)
  };

  const onChangeEditingTable = (table) => {
    let afterChangedEditingTable = [].concat(undoQuotaStack);
    // console.log('Current editing table', editingtable[0]);
    let currentEditingTable = Object.assign(editingtable[0]); //NEED DELETING
    afterChangedEditingTable.push(currentEditingTable);

    setUndoQuotaStack(afterChangedEditingTable);
    if (redoQuotaStack.length) setRedoQuotaStack([]);

    setEditingTable(table);
  };

  // console.log('undoQuotaStack outside', undoQuotaStack);
  // console.log('redoQuotaStack outside', redoQuotaStack);

  const onUndoingEditingTable = () => {
    if (!undoQuotaStack.length) return;

    let currentEditingTable = [].concat(redoQuotaStack);
    currentEditingTable.push(editingtable[0]); //NEED DELETING
    setRedoQuotaStack(currentEditingTable);

    const newUndoQuotaStack = [].concat(undoQuotaStack);
    newUndoQuotaStack.pop();
    setUndoQuotaStack(newUndoQuotaStack);

    const poppedEditingTable = [].concat(undoQuotaStack).pop();
    // console.log('popped', poppedEditingTable);
    const newEditingTable = [].concat(editingtable); //NEED DELETING AND CHANGING
    newEditingTable[0] = poppedEditingTable;
    // console.log('newEditingTable here', newEditingTable);
    setEditingTable(newEditingTable);
  };

  const onRedoingEditingTable = () => {
    if (!redoQuotaStack.length) return;
    let currentEditingTable = [].concat(undoQuotaStack);
    currentEditingTable.push(editingtable); //NEED DELETING AND CHANGING
    setUndoQuotaStack(currentEditingTable);
    const newEditingTable = [].concat(
      redoQuotaStack[redoQuotaStack.length - 1]
    );
    setEditingTable(newEditingTable);
  };

  return (
    <div className="quota-page">
      <div className="default-bar">
        <h2 className="h2-default">QUOTA SETTINGS</h2>
        <div className="display--square--button">
          <i
          // onClick={onUndoingEditingTable}
          >
            <IoIosUndo className="up icon" />
          </i>
        </div>
        <div className="display--square--button">
          <i>
            <IoIosRedo className="up icon" />
          </i>
        </div>

        <div className="display--square--button">
          <i>
            <IoIosSave className="up icon" onClick={postDataToBE} />
          </i>
        </div>
        <div className="mode">Mode:</div>
        <select className="select" onChange={onChangeNavtoExpression}>
          <option value="">Expression</option>
          <option value="editing">Editing</option>
          <option value="exceeded">When Exceeded</option>
          <option value="tracking">Tracking</option>
          <option value="interview">Interview Preview</option>
        </select>
        <div className="title-add-to-btns">
          <h2 className="quota-label-selection-title">
            QUOTA LABEL
            <br /> SELECTION
          </h2>

          <button
            id="quota--management--page--add--to-row--btn"
            onClick={() => updateRow(quotaClickStatus)}
          >
            Add to <br /> Row
          </button>
          <button
            id="quota--management--page--add--to-column--btn"
            onClick={() => updateColumn(quotaClickStatus)}
          >
            Add to <br /> Column
          </button>
        </div>
      </div>
      <div id="quota--management--page--editing-mode--content">
        <div id="quota--display--added--table">
          <EditingTable
            editingTableData={tempData[0]} //NEED DELETING AND CHANGING
            onRenderingHeader={true}
            getValue={getValue}
            changeValue={changeValue}
          ></EditingTable>
        </div>
        <div id="quota--label--selection">
          <QuotaLabelSelection
            quotaData={quotaData}
            onChoosingQuota={onChoosingQuota}
            quotaClickStatus={quotaClickStatus}
          />
        </div>
        <div id="quota--management--adjust--rows--cols">
          <div id="quota--management--adjust--rows--cols--btn--div">
            <div className="display--square--button">
              <IoIosArrowRoundUp
                onClick={() => moveQuota(QUOTA_MOVING_DIRECTION.UP)}
                className="up icon"
              />
            </div>
            <div className="display--square--button">
              <IoIosArrowRoundDown
                onClick={() => moveQuota(QUOTA_MOVING_DIRECTION.DOWN)}
                className="up icon"
              />
            </div>
            <div className="display--square--button">
              <IoMdClose
                onClick={deleteQuota}
                //  onClick={onDeletingSelectedQuotaLabel}
                className="up icon"
              />
            </div>
            <div
              className="quota--management--add--total--cols-rows--btn"
              onClick={handleBreakRows}
            >
              <ImSigma className="sigma-icon" />
              <text> Rows</text>
            </div>
            <div
              className="quota--management--add--total--cols-rows--btn"
              onClick={handleBreakColumns}
            >
              <ImSigma className="sigma-icon" />
              <text> Columns </text>
            </div>
          </div>
          <QuotaRowColumnAdjustment
            rowData={editingtable[0]["rowList"]} //NEED DELETING
            columnData={editingtable[0]["columnList"]} //NEED DELETING
            totalRowsData={totalRows}
            totalColumnsData={totalColumns}
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
