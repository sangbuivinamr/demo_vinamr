/*
* Contributor: 
    - Tiến 13/11/2020
*Main Function: render module_4
*/

//Packages
import React, {useState} from "react";
import {AiFillCaretRight,AiFillCaretDown} from "react-icons/ai";
//Styles
import "./RawData.css";

const RawData = (props) => {
    const [clicked,setClicked] =useState(true);
    const changeIcon =() => {
        setClicked(!clicked)
        return !clicked === false ? <div><i><AiFillCaretDown/></i></div> :null
    }
    console.log("tuu",!clicked)
  return (
    <div className="raw-data">
      <div className="content-raw-data">
        <h1 className="header">{"[Project Name 2]"}</h1>
        <div className="text-list">
          <p className="total">Total: {"905"} | </p>
          <p className="total">Quota Counted Interviews: {"701"} | </p>
          <p className="cancel">
            Cancelled Interview: <strong>{"132"}</strong> |{" "}
          </p>
          <p className="total">Not Completed Interviews: {"72"} | </p>
          <p className="approved">
            Approved: <strong>{"627"}</strong> |{" "}
          </p>
          <p className="p-w">
            Pending FW: <strong>{"60"}</strong> |{" "}
          </p>
          <p className="pending-qc-1">
            Pending QC {"(1)"}: <strong>{"4"}</strong> |{" "}
          </p>
          <p className="pending-qc-2">
            Pending QC {"(2)"}: <strong>{"10"}</strong>{" "}
          </p>
        </div>
        <div className="buttons-4">
          <div className="button-1"> Select All</div>
          <div className="button-2"> Select Visible Rows</div>
          <div className="button-3"> Change Interview Status</div>
          <div className="button-1">Export Data</div>
        </div>
        <div className = "content-area"> 
            <div id= "first-tab">
                <div className = "first"> 
                
                    <h3 className = "header-first">Quota Counted Interviews</h3>
                    <AiFillCaretRight className="icon-4" onClick={()=> {changeIcon(clicked)}} />
                </div>
                <div className = "tab-1"></div>
            </div>
            <div id = "second-tab"> 
              <div className="second">
                <h3 className= "header-first" >Cancelled Interviews</h3>
                <AiFillCaretRight className="icon-4" onClick={()=> {changeIcon(clicked)}} />
              </div>
            </div>
            <div id = "third-tab"> 
              <div className="third">
                <h3 className= "header-first" >Not Completed Interviews</h3>
                <AiFillCaretRight className="icon-4" onClick={()=> {changeIcon(clicked)}} />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
export default RawData;
