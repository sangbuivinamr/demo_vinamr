
//Packages
import React from "react";

//Styles
import './styles/ActionExceeded.css'

const ActionExceeded =(props)=>{
    return(
        <div className="action-exceeded">
            <p className="action-p">Action when exceeded</p>
            <select className="select-action">
                <option>
                    Terminate Interview
                </option>
                <option>
                    Jump Backward
                </option>
                <option>
                    Jump Forward
                </option>
                <option>
                    Jump to Slide
                </option>
                <option>
                    Continue Interview
                </option>
            </select>
            <div className="buttons">
                <div className="apply">Apply</div>
                <div className="apply-all">Apply to All</div>
            </div>
        </div>
        
    );
};
export default ActionExceeded;