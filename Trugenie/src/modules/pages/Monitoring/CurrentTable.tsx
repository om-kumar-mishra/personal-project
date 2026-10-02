/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { TotalCost } from "../../../lib/services/HDFC/MonitoringSheet/dataTypes";
import { numberWithCommasAndFraction } from "../../../widgets/charts/Recharts/utils";
import SimpleTable from "../../../widgets/tables/SimpleTable";
import {getPresentableValue } from "../../Components/UtilityFunctions";

const CurrentTable: React.FC<{
  data: TotalCost[];
}> = ({ data }) => {
  // data: [
  //     {
  //         column1: 89.5965,
  //         column2: 50.987,
  //         column3: 38.6095,
  //         column4: 49.83,
  //         column5: 27.91,
  //         column6: 29.84,
  //         column7: 1.93,
  //         column8: 19.99,
  //         column9: 52.6,
  //         column10: 74.52,
  //         column11: 35.9105,
  //         column12: -10.28,
  //         column13: 3.4932,
  //     },
  // ],

  const CurrentTableData = useMemo(() => {
    return {
      id: "Current-table",
      columns: [
        {
          key: "projectcost",
          name: "PROJECT COST",
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          key: "costincurred",
          name: "COST INCURRED",
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          key: "BalanceCost",
          name: "BALANCE COST",
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          key: "SoldValue",
          name: "SOLD VALUE",
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          key: "AmountReceived",
          name: "AMOUNT RECEIVED",
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          key: "AmountDemanded",
          name: "AMOUNT DEMANDED",
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          key: "Balancetobereceived",
          name: "BALANCE TO BE RECEIVED",
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          key: "Balancetobedemanded",
          name: "BALANCE TO BE DEMANDED",
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          key: "Salesproceedunsoldunits",
          name: "SALES PROCEED UNSOLD UNITS",
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          key: "Totalreceivables",
          name: "TOTAL RECEIVABLES",
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          key: "NetSurplus",
          name: "NET SURPLUS",
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          key: "LoanOutStanding",
          name: "LOAN OUT STANDING",
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          key: "CashFlowCover",
          name: "CASH FLOW COVER",
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
      ],
      data,
    };
  }, [data]);

  return (
    <>
      <div className='sales-graph-border'>
        <div className='sales-graph-heading'>Current {data[0]?.Misdate ? getPresentableValue(data[0]?.Misdate, true, false, false) : ""}</div>
        <div className='p-3'>
          <SimpleTable tableData={CurrentTableData} headerColorClass='active-blue' height='250px' />
        </div>
      </div>
    </>
  );
};

export default CurrentTable;
