/*
 *Contributor: Tien 30/10/2020
 *Main function: render layout left 
 */

 //Packages
import React from "react";


//Styles
import "./styles/ExceededLeft.css";


const ExceededLeft =(props)=>{
    const exceededLeft= props.exceededLeft;
    const exceededLeftHeader=props.exceededLeftHeader ;
    const exceededLeftSex = props.exceededLeftSex
    const renderHeaderLayoutLeft =() =>{
        return exceededLeftHeader && exceededLeftHeader.map(({quota_index,quota_label,exceeded_sex})=>
        {
            return ((
            <th className="header-left" key={quota_index}> {quota_label}</th>
            
            ))
        })
    }
    
    const renderExceedBodyLeft =()=>{
        return exceededLeft && exceededLeft.map(({ type_index,type_car})=>{
            return(
                    <tr key={type_index}>
                        <td className="body-exceeded-left">{type_car}</td>
                        <td><input/></td>
                        <td><input/></td>
                        <td><input/></td>
                        <td><input/></td>
                        <td><input/></td>
                        <td><input/></td>
                    </tr>
            )})
    }
    return(
        <div className="main-table">
            <table>
                <thead>
                    <tr>
                        <th className=""></th>
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