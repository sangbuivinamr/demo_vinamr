
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
                    <p>No Message</p>
                </div>
                   
                <textarea 
                    className="textarea"
                />
                <div className="buttons">
                <div className="apply">Apply</div>
                <div className="apply-all">Apply to All</div>
            </div>
        </div>
    );
}
export default Message;