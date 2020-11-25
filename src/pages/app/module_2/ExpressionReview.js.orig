/*
*   Contributor: 
        -Đạt 
        -Tiến (10/11/2020 Start hooking BE to FE)
*/
import React from "react";
import "./styles/ExpressionReview.css";
<<<<<<< HEAD:src/pages/app/module_2/mode_epression/ExpressionReview.js
=======
import { EXPRESSION_REVIEW_DATA } from "../../../data/testing-data";
>>>>>>> main:src/pages/app/module_2/ExpressionReview.js



const ExpressionReview = (props) => {
<<<<<<< HEAD:src/pages/app/module_2/mode_epression/ExpressionReview.js
   const expressionReviewData = props.expressionReviewData;
   const expression_code = props.expression_code;
   const highlightedSlide = props.setHightlightedSlide;
=======
>>>>>>> main:src/pages/app/module_2/ExpressionReview.js
    const renderExpressionHeader = () => {
        let headerElement = ['Code', 'Description'];
        return headerElement.map( (key, index) => {
            return (
                <th key={index}> {key}</th>
                
            )
        })
       }
       
<<<<<<< HEAD:src/pages/app/module_2/mode_epression/ExpressionReview.js
    
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
    
=======
       const renderExpressionBody = () => {
       return EXPRESSION_REVIEW_DATA && EXPRESSION_REVIEW_DATA.map(({slide_index,slide_question, slide_note, slide_options}) => {
           return (
               <tbody>
                 <tr key = {slide_index}>
               <td className ="slide--index">S{slide_index}</td>
               <td>{slide_question}</td> 
           </tr>
           <tr>
            <td> </td>
           <td className ="slide--note">{slide_note}</td>
           </tr> 
           {slide_options.map(({option_index, option_description}) =>
           {
               return(
                   <tr key = {option_index}>
                       <td className ="option--index">{option_index}</td>
                       <td>
                           
               <li>{option_description}</li>
                        
                       </td>
                   </tr>
               )
           }
           )}
           
               </tbody>
          
           
           )
       })
       }
>>>>>>> main:src/pages/app/module_2/ExpressionReview.js

return(
    <div className="quota-management-page--expression-review">
    <table className="quota-management-page--expression-review--tables">
        <thead>
        {renderExpressionHeader()}
        </thead>
<<<<<<< HEAD:src/pages/app/module_2/mode_epression/ExpressionReview.js

        {/* The code and the discription  */}
        <tr>
            <td className ="slide--index">{expression_code}</td>
            <td>{expressionReviewData.description}</td>
        </tr>

        {/* Render layout_left body */}
        {renderExpressionBody(highlightedSlide)}
=======
        
        {renderExpressionBody()}
        
      
        
>>>>>>> main:src/pages/app/module_2/ExpressionReview.js
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