import React, { useState } from 'react'

/**
 * @summary Render each row in the table
 * @param {object} props The props of QuotaRow component
 */
export default function QuotaRow(props){

    // PROPS
    // quotaData: fixed data of the table
    // onChoosingQuota: onClick a row in the table
    // quotaClickStatus: status of the clicked row

    return props.quotaData && props.quotaData.map(({ quota_label, quota_expression }) => {
        return (
            <tr
                key={quota_label} 
                onClick={() => props.onChoosingQuota(quota_label)} 
                style={{backgroundColor: props.quotaClickStatus.status && props.quotaClickStatus.quotaLabel === quota_label && "#7B2025" }}
            >
                <td>{quota_label}</td>
                <td>{quota_expression}</td>
            </tr>
        )
    })
}