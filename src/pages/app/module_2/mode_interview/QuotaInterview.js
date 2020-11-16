//Packages
import React from "react";
import InterviewRow from "./InterviewRow";
import {EXCEEDED_LAYOUT_LEFT} from "../../../../data/testing-data";
//Styles
import "./styles/QuotaInterview.css";


const QuotaInteview = (props)=>{

    
    const onChangeNav=(e)=>{  props.history.push(`/${e.target.value}`) }
    const renderHeader = () => {
        let headerElement = ['Name', 'Completed']

        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }
   
    return(
        <div className="interview">
            <div className="interview interview-bar">
                <h2 className="h2-interview">
                    QUOTA SETTINGS
                    
                </h2>
               
                <div className="mode-interview">
                    Mode: 
                </div>
                    <select className="select" onChange={onChangeNav} /*value={}*/>
                        <option
                            value=""
                        > 
                            Expression 
                        </option>
                        <option 
                            value="editing"
                        >
                            Editing 
                        </option>
                        <option
                            value="exceeded"
                        >
                            When Exceeded 
                        </option>
                        <option 
                            value="tracking"
                        >
                            Tracking
                        </option>
                        <option
                            value="interview"
                        >
                            Interview Preview
                        </option>
                    </select>
            </div>
            <div id="prev">
                    <table id="table-prev">
                        <thead>
                            <tr>{renderHeader()}</tr>
                        </thead>
                        <tbody>
                            <InterviewRow
                                exceededLeft={EXCEEDED_LAYOUT_LEFT}
                            />
                            <InterviewRow
                                exceededLeft={EXCEEDED_LAYOUT_LEFT}
                            />
                            <InterviewRow
                                exceededLeft={EXCEEDED_LAYOUT_LEFT}
                            />

                        </tbody>
                    </table>
                       

            </div>
        </div>
    );
};

export default QuotaInteview;