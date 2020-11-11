import React, { useState } from 'react'

export default function QuotaRow(props){

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