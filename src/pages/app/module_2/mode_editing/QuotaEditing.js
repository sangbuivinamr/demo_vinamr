//Packages
import React,{useState} from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import {IoIosArrowRoundDown} from "react-icons/io";
import {IoMdClose} from "react-icons/io";
import {IoIosSave} from "react-icons/io";
import {IoIosUndo} from "react-icons/io";
import {IoIosRedo} from "react-icons/io";
import {ImSigma} from "react-icons/im";
import QuotaLabelSelection from "./QuotaLabelSelection";
import QuotaRowColumnAdjustment from "./QuotaRowColumnAdjustment";
import EditingTable from "../../../../components/app/EditingTable";

//Styles
import "./styles/QuotaEditing.css";
/*  exceededLeft={ EXCEEDED_LAYOUT_LEFT}
                        exceededLeftHeader={QUOTA_OVERVIEW_DATA}
                        exceededLeftSex={EXCEEDED_SEX_LEFT}  */
//Data
import {QUOTA_OVERVIEW_DATA, EDITING_TABLE_DATA,EXCEEDED_SEX_LEFT} from "../../../../data/testing-data";

const QuotaEditing = (props)=>{
    const [selectedExpression, setSelectedExpression] = useState("");
    const [highlightedSlide, setHightlightedSlide] = useState(1);
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

    const onCheckingNotAnyHighlightedQuota = () => quotaClickStatus.quotaLabel === "" && quotaClickStatus.status === false;
    const onCheckingNotAnyInputtedQuota = () => quotaInput.quota_index === null && quotaInput.quota_label === "" && quotaInput.quota_expression === "";
    
    /**
     * @summary Swap the quota row in the table
     * @param {string} swapType The type of the swap: UP/ DOWN
     */
    const onSwappingQuotaRow = (swapType) => {

        if(onCheckingNotAnyHighlightedQuota()) return;

        const currentQuotaData = [].concat(quotaData);

        let selectedQuotaIndex;

        // Finding the index of the highlighted quota row
        for(let quotaIndex = 0; quotaIndex < currentQuotaData.length; quotaIndex++){
            if(currentQuotaData[quotaIndex]["quota_label"] === quotaClickStatus.quotaLabel) selectedQuotaIndex = quotaIndex;
        }

        // Swapping
        const tempQuota = currentQuotaData[selectedQuotaIndex];
        if(swapType === "UP"){
            currentQuotaData[selectedQuotaIndex] = currentQuotaData[selectedQuotaIndex - 1]
            currentQuotaData[selectedQuotaIndex - 1] = tempQuota
        }else{
            currentQuotaData[selectedQuotaIndex] = currentQuotaData[selectedQuotaIndex + 1]
            currentQuotaData[selectedQuotaIndex + 1] = tempQuota
        }
        
        setQuotaData(currentQuotaData)
    }

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
      const handleExpressionHighlight = () => {
      var selectedText = window.getSelection().toString();
      
       selectedText =  returningValidExpression(selectedText);
        if(selectedText !== "") 
        {
        
        setSelectedExpression(selectedText);
        selectedText = selectedText.match(/(\d+)/);
        const slide = parseInt(selectedText);
        setHightlightedSlide(slide);
        } 
      }
    const onChangeNavtoExpression=(e)=>{
          
        props.history.push(`/${e.target.value}`)
  
}
    return(
        <div className="quota-page">
             <div className="quota-page default-bar">
                <h2 className="h2-default">
                    QUOTA SETTINGS
                    
                </h2>
                <div className="display--square--button">
                    <i>
                    <IoIosUndo
                        className="up icon"
                     
                    />
                    </i>
                </div>
                <div className="display--square--button">
                    <i>
                    <IoIosRedo
                        className="up icon"
               
                    />
                    </i>
                </div>
           
                <div className="display--square--button">
                    <i>
                    <IoIosSave
                        className="up icon"
                     
                    />
                    </i>
                </div>
                <div className="mode">
                    Mode: 
                </div>
                    <select className="select"onChange={onChangeNavtoExpression}>
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
                    <div className="expression-review">
                    <h2 className="review">
                        QUOTA LABEL <br/> SELECTION
                    </h2>
                    <button id ="quota--management--page--add--to-row--btn">
                    Add to <br/> Row
                    </button>
                   <button id ="quota--management--page--add--to-column--btn">
                    Add to <br/> Column
                   </button>
                </div>

            </div>
            <div id = "quota--management--page--editing-mode--content">
              
                
                <div id = "quota--display--added--table">
                    <EditingTable  
                     exceededLeft={EDITING_TABLE_DATA}
                        exceededLeftHeader={QUOTA_OVERVIEW_DATA}
                        exceededLeftSex={EXCEEDED_SEX_LEFT} ></EditingTable>
                </div>
                <div id ="quota--label--selection">
                 
                <QuotaLabelSelection quotaData ={quotaData} onChoosingQuota={onChoosingQuota}
                    quotaClickStatus={quotaClickStatus}
                    setQuotaClickStatus={setQuotaClickStatus}/>
                </div>
                <div id= "quota--management--adjust--rows--cols">
                    <div id="quota--management--adjust--rows--cols--btn--div">
                    <div className="display--square--button">
                    
                    <IoIosArrowRoundUp
                        className="up icon"
                    />
                  
                </div>
                <div className="display--square--button">
                   
                    <IoIosArrowRoundDown
                        className="up icon"
                    />
                   
                </div>
                <div className="display--square--button">
                   
                    <IoMdClose
                        className="up icon"
                    />
                   
                </div>
                <div className="quota--management--add--total--cols-rows--btn">
                    <ImSigma className="sigma-icon" />
                    <text> Rows</text>
                </div>
                <div className="quota--management--add--total--cols-rows--btn">
                    <ImSigma className="sigma-icon" />
                    <text> Columns</text>
                </div>
                    </div>
                    <QuotaRowColumnAdjustment/>
              
                </div>
            </div>
               
        </div>
    );
};

export default QuotaEditing;