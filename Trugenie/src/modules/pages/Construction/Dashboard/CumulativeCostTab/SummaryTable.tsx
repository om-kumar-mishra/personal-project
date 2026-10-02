import React, { useMemo } from "react";
import { customStyle } from "../style";
import SummaryMultiFeatureTable from "../table/SummaryMultiFeatureTable";
import { ConstructionCumulativeCostSummaryList } from "../../../../../lib/services/constructionDashboardv2/dataType";
import { numberWithCommasAndFraction } from "../../../../../widgets/charts/Recharts/utils";

interface SummaryTableProps {
  activeBtn: string;
  data: ConstructionCumulativeCostSummaryList[][];
}
const SummaryTable: React.FC<SummaryTableProps> = ({ data, activeBtn }) => {
  const tableData = useMemo(() => {
    return {
      id: "summaryTable-constructionActivity-construction",
      columns: [
        // {
        //   name: "Product Type",
        //   key: "productType",
        //   rowSpan: true,
        //   totalColSpan: 3,
        // },
        {
          name: "Cost Head",
          key: "costHead",
          // rowSpan: true,
          totalColSpan: 2,
        },
        {
          name: "Activity Head",
          key: "activityHead",
        },
        {
          name: "Pre Investment",
          key: "preInvestment",
          calTotal: true,
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          name: "Post Investment",
          key: "postInvestment",
          calTotal: true,
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          name: "Total",
          key: "total",
          calTotal: true,
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          name: activeBtn,
          key: activeBtn !== "UnderWritten" ? "businessPlanBalanceCost" : "underwrittenBalanceCost",
          calTotal: true,
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          name: "Actual/Anticipated",
          key: "businessPlanActualAnticipatedBalanceCost",
          calTotal: true,
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          name: activeBtn,
          key: activeBtn !== "UnderWritten" ? "businessPlanTotalCost" : "underwrittenTotalCost",
          calTotal: true,
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          name: "Actual/Anticipated",
          key: "underwrittenActualAnticipatedTotalCost",
          calTotal: true,
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
        {
          name: `w.r.t. ${activeBtn}`,
          key: activeBtn !== "UnderWritten" ? "businessPlanvariance" : "underwrittenvariance",
          calTotal: true,
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
        },
      ],
      data: data.length > 0 ? data : [],
    };
  }, [data, activeBtn]);

  const upperHeader = () => {
    const head = ["Balance Cost", "Total Cost"];
    return (
      <tr>
        <td colSpan={2}></td>
        <td style={customStyle.summarySubHeader} colSpan={3}>
          Cost Incurred till Date
        </td>
        {head.map((v, i) => (
          <td key={`${v}-${i}`} style={customStyle.summarySubHeader} colSpan={2}>
            {v}
          </td>
        ))}
        <td style={customStyle.summarySubHeader}>Variance</td>
      </tr>
    );
  };

  return (
    <>
      <div className='sales-graph-heading'>Summary</div>
      <div className='sales-graph-border col-md-12 col-sm-12 mt-4'>
        <SummaryMultiFeatureTable
          tableData={tableData}
          headerColorClass='active-red'
          height='350px'
          tableClasses='table table-bordered-0 text-center'
          upperHeader={upperHeader}
          // showSubTotal
          showTotal
          showTotalAbove
        />
      </div>
    </>
  );
};

export default SummaryTable;
