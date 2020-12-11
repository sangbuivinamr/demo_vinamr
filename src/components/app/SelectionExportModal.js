/**
 * @module 4
 * @summary This component is  to export file selection in module 4
 * Contributor: Dev03_vinamr_Ha Tien Dat
 * Date: 26/11/2020 
 */

import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';
import "./styles/SelectionExportModal.css";

const SelectionExportModal  = (props) =>{
    console.log("SELECTION EXPORT MODAL - RENDERING")
    const [exportSelection,setExportSelection] = useState([
        {id: "11111", value: "Quota Counted Interviews", checked: false },
        {id: "22222", value: "Cancelled Interviews", checked: false },
        {id: "33333", value: "Not Completed Interviews", checked: false },
        {id: "44444", value: "All data", checked: false }
    ])
    //Type of exporting data
    const ALL_DATA = "All data"
    useEffect(() =>{
        Modal.setAppElement('body');
    },[])


    /**
     * @summary This function is to handle selected Check box
     */
    let selectedExportType =[]
    for(const selection of exportSelection)
    {
        if(selection.checked === true)
        selectedExportType.push(selection.value)
    }
    console.log("Selection", selectedExportType)
    const handleCheckBox = (event) =>{
        const exTypeId = event.target.id
        const exType = event.target.value
        let isChecked = event.target.checked
        console.log(isChecked)
        let tempSelection = [].concat(exportSelection)
        //Handle All Data Case
        const changeOtherExTypes = (type) =>{
            for (const selection of tempSelection)
                if(!(selection.value === type))
                {   console.log("Dc")
                    selection.checked = false
                }
        }
        //Change state other selection if the selected option is ALL_DATA
        if(exType === ALL_DATA)
            changeOtherExTypes(ALL_DATA);

        //Change state of the selected selection
        for(const selection of tempSelection)
        {   
            if(selection.id === exTypeId)
            {   console.log("Found",selection);
                selection.checked = isChecked
                console.log("Found checked",isChecked)
            }

            if( selection.value === ALL_DATA && exType !== ALL_DATA)
            {
                console.log("Lam ON")
                selection.checked = false
            }
            
            
            
        }
     
        console.log("Temp selection",tempSelection)
        setExportSelection(tempSelection)
    }
    console.log("Selection state",exportSelection)
    return(
            <div className="module-4--selection-export-modal-div">
                 <Modal isOpen ={props.isOpen} className="module-4--selection-export-modal">
            <h2>
                Export Data
            </h2>
            <text className="module-4--Please-select">Please select output format </text>
            <div>
            <select className="module-4--export-options">
                <option value="first_option">MS Excel (*.xlsx)</option>
            </select>
            </div>
            <text className="module-4--Please-select">Export data for</text>
            {
             exportSelection && exportSelection.map(exType => {
                 return(
                    <div>
                    <input style={{marginBottom:"10px"}} 
                    type="checkbox" className="module-4--export-modal--checkbox" 
                    value={exType.value} 
                    id={exType.id}
                    onChange ={ e => handleCheckBox(e)}
                    checked={exType.checked}
                    />
                    <span>{exType.value}</span>
                </div>
                 );
             })
            }
           <button className="module-4--selection-exp-modal--export-button" onClick={() =>props.Module4Export(selectedExportType)}>
               Export
           </button>
             <button 
             onClick ={props.closeExpModal}
             className ="module-4--selection-exp-modal--cancel-button"
             >
              Cancel
           </button>
                    
        </Modal>
            </div>
         
  
      
       
    )
}
export default SelectionExportModal;