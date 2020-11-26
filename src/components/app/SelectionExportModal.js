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
    useEffect(() =>{
        Modal.setAppElement('body');
    },[])
    return(
            <div className=".module-4--selection-export-modal-div">
                 <Modal isOpen ={props.isOpen} className="module-4--selection-export-modal">
            <h2>
                Export Data
            </h2>
            <text className="module-4--Please-select">Please select output format </text>
            <div>
            <select className="module-4--export-options">
                <option value="first_option">MS Excel (*.xlsx)</option>
                <option value="second_option">MS Excel (*.csv)</option>
                <option value="third_option">SPSS (*.sav)</option>
                <option value="forth_option" selected>PDF (*.pdf)</option>
            </select>
            </div>
            <text className="module-4--Please-select">Export data for</text>
            <div>
                <input type="checkbox" className="module-4--export-modal--checkbox"/>
                <span>Quota Counted Interviews</span>
            </div>
            <div>
                <input type="checkbox" className="module-4--export-modal--checkbox"/>
                <span>All data</span>
            </div>
            <div>
                <input type="checkbox" className="module-4--export-modal--checkbox"/>
                <span>Cancelled Interviews</span>
            </div>
            <div>
                <input type="checkbox" className="module-4--export-modal--checkbox"/>
                <span>Selected Interviews</span>
            </div>
            <div>
                <input type="checkbox" className="module-4--export-modal--checkbox"/>
                <span>Not Completed Interviews</span>
            </div>
           <button className="module-4--selection-exp-modal--export-button">
               Export
           </button>
             <button 
             onClick ={props. closeExpModal}
             >
              Cancel
           </button>
                    
        </Modal>
            </div>
         
  
      
       
    )
}
export default SelectionExportModal;