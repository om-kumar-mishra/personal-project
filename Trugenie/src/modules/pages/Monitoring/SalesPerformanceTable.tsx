/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { numberWithCommasAndFraction } from "../../../widgets/charts/Recharts/utils";
import SimpleTable from "../../../widgets/tables/SimpleTable"
import { SalesPerformance } from "../../../lib/services/HDFC/MonitoringSheet/dataTypes";
import { convertDateFormatYY } from "../../../utils/commonFunctions";

const SalesPerformanceTable: React.FC<{
    data: SalesPerformance[];
}> = ({ data }) => {

    // data: [
    //     {
    //         column1: "Mar 23",
    //         column2: 12,
    //         column3: 6835,
    //         column4: 25699935.76,
    //         column5: 3760.05,
    //         column6: -4154012,
    //     },
    //     {
    //         column1: "Feb 23",
    //         column2: 12,
    //         column3: 6115,
    //         column4: 22166014.17,
    //         column5: 3624.86,
    //         column6: -5981544.94,
    //     },
    //     {
    //         column1: "Jan 23",
    //         column2: 9,
    //         column3: 4105,
    //         column4: 15793095.72,
    //         column5: 3847.28,
    //         column6: -2257241.05,
    //     },
    //     {
    //         column1: "Dec 22",
    //         column2: 2,
    //         column3: 865,
    //         column4: 3268430.7,
    //         column5: 3778.53,
    //         column6: -2343029.5,
    //     },
    //     {
    //         column1: "Nov 22",
    //         column2: 5,
    //         column3: 2770,
    //         column4: 10200510.15,
    //         column5: 3682.49,
    //         column6: -2303862.57,
    //     },
    //     {
    //         column1: "Oct 22",
    //         column2: 10,
    //         column3: 6080,
    //         column4: 22000448.17,
    //         column5: 3618.49,
    //         column6: -7093762.32,
    //     },
    // ],

    const salesPerformanceData = useMemo(() => {
        return {
            id: "sales-performance-table",
            columns: [
                { key: "date", name: "DATE",formatValue: (value: string) => `${convertDateFormatYY(value)}`, },
                {
                    key: "netsold",
                    name: "NET SOLD",
                    formatValue: (value: number) =>
                        `${numberWithCommasAndFraction(
                            value,
                            import.meta.env.VITE_REACT_APP_UNIT_DECIMAL
                        )}`,
                },
                {
                    key: "areasold",
                    name: "AREA SOLD",
                    formatValue: (value: number) =>
                        `${numberWithCommasAndFraction(
                            value,
                            import.meta.env.VITE_REACT_APP_AREA_DECIMAL
                        )}`,
                },
                {
                    key: "salevalue",
                    name: "SALE VALUE",
                    formatValue: (value: number) =>
                        `${numberWithCommasAndFraction(
                            value,
                            import.meta.env.VITE_REACT_APP_AREA_DECIMAL
                        )}`,
                },
                {
                    key: "SellingRateAchieved",
                    name: "SELLING RATE ACHIEVED",
                    formatValue: (value: number) =>
                        `${numberWithCommasAndFraction(
                            value,
                            import.meta.env.VITE_REACT_APP_INR_DECIMALS
                        )}`,
                },
                {
                    key: "collections",
                    name: "COLLECTIONS",
                    formatValue: (value: number) =>
                        `${numberWithCommasAndFraction(
                            value,
                            import.meta.env.VITE_REACT_APP_INR_DECIMALS
                        )}`,
                },
            ],
            data
        };
    }, [data]);

    return (
        <>
            <div className="sales-graph-border">
                <div className="sales-graph-heading">Sales Performance</div>
                <div className="p-3">
                    <SimpleTable
                        tableData={salesPerformanceData}
                        headerColorClass="active-blue"
                        height="310px"
                    />
                </div>
            </div>
        </>
    )
}

export default SalesPerformanceTable;