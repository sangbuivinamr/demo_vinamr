//Packages
import React from "react";
import EditingTable from "../../../../components/app/EditingTable";
import { EDITING_TABLE_DATA } from "../../../../data/testing-data";

//Styles
import "./styles/QuotaTracking.css";


const QuotaTracking = (props)=>{
    return(
        <div>
            <EditingTable
                editingTableData = {EDITING_TABLE_DATA}
                onRenderingHeader ={true}
            />
        </div>
    );
};

export default QuotaTracking;