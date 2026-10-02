import React, { useMemo } from "react";
import { PhysicalProgressParticularsType } from "../../../../../lib/services/constructionDashboardv2/dataType";
import SimpleTable from "../../../../../widgets/tables/SimpleTable";

interface SummaryTableProps {
  data: PhysicalProgressParticularsType[];
  title: string;
}

const SummaryTable: React.FC<SummaryTableProps> = ({ data, title }) => {
  const tableData = useMemo(() => {
    return {
      id: "towerSummaryTable-construction",
      columns: [
        {
          name: "Particulars",
          key: "particulars",
        },
        {
          name: `No of ${title}`,
          key: "noOfTowers",
          calTotal: true,
        },
      ],
      data: data.map((v, i) => ({
        ...v,
        isBold: i === 0,
      })),
    };
  }, [data]);

  return (
    <div className='sales-graph-border col-md-8 com-sm-12'>
      <SimpleTable tableData={tableData} headerColorClass='active-red' height='250px' />
    </div>
  );
};

export default SummaryTable;
