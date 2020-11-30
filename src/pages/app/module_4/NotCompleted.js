/*
* Contributor: 
    - Tiến 14/11/2020
*/

//Packages
import React from "react";
import HeaderRawData from "../../../components/app/HeaderRawData";
import { Link } from "react-router-dom";

//Styles
import "./styles/NotCompleted.css";

const NotCompleted = (props) => {
  let bodyNotCompleted = props.bodyNotCompleted;
  const renderBody = () => {
    return (
      bodyNotCompleted &&
      bodyNotCompleted.map(
        (
          { interviewid, complete, curDate, Latitude, Longtitude, duration },
          index
        ) => {
          return (
            <tr key={index} className="body-counted">
              {complete === "Not Completed" ? <td>{interviewid}</td> : null}
              {complete === "Not Completed" ? <td>{complete}</td> : null}
              {complete === "Not Completed" ? <td> Terminate</td> : null}
              {complete === "Not Completed" ? <td>{curDate}</td> : null}
              {complete === "Not Completed" ? (
                <td>
                  <Link
                    to={{
                      pathname: "/preview",
                      state: { interviewid, complete },
                    }}
                  >
                    Link
                  </Link>
                </td>
              ) : null}
              {complete === "Not Completed" ? (
                <td>
                  {/* This link for photos */}
                  <Link
                    to={{
                      pathname: "/preview",
                      state: { interviewid, complete },
                    }}
                  >
                    Link
                  </Link>
                </td>
              ) : null}
              {complete === "Not Completed" ? <td>{Latitude}</td> : null}
              {complete === "Not Completed" ? <td>{Longtitude}</td> : null}
              {complete === "Not Completed" ? <td>{duration}</td> : null}
            </tr>
          );
        }
      )
    );
  };
  return (
    <div className="tab-3">
      <table className="table-3" id="3000">
        <HeaderRawData />
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};
export default NotCompleted;
