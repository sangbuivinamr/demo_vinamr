/*
 * Contributor: 
    Khánh
    Tiến 10/11/2020 (Start hooking BE to FE)
 */

//Packages
import React from 'react';
/**
 * @summary Render each row in the table
 * @param {object} props The props of QuotaRow component
 */
export default function QuotaRow(props){
    // PROPS
    // quotaData: fixed data of the table
    // onChoosingQuota: onClick a row in the table
    // quotaClickStatus: status of the clicked row

    return props.quotaData && props.quotaData.map(({ name, expression }) => {
        return (
            <tr

                key={name} 
                onClick={() => props.onChoosingQuota(name)} 
                style={{backgroundColor: props.quotaClickStatus.status && props.quotaClickStatus.quotaLabel === name && "#7B2025" }}

            >
                <td>{name}</td>
                <td>{expression}</td>
            </tr>
        )
    })
}