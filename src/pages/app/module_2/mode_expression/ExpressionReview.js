/*
*   Contributor: 
        -Đạt 
        -Tiến (10/11/2020 Start hooking BE to FE)
*/
import React from "react";
import "./styles/ExpressionReview.css";



const ExpressionReview = (props) => {
   const expressionReviewData = props.expressionReviewData;
   const expression_code = props.expression_code;
   const highlightedSlide = props.setHightlightedSlide;
    const renderExpressionHeader = () => {
        let headerElement = ['Code', 'Description'];
        return headerElement.map( (key, index) => {
            return (
                <th key={index}> {key}</th>
                
            )
        })
       }
       
    
    /**
     * @summary The new function to render body of the layout_left
     * @param {*} selectedSlideIndex 
     * @return void
     */
    const renderExpressionBody = () => {
        return expressionReviewData.child && expressionReviewData.child.map(({type, name}) =>{
            // if (type ===selectedSlideIndex) 
            // The line above will work if the expression in the left_layout is correct so I commented it and uncomment later when the DB is edited 
            return(
                <tbody>
                    <tr key = {type}>
                        <td className ="option--index">{type}</td>
                        <td>
                            <ul>
                                <li>{name}</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            )
        })
    }
    

return(
    <div className="">
        <table className="quota-management-page--expression-review--tables">
            <thead>
            {renderExpressionHeader()}
            </thead>

            {/* The code and the discription  */}
            <tr>
                <td className ="slide--index">{expression_code}</td>
                <td id="des">{expressionReviewData.description}</td>
            </tr>

            {/* Render layout_left body */}
            {renderExpressionBody(highlightedSlide)}
        </table>
    </div>
)
}
export default ExpressionReview;

//OLD CODE FOR LAYOUT_LEFT

//    const renderExpressionBody = (selectedSlideIndex) => {
  
    //    return expressionReviewData && expressionReviewData.map(({slide_index,slide_question, slide_note, slide_options}) => {
    //     if (slide_index ===selectedSlideIndex)   
    //     return (
    //            <tbody>
    //              <tr key = {slide_index}>
    //            <td className ="slide--index">S{slide_index}</td>
    //            <td>{slide_question}</td> 
    //        </tr>
    //        <tr>
    //         <td> </td>
    //        <td className ="slide--note">{slide_note}</td>
    //        </tr> 
    //        {slide_options.map(({option_index, option_description}) =>
    //        {
    //            return(
    //                <tr key = {option_index}>
    //                    <td className ="option--index">{option_index}</td>
    //                    <td>
    //                        <ul>
    //            <li>{option_description}</li>
    //                        </ul>
    //                    </td>
    //                </tr>
    //            )
    //        }
    //        )}

           
    //            </tbody>
          
           
    //        )
    //    })
    //    }