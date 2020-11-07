
//Packages
import React,{useState} from "react";

//Styles
import './styles/Message.css';

const Message=(props)=>{

    //Initialize the states
    const [mess,setMess]=useState();
    const [disable, setDisable] = useState(false);
    const [input, setInput]=useState();

    //Funtions handle
    const onChange=(mess)=>{
        setMess(mess)
    }
    
    const handleClick=(e)=>{
        setDisable(!disable);
    }

    //Render to browser
    return(
        <div className="message">
                <div className="two-mess">
                    <p className="p-mess">Message</p>
                        <input
                            className="check"
                            name="message"
                            type="checkbox"
                            onClick={()=>handleClick()}
                        />
                    <p className="no-mess"><i>No Message</i></p>
                </div>
                   
                <textarea 
                    disabled={disable}
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