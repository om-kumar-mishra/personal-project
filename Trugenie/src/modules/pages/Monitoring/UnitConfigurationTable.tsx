/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { numberWithCommasAndFraction } from "../../../widgets/charts/Recharts/utils";
import SimpleTable from "../../../widgets/tables/SimpleTable";

const UnitConfigurationTable:React.FC<{
    data:any[];
}> = ({data}) => {

    // data: [
    //     {
    //         column1: "1 BHK",
    //         column2: 534,
    //         column3: -3702.97,
    //         column4: 0.2,
    //     },
    //     {
    //         column1: "1 RK",
    //         column2: 425,
    //         column3: -3702.97,
    //         column4: 0.16,
    //     },
    //     {
    //         column1: "2 BHK",
    //         column2: 766,
    //         column3: -3702.97,
    //         column4: 0.28,
    //     },
    // ],

    const unitConfigurationData = useMemo(() => {
        return{
            id: "UnitConfiguration-table",
            columns: [
                { key: "unittype", name: "UNIT TYPE" },
                {
                    key: "AvgSaleablearea", 
                    name: "AVG SALEABLE AREA",
                    formatValue: (value: number) =>
                        `${numberWithCommasAndFraction(
                            value,
                            import.meta.env.VITE_REACT_APP_AREA_DECIMAL
                        )}`,
                },
                {
                    key: "Sellingrate",
                    name: "SELLING RATE",
                    formatValue: (value: number) =>
                        `${numberWithCommasAndFraction(
                            value,
                            import.meta.env.VITE_REACT_APP_INR_DECIMALS
                        )}`,
                },
                {
                    key: "Ticket Size", 
                    name: "TICKET SIZE",
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
                <div className="sales-graph-heading">Unit Configuration</div>
                <div className="p-3">
                    <SimpleTable
                        tableData={unitConfigurationData}
                        headerColorClass="active-blue"
                        height="310px"
                    />
                </div>
            </div>
        </>
    )
}

export default UnitConfigurationTable;
