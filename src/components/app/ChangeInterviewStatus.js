/**
 * @summary This component is to render the Change Interview Status Confirmation Box
 */

import React, {useEffect} from 'react';
import Modal from 'react-modal';
import "./styles/ChangeInterviewStatus.css"
const ChangeInterviewStatus = (props) => {

    useEffect(() =>{
        Modal.setAppElement('body');
    },[])
    return(
        <div className="module-4--selection-change-interview-status-div">
            <Modal isOpen={props.isOpen} className="module-4--change-interview-status-modal">
                <h2>
                    Change Interview Status
                </h2>
                <text>
                    You’re about changing interview status. 
                    <br/>This action might change numbers in quota management. 
                    <br/>   
                    Please confirm if you want to proceed.
                </text>
                <div>
                <button onClick={props.onConfirmChange}>
                    Confirm
                </button>
                <button onClick ={props.closeCIStatModal}>
                    Cancel
                </button>
                </div>
                
            </Modal>
        </div>
    )
}
export default ChangeInterviewStatus;

