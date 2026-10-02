import React, { ReactElement, useMemo, useState } from "react";
import CustomPieChart, {
  PieOptionsType,
  pieLabelFormaterType,
} from "../../../../../widgets/charts/Recharts/CustomPieChart";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import GraphTypeFilterSpan, {
  TypeFilter,
} from "../../../../../widgets/charts/Recharts/GraphTypeFilterSpan";
import { sumArrayofObjFixedTwo } from "../../../../../utils/commonFunctions";
import { AdditionalInsightsResponseType } from "../../../../../lib/services/salesDashboard/dataTypes";

interface RegisterationStatusAnalysisGraphProps {
  graphData: AdditionalInsightsResponseType[];
  colors: string[];
  labelFormatter: (
    obj: pieLabelFormaterType,
    valueTotal: string,
    type: string
  ) => ReactElement<any, any>;
}

const RegisterationStatusAnalysisGraph: React.FC<
  RegisterationStatusAnalysisGraphProps
> = ({ graphData, colors, labelFormatter }) => {
  const [type, setType] = useState<string>("unit");

  const valueTotal = useMemo(() => {
    const key = type === "unit" ? "unitWise" : "areaSale";
    return sumArrayofObjFixedTwo(graphData, key);
  }, [graphData, type]);

  const typeFilter: TypeFilter[] = useMemo(
    () => [
      {
        key: "unit",
        title: "Unit Wise",
      },
      {
        key: "area",
        title: "Area Wise",
      },
    ],
    []
  );

  const data: AdditionalInsightsResponseType[] = useMemo(() => {
    return graphData && graphData.length > 0
      ? graphData.map((v: AdditionalInsightsResponseType, i: number) => ({
          ...v,
          fill: colors[i],
          name: v.registrationStatus !== "" ? v.registrationStatus : "Untagged",
          value:
            type === "unit"
              ? Math.round(Number(v.unitWise))
              : Math.round(Number(v.areaSale)),
        }))
      : [];
  }, [graphData, type]);

  const options: PieOptionsType = useMemo(() => {
    return {
      pie: {
        outerRadius: 100,
        innerRadius: 40,
        labelLine: true,
        showLabel: true,
      },
      legend: {
        verticalAlign: "top",
        layout: "horizontal",
        align: "left",
      },
      CustomTooltip: (
        <CommonCustomTooltip
          decimals={[
            type === "unit"
              ? import.meta.env.VITE_REACT_APP_UNIT_DECIMAL
              : import.meta.env.VITE_REACT_APP_AREA_DECIMAL,
          ]}
        />
      ),
      labelFormater: (obj: pieLabelFormaterType) =>
        labelFormatter(obj, valueTotal, type),
    };
  }, [valueTotal, labelFormatter, type]);

  return (
    <div>
      <div className="sales-graph-heading" style={{ paddingLeft: "1.5em" }}>
        Registration Status Analysis
      </div>
      <div className="sales-graph-border">
        <GraphTypeFilterSpan
          type={type}
          typeFilter={typeFilter}
          setType={setType}
        />
        {data && data.length > 0 ? (
          <CustomPieChart data={data} options={options} />
        ) : (
          <FallBackUIDataNotAvailable />
        )}
      </div>
    </div>
  );
};

export default RegisterationStatusAnalysisGraph;
