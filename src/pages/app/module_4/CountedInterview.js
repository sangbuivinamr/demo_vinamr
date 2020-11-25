//Packages
import React from "react";
import HeaderRawData from "../../../components/app/HeaderRawData";

//Styles
import "./styles/CountedInterview.css";

const CountedInterview = (props) => {
  const bodyCounted = props.bodyCounted;
  let optionCounted = props.selectedCounted;
  const onChangeOptionCounted = (optionCounted) => {
    props.onChangeOptionCounted(optionCounted);
  };
  const renderBody = () => {
    return (
      bodyCounted &&
      bodyCounted.map(
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
                  {optionCounted}
                  <select
                    className = "select-option-body"
                    value = {optionCounted}
                    onChange = {(optionCounted) =>
                      onChangeOptionCounted(optionCounted)
                    }
                  >
                    <option>Pending QC (1)</option>
                    <option>Pending FW</option>
                    <option>Pending QC (2)</option>
                    <option>Approved</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              ) : null}
              {complete === "Completed" ? <td>{curDate}</td> : null}
              {complete === "Completed" ? <td>Link</td> : null}
              {complete === "Completed" ? <td>Link</td> : null}
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
    <div className = "tab-1">
      <table className = "table-1">
        <HeaderRawData />
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};
export default CountedInterview;
