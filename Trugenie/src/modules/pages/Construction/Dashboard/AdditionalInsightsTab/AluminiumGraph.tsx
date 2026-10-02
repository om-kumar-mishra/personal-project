import React, { useEffect, useMemo, useState } from "react";
import { AluminiumListType } from "../../../../../lib/services/constructionDashboardv2/dataType";
import { convertDateFormatMMMYY } from "../../../../../utils/commonFunctions";
import LineBarChart, { optionsType } from "../../../../../widgets/charts/Recharts/LineBarChart";
import { brightRed } from "../../../../../assets/colorConstants";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import { minMaxValueOfArrayofObject } from "../../../../../widgets/charts/Recharts/utils";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";

interface AluminiumGraphProps {
    graphData: AluminiumListType[];
}

const AluminiumGraph: React.FC<AluminiumGraphProps> = ({
    graphData,
}) => {
    const [data, setData] = useState(graphData);

    useEffect(() => {
        const dataResult = graphData.map((v) => ({
          ...v,
          month: v.month ? convertDateFormatMMMYY(v.month) : v.month,
        }));
        dataResult.sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
        setData(dataResult);
    }, [graphData]);
      const dataLength = data && data.length;

    const options: optionsType = useMemo(
        () => ({
            chartData: [
                {
                    type: "line",
                    name: "Aluminium_INR_tonne",
                    dataKey: "aluminium_INR_tonne",
                    stroke: brightRed,
                    showLabel: false,
                },
            ],
            CustomTooltip: <CommonCustomTooltip decimals={[import.meta.env.VITE_REACT_APP_INR_DECIMALS]}/>,
            xAxis: {
                dataKey: "month",
                angle: -45,
            },
            yAxis: [
                {
                    domain: minMaxValueOfArrayofObject(data, [
                        "aluminium_INR_tonne",
                    ]),
                },
            ],
        }),
        [data]
    );

    return (
        <div className="col-md-6 col-sm-12">
            <div className="sales-graph-border">
                {dataLength > 0 ? (
                    <LineBarChart graphData={data} options={options} ChartHeightSm />
                ) : (
                    <FallBackUIDataNotAvailable sm />
                )}
            </div>
        </div>
    );
};

export default AluminiumGraph;
