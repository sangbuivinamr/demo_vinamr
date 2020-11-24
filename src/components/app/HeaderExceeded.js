/**
 * Contributor: Tiến 16/11/2020
 * Main function: Render header of table
 */

import React from "react";

export default function HeaderExceeded(props) {
    const headerExceeded =  props.dataHeader;
      return headerExceeded && headerExceeded.map(({text,uniqueID}) => {
        return (
          <th className="header-left" key = {uniqueID}>
            {text}
          </th>
        );
      })
  
  
}
