import React, { useMemo } from "react";
import SimpleTable from "../../../../../widgets/tables/SimpleTable";
import {
  numberWithCommasAndFraction,
} from "../../../../../widgets/charts/Recharts/utils";
import { PhysicalVsActualDemandResponseType } from "../../../../../lib/services/salesDashboard/dataTypes";

interface DemandPhysicalProgressVsActualProps {
  data: PhysicalVsActualDemandResponseType[];
}

const DemandPhysicalProgressVsActual: React.FC<
  DemandPhysicalProgressVsActualProps
> = ({ data }) => {
  const tableData = useMemo(() => {
    return {
      id: "DemandPhysicalProgressVsActual",
      columns: [
        {
          name: "Particulars",
          key: "projectPhase",
        },
        {
          name: "Demand as per physical Progress",
          key: "demandAsperPhysicalProgress",
          calTotal: true,
          formatValue: (value: number) =>
            `${numberWithCommasAndFraction(
              value,
              import.meta.env.VITE_REACT_APP_UNIT_DECIMAL
            )}`,
        },
        {
          name: "Actual Demand as per MIS",
          key: "actualDemandAsPerMis",
          calTotal: true,
          formatValue: (value: number) =>
            `${numberWithCommasAndFraction(
              value,
              import.meta.env.VITE_REACT_APP_UNIT_DECIMAL
            )}`,
        },
        {
          name: "Demand Shortfall",
          key: "demandShortfall",
          calTotal: true,
          formatValue: (value: number) =>
            `${numberWithCommasAndFraction(
              value,
              import.meta.env.VITE_REACT_APP_UNIT_DECIMAL
            )}`,
        },
      ],
      data: data,
    };
  }, []);

  return (
    <div>
      <div className="sales-graph-heading" style={{ paddingLeft: "1.5em" }}>
        Demand as per physical progress vs Actual Demand
      </div>
      <div className="sales-graph-border">
        <SimpleTable
          tableData={tableData}
          headerColorClass="active-red"
          height="320px"
          minHeight="320px"
          showTotal
          tableClasses="table table-bordered-0 text-center"
        />
      </div>
    </div>
  );
};

export default DemandPhysicalProgressVsActual;
