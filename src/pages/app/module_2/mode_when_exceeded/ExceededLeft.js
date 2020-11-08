/*
 *Contributor: Tien 30/10/2020
 *Main function: render layout left 
 */

 //Packages
import React from "react";


//Styles
import "./styles/ExceededLeft.css";


const ExceededLeft =(props)=>{
    const sendDataParent= (e)=>{
        props.onChoosingCell(e);
    }
    const exceededLeft= props.exceededLeft;
    const exceededLeftHeader=props.exceededLeftHeader ;
    const exceededLeftSex = props.exceededLeftSex;
    // let type_car=e.target.parentNode.childNodes[0].innerText;
    const renderHeaderLayoutLeft =() =>{
        return exceededLeftHeader && exceededLeftHeader.map(({quota_index,quota_label})=>
        {
            return ((
            <th 
                className="header-left" 
                key={quota_index}
                onClick ={(e)=>{
                    // console.log("p1",e.target.innerText)
                    // sendDataParent("p21",e.target.innerText);
                }}

            > 
                {quota_label}
            </th>
            
            ))
        })
    }
    
    const renderExceedBodyLeft =()=>{
       
        return exceededLeft && exceededLeft.map(({ type_index,type_car,check})=>{
            return(
                    <tr key={type_index}>
                        <td className="body-exceeded-left">{type_car}</td>
                        {check.map((count) => {
                            return(
                            <td
                                className="cell"
                                onClick = {(e) => {
                                    sendDataParent(e);
                                }}
                            >
                                {count}
                            </td>
                        )}
                        )}
                        
                    </tr>
            )})
    }
    return(
        <div className="main-table">
            <table>
                <thead>
                    <tr>
                        <td></td>
                        {renderHeaderLayoutLeft()}
                    </tr>
                </thead>
                <tbody>
                    {renderExceedBodyLeft()}
                    
                </tbody>
                
                
            </table>
        </div>
    )

}
export default ExceededLeft;