//Packages
import React from "react";
import HeaderRawData from "../../../components/app/HeaderRawData";
import { Link } from "react-router-dom";

//Styles
import "./styles/CountedInterview.css";

const CountedInterview = (props) => {
  const bodyCounted = props.bodyCounted;
  console.log("CountedInterview",bodyCounted)
  const optionCounted = props.selectedCounted;
  const status = props.status;
  const onChangeOptionCounted = (optionCounted) => {
    props.onChangeOptionCounted(optionCounted);
  };
  const renderBody = () => {
    return (
      bodyCounted &&
      bodyCounted.map(
        (
          { interviewid, complete, curDate, Latitude, Longtitude, duration,stt },
          index
        ) => {
          return (
            <tr key={index} className="body-counted">
              {complete === "Completed" ? (
                <td className={1 === 2 ? "x" : "y"}>{interviewid}</td>
              ) : null}
              {complete === "Completed" ? <td>{complete}</td> : null}
              {complete === "Completed" ? (
                <td>
                  {optionCounted}
                  <select
                    className="select-option-body"
                    value={optionCounted}
                    onChange={(optionCounted) =>
                      onChangeOptionCounted(optionCounted)
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
                      state: { interviewid, complete,stt },
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
    <div className="tab-1">
      <table className="table-1" id="1000">
        <HeaderRawData questionName = {props.questionName} />
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};
export default CountedInterview;
