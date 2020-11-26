/**
 * @module 4
 * @summary This component is  to export file selection in module 4
 * Contributor: Dev03_vinamr_Ha Tien Dat
 * Date: 26/11/2020 
 */

import React from 'react';
// import Modal from 'react-modal';
import "./styles/SelectionExportModal.css";

const SelectionExportModal  = (props) =>{
    return(
        <Modal isOpen ={props.isOpen} className="module4--selection-export-modal">
            <div>
                hi 
            </div>
        </Modal>
       
    )
}
export default SelectionExportModal;