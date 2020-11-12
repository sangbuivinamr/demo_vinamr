//Packages
import React from "react";


//Styles
import "./styles/InterviewRow.css";


const InterviewRow =(props)=>{
    const exceededLeft= props.exceededLeft;
    let completed=[15];
        return exceededLeft && exceededLeft.map(({ type_index,type_car})=>{
            return(
                    <tr
                        key={type_index}
                        id="t-row"
                    >
                        <td id="td-1">
                            <div id="col-name">
                                <img 
                                    alt="" 
                                    src={require("../../../../assets/images/prev.png")}
                                    className="icon-finish"
                                />
                                <p>{type_car}</p>
                            </div>
                        </td>
                        {completed.map((test)=>{
                            return(
                            <td id="td-2">
                                <p>{test}</p>
                            </td>
                            )
                        })}
                    </tr>
            )
        })
}
export default InterviewRow;