import React from 'react';
import "./styles/EditingTable.css";
const EditingTable = () => {
    const renderHeader = () => {
        let headerElement = ['Rows', 'Columns']

        return headerElement.map((key, index) => {
            return <th key={index} style={{width: (index===0 && "50%") || (index==1 && "50%")}}>{key}</th>
        })
    }
    return(<table id='quota-label-selection-table'>
    <thead>
        <tr>{renderHeader()}</tr>
    </thead>
    <tbody className="quota-label-selection-table--body">
      
        
        
    </tbody>
</table>)
}

export default EditingTable;