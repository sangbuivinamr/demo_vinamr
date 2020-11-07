import React from "react";
import "./styles/ExpressionReview.css";




const ExpressionReview = (props) => {
   const expressionReviewData = props.expressionReviewData;
   const highlightedSlide = props.setHightlightedSlide;
    const renderExpressionHeader = () => {
        let headerElement = ['Code', 'Description'];
        return headerElement.map( (key, index) => {
            return <th key={index}> {key}</th>
        })
       }
       
       const renderExpressionBody = (selectedSlideIndex) => {
  
       return expressionReviewData && expressionReviewData.map(({slide_index,slide_question, slide_note, slide_options}) => {
        if (slide_index ===selectedSlideIndex)   
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
                           <ul>
                                <li>{option_description}</li>
                           </ul>
                       </td>
                   </tr>
               )
           }
           )}
           
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
        
        {renderExpressionBody(highlightedSlide)}
        
      
        
    </table>
    </div>
)
}
export default ExpressionReview;