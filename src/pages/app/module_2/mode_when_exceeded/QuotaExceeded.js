//Packages
import React,{useState} from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import {IoIosArrowRoundDown} from "react-icons/io";
import {IoMdClose} from "react-icons/io";
import {IoIosSave} from "react-icons/io";
import {IoIosUndo} from "react-icons/io";
import {IoIosRedo} from "react-icons/io";
import ExceededLeft from "./ExceededLeft";
import QuotaName from "./QuotaName";
import ActionExceeded from "./ActionExceeded";
import Message from "./Message";

//Styles
import "./styles/QuotaExceeded.css";

//Data
import {QUOTA_OVERVIEW_DATA, EXCEEDED_LAYOUT_LEFT,EXCEEDED_SEX_LEFT} from "../../../../data/testing-data";

const QuotaExceeded = (props)=>{
    const [quotaData, setQuotaData] = useState(QUOTA_OVERVIEW_DATA);
    const [quotaInput, setQuotaInput] = useState({
        quota_index: null,
        quota_label: "",
        quota_expression: ""
    })
    const [quotaClickStatus, setQuotaClickStatus] = useState({
        quotaLabel: "", 
        status: false
    })
const [typeCar, setTypeCar] = useState("");
    


    const onCheckingNotAnyHighlightedQuota = () => quotaClickStatus.quotaLabel === "" && quotaClickStatus.status === false;
    const onCheckingNotAnyInputtedQuota = () => quotaInput.quota_index === null && quotaInput.quota_label === "" && quotaInput.quota_expression === "";
    

    /**
     * @summary Add a quota row to the table
     */
    const onAddingQuota = () => {

        // Check if the user has actually inputted a quota
        if(onCheckingNotAnyInputtedQuota()){
            alert("You haven't typed any quota")
            return;
        }

        let newQuotaData = quotaData.concat(quotaInput);

        setQuotaData(newQuotaData);

        // After we've added a quota, the input will be cleaned up
        setQuotaInput({
            quota_index: null,
            quota_label: "",
            quota_expression: ""
        })
    }

    /**
     * @summary Handle the input change for the label input in the quota table
     * @param {string} quota_label The label (aka value of the input at the label column)
     */
    const onAddingQuotaLabel = (quota_label) => {
        let newQuotaInput = {
            quota_index: quotaData.length,
            quota_label: quota_label,
            quota_expression: quotaInput.quota_expression
        };

        setQuotaInput(newQuotaInput)
        
    }

    /**
     * @summary Handle the input change for the expression input in the quota table
     * @param {string} quota_expression The expression (aka value of the input at the expression column) 
     */
    const onAddingQuotaExpression = (quota_expression) => {
        let newQuotaInput = {
            quota_index: quotaData.length,
            quota_label: quotaInput.quota_label,
            quota_expression: quota_expression
        }
        setQuotaInput(newQuotaInput)
    }

    /**
     * @summary Make the selected (clicked) row to be highlighted
     * @param {string} quotaLabel The label of the current selected quota row
     */
    const onChoosingQuota = (quotaLabel) => {

        let newQuotaStatus = {
            quotaLabel: quotaLabel,
            status: true
        }
        setQuotaClickStatus(newQuotaStatus);
    }

    /**
     * @summary Delete the selected quota row in the table
     */
    const onDeletingQuota = () => {
        if(onCheckingNotAnyHighlightedQuota()){
            alert("Please indicate the quota you want to remove!")
            return;
        }
        let currentQuotaData = [];
        currentQuotaData = currentQuotaData.concat(quotaData);

        // Filter out the selected quota row
        let newQuotaData = currentQuotaData.filter(quota => quota.quota_label !== quotaClickStatus.quotaLabel)
        setQuotaData(newQuotaData);

    }

       /**
     * @summary returning the valid expression if matching, else return an empty string ""
     * @param {string} expression the selected expression
     */
    const returningValidExpression = (expression) => {
  
        const verifiedExpression = /^([S]\d+[=]\d+)*/g;
         const getExpresssion = expression.match(verifiedExpression); 
          
        return getExpresssion[0];
    }
     /**
     * @summary Handling the highlighted text
     * @return the index of the slide
     * @param {string} expression the selected expression
     */
    //   const handleExpressionHighlight = () => {
    //   var selectedText = window.getSelection().toString();
      
    //    selectedText =  returningValidExpression(selectedText);
    //     if(selectedText !== "") 
    //     {
        
    //     setSelectedExpression(selectedText);
    //     selectedText = selectedText.match(/(\d+)/);
    //     const slide = parseInt(selectedText);
    //     setHightlightedSlide(slide);
    //     } 
    //   }
    const onChangeNav=(e)=>{  props.history.push(`/${e.target.value}`) }

    const onChangeName=(newName)=>{
        setName({name:newName});
    }
 
    const onChoosingCell=(e)=>{
        
        let type_car=e.target.parentNode.childNodes[0].innerText;
       let notification=e.target.innerText;
        // const [car,setCar]
     setTypeCar(type_car)
        

    }
console.log("Type car",typeCar)
    const test=(e)=>{
        let type_car=e.target.parentNode.childNodes[0].innerText;
        return(
           <h1>{type_car}</h1> 
        );
    }
    const [name,setName]=useState("");
    const [message,setMessage]=useState("");
    return(
        <div className="exceeded">
             <div className="exceeded exceeded-bar">
                <h2 className="h2-exceeded">
                    QUOTA SETTINGS
                    
                </h2>
                <div className="up">
                    <i>
                    <IoIosUndo
                        className="up icon"
                        // onClick={() => onUndo()}
                    />
                    </i>
                </div>
                <div className="up">
                    <i>
                    <IoIosRedo
                        className="up icon"
                        // onClick={() => onRedo()}
                    />
                    </i>
                </div>
                <div className="up">
                    <i>
                    <IoIosSave
                        className="up icon"
                        onClick={onAddingQuota}
                    />
                    </i>
                </div>
                <div className="mode-exceeded">
                    Mode: 
                </div>
                    <select className="select" onChange={onChangeNav} /*value={}*/>
                        <option
                            value=""
                        > 
                            Expression 
                        </option>
                        <option 
                            value="editing"
                        >
                            Editing 
                        </option>
                        <option
                            value="exceeded"
                        >
                            When Exceeded 
                        </option>
                        <option 
                            value="tracking"
                        >
                            Tracking
                        </option>
                        <option
                            value="interview"
                        >
                            Interview Preview
                        </option>
                    </select>
                    <h2 className="review">
                        ACTION & MESAGES
                    </h2>
            </div>
            <div className="layouts">
                <div className="layout-left">
                    <ExceededLeft 
                        exceededLeft={ EXCEEDED_LAYOUT_LEFT}
                        exceededLeftHeader={QUOTA_OVERVIEW_DATA}
                        exceededLeftSex={EXCEEDED_SEX_LEFT} 
                        onChoosingCell={(e)=>onChoosingCell(e)}
                    />
                </div>
                <div className="layout-right">
                    <div>
                        <QuotaName 
                            dataFromTable={typeCar}
                        />
                    </div>
                    <div>
                        <ActionExceeded/>
                    </div>
                    <div>
                        <Message
                            mess={message}
                            onChange={(e)=>onChoosingCell(message.target.parentNode.childNodes[0].innerText)}
                        /> 
                    </div>                       
                </div>
            </div>
                
                
        </div>
    );
};

export default QuotaExceeded;