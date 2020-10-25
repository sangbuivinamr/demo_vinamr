import React, { useState } from 'react'

export default function QuotaRow(props){

    const [quotaClickStatus, setQuotaClickStatus] = useState({
        id: "",
        status: false
    })

    const onChoosingQuota = (quotaId) => {

        let newQuotaStatus = {
            id: quotaId,
            status: true
        }
        setQuotaClickStatus(newQuotaStatus);
    }

    const onResetQuotaClickStatus = () => setQuotaClickStatus({
        id: "",
        status: false
    })

    return props.quotaData && props.quotaData.map(({ quota_label, quota_expression }) => {
        return (
            <tr 
                key={quota_label} 
                onClick={() => onChoosingQuota(quota_label)} 
                style={{backgroundColor: quotaClickStatus.status && quotaClickStatus.id === quota_label && "#7B2025" }}
            >
                <td>{quota_label}</td>
                <td>{quota_expression}</td>
            </tr>
        )
    })
}