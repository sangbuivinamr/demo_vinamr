
//Packages
import React from "react";

//Styles
import './styles/Message.css';

const Message=(props)=>{
    return(
        <div className="message">
                <div className="two-mess">
                    <p className="p-mess">Message</p>
                        <input
                            className="check"
                            name="message"
                            type="checkbox"
                        />
                    <p className="no-mess"><i>No Message</i></p>
                </div>
                   
                <textarea 
                    className="textarea"
                />
                <div className="button-mess">
                    <div className="apply-mess">Apply</div>
                    <div className="apply-all-mess">Apply to All</div>
                </div>
        </div>
    );
}
export default Message;