import React, { useMemo } from "react";
import SimpleTable from "../../../../../widgets/tables/SimpleTable";
import { convertDateFormatYY } from "../../../../../utils/commonFunctions";
import { numberWithCommasAndFraction } from "../../../../../widgets/charts/Recharts/utils";
import { MicroMarketCompletionAnalysisType } from "../../../../../lib/services/salesDashboard/dataTypes";

const CompetitionAnalysisTable: React.FC<{
  data: MicroMarketCompletionAnalysisType[];
}> = ({ data }) => {
  const tableData = useMemo(() => {
    return {
      id: "id",
      columns: [
        {
          name: "Developer",
          key: "developer",
        },
        {
          name: "Project",
          key: "project",
        },
        {
          name: "Launch Date",
          key: "launchDate",
          formatValue: (value: string) => `${convertDateFormatYY(value)}`,
        },
        {
          name: "Launch Area",
          key: "launchedDateArea",
          formatValue: (value: number) =>
            `${numberWithCommasAndFraction(value, 0)}`,
        },
        {
          name: "Sold percentage",
          key: "sold",
          formatValue: (value: number) => `${value ? `${value * 100}%` : ""}`,
        },
        {
          name: "Current Price",
          key: "currentPrice",
        },
      ],
      data,
    };
  }, [data]);

  return (
    <div>
      <SimpleTable
        tableData={tableData}
        headerColorClass="active-red"
        tableClasses="table table-bordered-0 text-center"
        minHeight="250px"
        height="260px"
      />
    </div>
  );
};

export default CompetitionAnalysisTable;
