import React, { useMemo } from "react";
import SummaryMultiFeatureTable from "../table/SummaryMultiFeatureTable";
import { customStyle } from "../style";
import { ConstructionActivitySummaryListType } from "../../../../../lib/services/constructionDashboardv2/dataType";
import { numberWithCommasAndFraction } from "../../../../../widgets/charts/Recharts/utils";
import { convertDateFormatYY } from "../../../../../utils/commonFunctions";

interface SummaryTableProps {
  activeBtn: string;
  data: ConstructionActivitySummaryListType[][];
}

const SummaryTable: React.FC<SummaryTableProps> = ({ activeBtn, data }) => {
  const tableData = useMemo(() => {
    return {
      id: "summaryTable-constructionActivity-construction",
      columns: [
        // {
        //   name: "Phase",
        //   key: "projectPhase",
        //   rowSpan: true,
        // },
        {
          name: "Product Type",
          key: "productType",
          rowSpan: true,
          rowSpanAlign: "top",
        },
        {
          name: "Timeline Head",
          key: "timelineHead",
        },
        {
          name: "Activities",
          key: "activityHead",
        },
        {
          name: activeBtn,
          key: activeBtn === "UnderWritten" ? "progressUnderwritten" : "progressBusinessPlan",
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS)}%`,
        },
        {
          name: "Actual",
          key: "progressActual",
          formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS)}%`,
        },
        {
          name: "Start Date",
          key: activeBtn === "UnderWritten" ? "underwrittenStartDate" : "businessPlanStartDate",
          formatValue: (value: string) => `${convertDateFormatYY(value)}`,
        },
        {
          name: "End Date",
          key: activeBtn === "UnderWritten" ? "underwrittenEndDate" : "businessPlanEndDate",
          formatValue: (value: string) => `${convertDateFormatYY(value)}`,
        },
        {
          name: "Start Date",
          key: "actualStartDate",
          formatValue: (value: string) => `${convertDateFormatYY(value)}`,
        },
        {
          name: "End Date",
          key: "actualEndDate",
          formatValue: (value: string) => `${convertDateFormatYY(value)}`,
        },
        {
          name: "(Months)",
          key: activeBtn === "UnderWritten" ? "delaywithrespecttoUnderwritten" : "delaywithrespecttoBusinessPlan",
          formatValue: (value: number) => value,
        },
      ],
      data: data.length > 0 ? data : [],
    };
  }, [activeBtn, data]);

  const upperHeader = () => {
    const head = ["Progess %", activeBtn, "Actual/Anticipated"];
    return (
      <tr>
        <td colSpan={3}></td>
        {head.map((v, i) => (
          <td key={`${v}-${i}`} style={customStyle.summarySubHeader} colSpan={2}>
            {v}
          </td>
        ))}
        <td style={customStyle.summarySubHeader}>Delay</td>
      </tr>
    );
  };

  return (
    <div className='sales-graph-border col-md-12 col-sm-12 mt-4'>
      <SummaryMultiFeatureTable
        tableData={tableData}
        headerColorClass='active-red'
        height='350px'
        tableClasses='table table-bordered-0 text-center'
        upperHeader={upperHeader}
        lastRowTotal={true}
      />
    </div>
  );
};

export default SummaryTable;
