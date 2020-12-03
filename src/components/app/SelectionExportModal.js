/**
 * @module 4
 * @summary This component is  to export file selection in module 4
 * Contributor: Dev03_vinamr_Ha Tien Dat
 * Date: 26/11/2020 
 */

import React,{useEffect} from 'react';
import Modal from 'react-modal';
import "./styles/SelectionExportModal.css";

const SelectionExportModal  = (props) =>{
    
        //Type of exporting data
        const TYPE_EXPORTING =["Quota Counted Interviews","All data", "Cancelled Interviews","Not Completed Interviews"]

    useEffect(() =>{
        Modal.setAppElement('body');
    },[])

    /**
     * @summary This function is to handle selected Check box
     */
    let interviewType = "";
    const handleCheckBox = (type) =>{

    }

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
                <option value="second_option">MS Excel (*.csv)</option>
            </select>
            </div>
            <text className="module-4--Please-select">Export data for</text>
            {
             TYPE_EXPORTING.map(exType => {
                 return(
                    <div>
                    <input style={{marginBottom:"10px"}} type="checkbox" className="module-4--export-modal--checkbox" value={exType} onChange ={ e => console.log("Check Box", e.target.value)}/>
                    <span>{exType}</span>
                </div>
                 );
             })
            }
           <button className="module-4--selection-exp-modal--export-button" onClick={props.ExportToCSV}>
               Export
           </button>
             <button 
             onClick ={props. closeExpModal}
             className ="module-4--selection-exp-modal--cancel-button"
             >
              Cancel
           </button>
                    
        </Modal>
            </div>
         
  
      
       
    )
}
export default SelectionExportModal;