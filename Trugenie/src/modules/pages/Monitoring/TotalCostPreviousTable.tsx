/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { numberWithCommasAndFraction } from "../../../widgets/charts/Recharts/utils";
import SimpleTable from "../../../widgets/tables/SimpleTable";

const TotalCostPreviousTable:React.FC<{
    data:any[];
}> = ({data}) => {
   
    // data: [
    //     {
    //         column1: "Cost of Land",
    //         column2: 9.73,
    //         column3: 8.23,
    //         column4: 1.5,
    //     },
    //     {
    //         column1: "Cost of Construction",
    //         column2: 54.03,
    //         column3: 33.47,
    //         column4: 20.56,
    //     },
    //     {
    //         column1: "Cost of Approval",
    //         column2: 7,
    //         column3: 1.25,
    //         column4: 5.75,
    //     },
    //     {
    //         column1: "Sales Expenses /Brokerage",
    //         column2: 7.22,
    //         column3: 2.99,
    //         column4: 4.23,
    //     },
    //     {
    //         column1: "Admin Expenses",
    //         column2: 4.05,
    //         column3: 2.12,
    //         column4: 1.93,
    //     },
    //     {
    //         column1: "Other expenses",
    //         column2: 7.57,
    //         column3: 0.03,
    //         column4: 7.54,
    //     },
    // ],

    const TotalCostPreviousData= useMemo(() => {
        return{
            id: "TotalCostPrevious-table",
            columns: [
                { key: "Particulars", name: "PARTICULARS" },
                {
                    key: "TotalCost",
                    name: "TOTAL COST",
                    formatValue: (value: number) =>
                        `${numberWithCommasAndFraction(
                            value,
                            import.meta.env.VITE_REACT_APP_INR_DECIMALS
                        )}`,
                },
                {
                    key: "TotalIncurred",
                    name: "TOTAL INCURRED",
                    formatValue: (value: number) =>
                        `${numberWithCommasAndFraction(
                            value,
                            import.meta.env.VITE_REACT_APP_INR_DECIMALS
                        )}`,
                },
                {
                    key: "TobeIncurred",
                    name: "TO BE INCURRED",
                    formatValue: (value: number) =>
                        `${numberWithCommasAndFraction(
                            value,
                            import.meta.env.VITE_REACT_APP_INR_DECIMALS
                        )}`,
                },
            ],
            data
        }
    },[data])

    return (
        <>
            <div className="sales-graph-border">
                <div className="sales-graph-heading">Total Cost Previous</div>
                <div className="p-3">
                    <SimpleTable
                        tableData={TotalCostPreviousData}
                        headerColorClass="active-blue"
                        height="310px"
                    />
                </div>
            </div>
        </>
    )
}

export default TotalCostPreviousTable;