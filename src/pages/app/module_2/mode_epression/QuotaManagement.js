/*
*Contributor: 
   *Khánh
   *Tien 
    -23/10/2020(init the codebase)
    -10/11/2020 (Start hooking BE to FE)
    -11/11/2020 (edited functionality for 4 buttons with Be)

*Function: Render Screen Quota Management
*/

//Packages
import React,{useState, useEffect}  from "react";
import QuotaOverview from "./QuotaOverview";
import ExpressionReview from "./ExpressionReview";
import { IoIosArrowRoundUp } from "react-icons/io";
import {IoIosArrowRoundDown} from "react-icons/io";
import {IoMdClose} from "react-icons/io";
import {IoIosSave} from "react-icons/io";
import {IoIosArrowRoundForward} from "react-icons/io";
import axios from "axios";


//Styles
import "./styles/QuotaManagementStyles.css";
// import {EXPRESSION_REVIEW_DATA } from "../../../../data/testing-data";

//Default url
const URL_QUOTA_INFORMATION ="https://115.73.222.254:8000/quota/getQuotaInformation/"
const URL_EXPRESSION="https://115.73.222.254:8000/expression/expressionReview/"

const QuotaManagement = (props)=>{
    const [selectedExpression, setSelectedExpression] = useState("");
    const [highlightedSlide, setHightlightedSlide] = useState(1);
    const [quotaData, setQuotaData] = useState([]);
    const [quotaInput, setQuotaInput] = useState([{
        quota_index: null,
        quota_label: "",
        quota_expression: ""
    }])
    const [quotaClickStatus, setQuotaClickStatus] = useState({
        quotaLabel: "", 
        status: false
    })
    const [expression , setExpression] = useState( [] )
    const [code , setCode] = useState();

    const onCheckingNotAnyHighlightedQuota = () => quotaClickStatus.quotaLabel === "" && quotaClickStatus.status === false;
    const onCheckingNotAnyInputtedQuota = () => quotaInput.quota_index === null && quotaInput.quota_label === "" && quotaInput.quota_expression === "";
    /**
     * @summary Swap the quota row in the table
     * @param {string} swapType The type of the swap: UP/ DOWN
     */
    const onSwappingQuotaRow = (swapType) => {
        axios.get(URL_QUOTA_INFORMATION).then((res) =>{

        if(onCheckingNotAnyHighlightedQuota()) return;

        const currentQuotaData = [].concat(quotaData);

        let selectedQuotaIndex;

        // Finding the index of the highlighted quota row
        let quotaIndex = 0;
        for(quotaIndex; quotaIndex <= currentQuotaData.length -1 ; quotaIndex++){
            if(currentQuotaData[quotaIndex]["name"] === quotaClickStatus.quotaLabel) 
            {
                selectedQuotaIndex = quotaIndex;
            }
            
        }


        // Swapping
        const tempQuota = currentQuotaData[selectedQuotaIndex];
        if(swapType === "UP" )
        {
            if(selectedQuotaIndex > 0 )
            {
                currentQuotaData[selectedQuotaIndex] = currentQuotaData[selectedQuotaIndex - 1]
                currentQuotaData[selectedQuotaIndex - 1] = tempQuota
            }
        }
        else{
            if(selectedQuotaIndex < currentQuotaData.length - 1)
            {
                currentQuotaData[selectedQuotaIndex] = currentQuotaData[selectedQuotaIndex + 1]
                currentQuotaData[selectedQuotaIndex + 1] = tempQuota
            }
        }
        
        setQuotaData(currentQuotaData)
    })
    }

    /**
     * @summary Add a quota row to the table
     */
    const onAddingQuota = () => {
        // axios.post(URL_QUOTA_INFORMATION).then((result) =>{
        //     console.log(result)
        // })

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
        if( onCheckingNotAnyHighlightedQuota() )
        {
            alert("Please indicate the quota you want to remove!")
            return;
        }
        let currentQuotaData = [];
        currentQuotaData = currentQuotaData.concat(quotaData);

        // Filter out the selected quota row
        let newQuotaData = currentQuotaData.filter(quota => quota.name !== quotaClickStatus.quotaLabel)
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
    console.log("Highlighting successfully",selectedText)
    selectedText =  returningValidExpression(selectedText);
    if(selectedText !== "") 
    {
    
    setSelectedExpression(selectedText);
    selectedText = selectedText.match(/(\d+)/);
    const slide = parseInt(selectedText);
    setHightlightedSlide(slide);
    }

    }

    /**
     * @summary Function useEffect
     * @return void
     */
    useEffect(()=>{
        getDataInformation("1")
        getDataExpression("0515",code)
    },[])


    // get data information from DB
    const getDataInformation =async (projectId)=>{

        const response= await axios.get(URL_QUOTA_INFORMATION + `?projectId=${projectId}`)
        setQuotaData(response.data)
    }


    //Get data expression from DB
    const getDataExpression =async (propjectId,code)=>{
        const response = await axios.get(URL_EXPRESSION + `?projectId=${propjectId}&code=${code}`)
        setExpression(response.data)
    }


    //Function handle code submittion
    const onChangeCode =(code) =>{
        setCode(code);
    }


    // const updateCode = (newCode) => {
    //     let oldCode="";
    //     let UpdateCode=oldCode.concat(oldcode);
    //     setNewCode(UpdateCode)
    // }

    return(
        
        <div className="quota-page">
           <div className="quota-page default-bar">
                <h2 className="h2-default">
                    QUOTA SETTINGS
                    
                </h2>
                <div className="up">
                    <i>
                    <IoIosArrowRoundUp
                        className="up icon"
                        onClick={() => onSwappingQuotaRow("UP") }
                    />
                    </i>
                </div>
                <div className="up">
                    <i>
                    <IoIosArrowRoundDown
                        className="up icon"
                        onClick={() => onSwappingQuotaRow("DOWN") }
                    />
                    </i>
                </div>
                <div className="up">
                    <i>
                    <IoMdClose
                        className="up icon"
                        onClick={() => onDeletingQuota() }
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
                <div className="mode">
                    Mode:
                </div>
                    <select className="select">
                        <option value="Expression"> Expression </option>
                        <option value="Editing"> Editing </option>
                        <option value="When Exceeded"> When Exceeded </option>
                        <option value="Tracking"> Tracking </option>
                    </select>
                <div className="expression-review">
                    <h2 className="review">
                        EXPRESSION REVIEW
                    </h2>
                    <input 
                        className="input-code"
                        type="text" 
                        placeholder="Input the code"
                        value={code}
                        onChange={ (code) => onChangeCode(code.target.value) }
                    />
                    <div className="up">
                        <i>
                            <IoIosArrowRoundForward
                                className="up icon"
                                onClick={() => getDataExpression("0515",code)}
                            />
                        </i>
                    </div>
                </div>
            </div>  
            <div className="quota-page--tables" onMouseUp ={handleExpressionHighlight} >
                <QuotaOverview
                    quotaData={quotaData}
                    quotaInput={quotaInput}
                    setQuotaLabel={onAddingQuotaLabel}
                    setQuotaExpression={onAddingQuotaExpression}
                    onChoosingQuota={onChoosingQuota}
                    quotaClickStatus={quotaClickStatus}
                    setQuotaClickStatus={setQuotaClickStatus}
                />
                <ExpressionReview  
                    expressionReviewData ={expression} 
                    setHightlightedSlide ={highlightedSlide}
                    expression_code={code}
                />
            </div>
        </div>
    );
};
export default QuotaManagement;