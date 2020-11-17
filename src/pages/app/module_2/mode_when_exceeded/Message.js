
//Packages
import React,{useState} from "react";

//Styles
import './styles/Message.css';

const Message=(props)=>{
    const [mess,setMess]=useState();
    const onChange=(mess)=>{
        setMess(mess)
    }

    const handleNoMess=()=>{
        Array.from(document.querySelectorAll("textarea")).forEach(
            textarea => (textarea.value = "")
          );
    }

//    function disable(){
//        if()
//     disabled={true};
//    }
    
    return(
        // console.log("test",e),
        <div className="message">
                <div className="two-mess">
                    <p className="p-mess">Message</p>
                        <input
                            className="check"
                            name="message"
                            type="checkbox"
                            // onClick={(disable())}
                           
                        />
                    <p className="no-mess"><i>No Message</i></p>
                </div>
                   
                <textarea 
                    disabled={true}
                    className="textarea"
                    value={mess}
                    onChange={(mess)=>onChange(mess.target.value)}
                />
                <div className="button-mess">
                    <div className="apply-mess">Apply</div>
                    <div className="apply-all-mess">Apply to All</div>
                </div>
        </div>
    );
}
export default Message;