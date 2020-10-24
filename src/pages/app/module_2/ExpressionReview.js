import React from "react";
import "./styles/ExpressionReview.css";
import { EXPRESSION_REVIEW_DATA } from "../../../data/testing-data";



const ExpressionReview = (props) => {
    const renderExpressionHeader = () => {
        let headerElement = ['code', 'Description'];
        return headerElement.map( (key, index) => {
            return <th key={index}> {key}</th>
        })
       }
       
       const renderExpressionBody = () => {
       return EXPRESSION_REVIEW_DATA && EXPRESSION_REVIEW_DATA.map(({slide_index,slide_question, slide_note, slide_options}) => {
           return (
               <tbody>
                 <tr key = {slide_index}>
               <td>S{slide_index}</td>
               <td>{slide_question}</td> 
           </tr>
           <tr>
            <td> </td>
           <td>{slide_note}</td>
           </tr> 
           {slide_options.map(({option_index, option_description}) =>
           {
               return(
                   <tr key = {option_index}>
                       <td>{option_index}</td>
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
    <table>
        <thead>
        {renderExpressionHeader()}
        </thead>
      
        {renderExpressionBody()}
        
      
        
    </table>
)
}
export default ExpressionReview;