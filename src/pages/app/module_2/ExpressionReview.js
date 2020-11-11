import React from "react";
import "./styles/ExpressionReview.css";
import { EXPRESSION_REVIEW_DATA } from "../../../data/testing-data";



const ExpressionReview = (props) => {
    const renderExpressionHeader = () => {
        let headerElement = ['Code', 'Description'];
        return headerElement.map( (key, index) => {
            return <th key={index}> {key}</th>
        })
       }
       
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

return(
    <div className="quota-management-page--expression-review">
    <table className="quota-management-page--expression-review--tables">
        <thead>
        {renderExpressionHeader()}
        </thead>
        
        {renderExpressionBody()}
        
      
        
    </table>
    </div>
)
}
export default ExpressionReview;