import React from 'react';
import "./styles/EditingTable.css";
const EditingTable = (props) => {
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
    const handelTotal = (props) =>{
        return props.reduce((first,last) => first + last,0)
    }
    const renderExceedBodyLeft =()=>{
            
        return exceededLeft && exceededLeft.map(({ type_index,type_car,quotaData})=>{
            return(
                    <tr key={type_index}>
                        <td className="body-exceeded-left">{type_car}</td>
                        {quotaData.map((data) => {
                            return(
                                <td className="cell">
                                    {data}
                                </td>
                            )
                        })}
                        <td className="header-left-total">{handelTotal(quotaData)}</td>
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
                        <td className="header-left-total"> Total</td>
                    </tr>
                </thead>
                <tbody>
                    {renderExceedBodyLeft()}
                    
                </tbody>
                
                
            </table>
        </div>
    )
}

export default EditingTable;