
//Packages
import React,{useState} from "react";

//Styles
import './styles/Message.css';

const Message=(props)=>{
    //Render to browser
    return(
        <div className="message">
                <div className="two-mess">
                    <p className="p-mess">Message</p>
                        <input
                            className="check"
                            name="message"
                            type="checkbox"
                            // onClick={()=>handleClick()}
                        />
                    <p className="no-mess"><i>No Message</i></p>
                </div>
                <div className="notification-area">
                <p 
                    className="notification"
                >
                    {props.mess}
                </p>
                </div>
                <div className="button-mess">
                    <div className="apply-mess">Apply</div>
                    <div className="apply-all-mess">Apply to All</div>
                </div>
        </div>
    );
}
export default Message;