/*
    *Contributor:Tien 24/10/2020
    *Function: render the default bar
*/

//Packages

import React from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import {IoIosArrowRoundDown} from "react-icons/io";
import {IoMdClose} from "react-icons/io";
import {IoIosSave} from "react-icons/io";


//Styles
import "./app/styles/DefaultBarStyles.css";

const DefaultBar =(props)=>{
    return(
        <div className="quota-page default-bar">
                <h2 className="h2-default">
                    QUOTA SETTINGS
                </h2>
                <div className="up">
                    <i>
                    <IoIosArrowRoundUp
                        className="up icon"
                    />
                    </i>
                </div>
                <div className="up">
                    <i>
                    <IoIosArrowRoundDown
                        className="up icon"
                    />
                    </i>
                </div>
                <div className="up">
                    <i>
                    <IoMdClose
                        className="up icon"
                    />
                    </i>
                </div>
                <div className="up">
                    <i>
                    <IoIosSave
                        className="up icon"
                    />
                    </i>
                </div>
                <div className="mode">
                    Mode:
                </div>
                    <select className="select">
                        <option value="Expression"> Expression </option>
                        <option value="Editing"> Editing </option>
                        <option value="When Exceeded"> When Exceeded </option>
                        <option value="Tracking"> Tracking </option>
                    </select>
                <div className="expression-review">
                    <h2 className="review">
                        EXPRESSION REVIEW
                    </h2>
                    <p>Silde 05/334</p>
                </div>
            </div>


    );
};
export default DefaultBar;