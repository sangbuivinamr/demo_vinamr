//Pakages
import React from "react";
import HeaderRawData from "../../../components/app/HeaderRawData";
import { Link } from "react-router-dom";

//Styles
import "./styles/CancelledInterview.css";

const CancelledInterview = (props) => {
  let optionCancel = props.selectedCancel;
  const status = props.status;
  const onChangeOptionCancel = (optionCancel) => {
    props.onChangeOptionCancel(optionCancel);
  };
  const bodyCancelled = props.bodyCancelled;
  const renderBody = () => {
    return (
      bodyCancelled &&
      bodyCancelled.map(
        (
          { interviewid, complete, curDate, Latitude, Longtitude, duration },
          index
        ) => {
          return (
            <tr key={index} className="body-counted">
              {complete === "Completed" ? <td>{interviewid}</td> : null}
              {complete === "Completed" ? <td>{complete}</td> : null}
              {complete === "Completed" ? (
                <td>
                  {optionCancel}
                  <select
                    className="select-option-body"
                    value={optionCancel}
                    onChange={(optionCounted) =>
                      onChangeOptionCancel(optionCounted)
                    }
                  >
                    {status &&
                      status.map((key) => {
                        return <option>{key}</option>;
                      })}
                  </select>
                </td>
              ) : null}
              {complete === "Completed" ? <td>{curDate}</td> : null}
              {complete === "Completed" ? (
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
              {complete === "Completed" ? (
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
              {complete === "Completed" ? <td>{Latitude}</td> : null}
              {complete === "Completed" ? <td>{Longtitude}</td> : null}
              {complete === "Completed" ? <td>{duration}</td> : null}
            </tr>
          );
        }
      )
    );
  };
  return (
    <div className="tab-2">
      <table className="table-2" id="2000">
        <HeaderRawData questionData={props.questionData} />
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};
export default CancelledInterview;
