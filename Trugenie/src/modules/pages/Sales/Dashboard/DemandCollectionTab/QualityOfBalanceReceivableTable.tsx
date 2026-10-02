import React from "react";
import SimpleTable from "../../../../../widgets/tables/SimpleTable";
import { numberWithCommasAndFraction } from "../../../../../widgets/charts/Recharts/utils";
import { QualityOfBalanceRecivablesTableResponseType } from "../../../../../lib/services/salesDashboard/dataTypes";
import { useSelector } from "react-redux";
import { getNumberSystem } from "../../../../../lib/services/common/selector";

interface QualityOfBalanceReceivableTableProps {
  data: QualityOfBalanceRecivablesTableResponseType[];
}

const QualityOfBalanceReceivableTable: React.FC<
  QualityOfBalanceReceivableTableProps
> = ({ data }) => {
  const numberSystem = useSelector(getNumberSystem);
  const tableData = {
    id: "QualityOfBalanceReceivableTable",
    columns: [
      {
        name: "Days for which demanded is overdue",
        key: "daysForWhichAmountDemandedIsOverdue",
        // type: "string",
        notCheckZero: true,
      },
      {
        name: `Sale Value (${numberSystem})`,
        key: "saleValue",
        calTotal: true,
        formatValue: (value: number) =>
          `${numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS
          )}`,
      },
      {
        name: `Demanded (${numberSystem})`,
        key: "demanded",
        calTotal: true,
        formatValue: (value: number) =>
          `${numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS
          )}`,
      },
      {
        name: `Collected (${numberSystem})`,
        key: "collected",
        calTotal: true,
        formatValue: (value: number) =>
          `${numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS
          )}`,
      },
      {
        name: "Collection %",
        key: "collectionEfficency",
        calTotal: true,
        formatValue: (value: number) =>
          `${numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
          )}`,
      },
      {
        name: `Overdue (${numberSystem})`,
        key: "overdue",
        calTotal: true,
        formatValue: (value: number) =>
          `${numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS
          )}`,
      },
      {
        name: `Total Balance Receivable (${numberSystem})`,
        key: "totalBalanceReceivable",
        calTotal: true,
        formatValue: (value: number) =>
          `${numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS
          )}`,
      },
    ],
    data,
  };
  return (
    <div className="sales-graph-border">
      <SimpleTable
        tableData={tableData}
        headerColorClass="active-red"
        height="320px"
        showTotal
        tableClasses="table table-bordered-0 text-center"
      />
    </div>
  );
};

export default QualityOfBalanceReceivableTable;
