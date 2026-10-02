/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { numberWithCommasAndFraction } from "../../../widgets/charts/Recharts/utils";
import SimpleTable from "../../../widgets/tables/SimpleTable"

const InventoryStatusTable:React.FC<{
    data:any[];
}> = ({data}) => {
 
    // data: [
    //     {
    //         column1: "Total Residential and Commercial",
    //         column2: 531,
    //         column3: 283738,
    //     },
    //     {
    //         column1: "Total Residential",
    //         column2: 531,
    //         column3: 283738,
    //     },
    //     {
    //         column1: "Total Commercial",
    //         column2: "0",
    //         column3: "",
    //     },
    //     {
    //         column1: "Sold Residential",
    //         column2: 282,
    //         column3: 141700,
    //     },
    //     {
    //         column1: "Sold Commercial",
    //         column2: "0",
    //         column3: "",
    //     },
    //     {
    //         column1: "UnSold Residential",
    //         column2: 249,
    //         column3: 142038,
    //     },
    //     {
    //         column1: "UnSold Commercial",
    //         column2: "0",
    //         column3: "",
    //     },
    // ],
    
    const inventoryStatusData = useMemo(() => {
        return{
            id: "InventoryStatus-table",
        columns: [
            { key: "type", name: "TYPE" },
            {
                key: "units",
                name: "UNITS",
                formatValue: (value: number) =>
                    `${numberWithCommasAndFraction(
                        value,
                        import.meta.env.VITE_REACT_APP_UNIT_DECIMAL
                    )}`,
            },
            {
                key: "area",
                name: "AREA",
                formatValue: (value: number) =>
                    `${numberWithCommasAndFraction(
                        value,
                        import.meta.env.VITE_REACT_APP_AREA_DECIMAL
                    )}`,
            },
        ],
        data
        }
    },[data]);

    return (
        <>
            <div className="sales-graph-border">
                <div className="sales-graph-heading">Inventory Status</div>
                <div className="p-3">
                    <SimpleTable
                        tableData={inventoryStatusData}
                        headerColorClass="active-blue"
                        height="350px"
                        // alignFirstColumnLeft={true}
                    />
                </div>
            </div>
        </>
    )
}

export default InventoryStatusTable;