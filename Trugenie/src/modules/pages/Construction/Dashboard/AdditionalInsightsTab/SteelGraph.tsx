import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { rsSymbol } from "../../../../../widgets/charts/Recharts/constants";
import { numberWithCommasAndFraction } from "../../../../../widgets/charts/Recharts/utils";
import { steelListType } from "../../../../../lib/services/constructionDashboardv2/dataType";
import { black, brightRed, darkGrey } from "../../../../../assets/colorConstants";
import LineBarChart, { optionsType } from "../../../../../widgets/charts/Recharts/LineBarChart";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";

const CustomTooltip = (p: any) => {
    const { payload, label, active } = p;
    if (active) {
        return (
            <div className="custom-tooltip">
                <div className="tooltip-header">{label}</div>
                {payload?.[0] && (
                    <div>
                        <span className="tooltip-label">{`${payload[0]?.name} : `}</span>
                        <span className="tooltip-value">{`${rsSymbol} ${numberWithCommasAndFraction(
                            payload[0]?.value, import.meta.env.VITE_REACT_APP_INR_DECIMALS
                        )}`}</span>
                    </div>
                )}
                {payload?.[1] && (
                    <div>
                        <span className="tooltip-label">{`${payload[1].name} : `}</span>
                        <span className="tooltip-value">{`${rsSymbol} ${numberWithCommasAndFraction(
                            payload[1]?.value, import.meta.env.VITE_REACT_APP_INR_DECIMALS
                        )}`}</span>
                    </div>
                )}
                {payload?.[2] && (
                    <div>
                        <span className="tooltip-label">{`${payload[2].name} : `}</span>
                        <span className="tooltip-value">{`${rsSymbol} ${numberWithCommasAndFraction(
                            payload[2]?.value, import.meta.env.VITE_REACT_APP_INR_DECIMALS
                        )}`}</span>
                    </div>
                )}
            </div>
        );
    }
    return null;
};

const SteelGraph = () => {
    const { constructionDashboard } = useSelector(
        (state: any) => state);
    const { constructionSummary } = constructionDashboard;
    const inputCostSteelListData = constructionSummary?.data;
    const steelListData = inputCostSteelListData?.additionalInsights;
    const allGraphData = steelListData?.steelList || [];
    
    const delhiData = useMemo(() => allGraphData.filter((item: { city: string; }) => item.city && item.city.trim() === "Delhi"), [allGraphData]);
    const mumbaiData = useMemo(() => allGraphData.filter((item: { city: string; }) => item.city && item.city.trim() === "Mumbai"), [allGraphData]);

    const transformedDelhiData = delhiData.reduce((acc: any, item: any) => {
        const { date, mm, value } = item;
        const year = date.substring(0, 4);

        if (!acc[year]) {
            acc[year] = { date: parseInt(year) };
        }

        acc[year][mm] = value;
        return acc;
    }, {});
    const transformedDelhiDataArray = Object.keys(transformedDelhiData).map((key) => ({
        date: parseInt(key),
        ...transformedDelhiData[key],
    }));

    const transformedMumbaiData = mumbaiData.reduce((acc: any, item: any) => {
        const { date, mm, value } = item;
        const year = date.substring(0, 4);

        if (!acc[year]) {
            acc[year] = { date: parseInt(year) };
        }

        acc[year][mm] = value;
        return acc;
    }, {});
    const transformedMumbaiDataArray = Object.keys(transformedMumbaiData).map((key) => ({
        date: parseInt(key),
        ...transformedMumbaiData[key],
    }));

    const delhiOptions: optionsType = useMemo(() => ({
        chartData: [
            { type: "line", name: "10mm", dataKey: "10mm", stroke: brightRed },
            { type: "line", name: "12mm", dataKey: "12mm", stroke: black },
            { type: "line", name: "25mm", dataKey: "25mm", stroke: darkGrey }
        ],
        legendHide: true,
        CustomTooltip: CustomTooltip,
        xAxis: { dataKey: "date" },
        yAxis: [{ domain: [0, 10000] }]
    }), []);

    const mumbaiOptions: optionsType = useMemo(() => ({
        chartData: [
            { type: "line", name: "10mm", dataKey: "10mm", stroke: brightRed },
            { type: "line", name: "12mm", dataKey: "12mm", stroke: black },
            { type: "line", name: "25mm", dataKey: "25mm", stroke: darkGrey }
        ],
        legendHide: true,
        CustomTooltip: CustomTooltip,
        xAxis: { dataKey: "date", },
        yAxis: [{ domain: [0, 10000] }]
    }), []);

    return (
        <div className="col-md-6 col-sm-12">
            <div className="sales-graph-border">
                <div className="d-flex text-center">
                    <span style={{ marginLeft: "1rem" }}>
                        <b>MM</b>
                    </span>
                    <span style={{ marginLeft: "1rem" }}>
                        <span className="sm-color-dot red-color-dot"></span> 10mm
                    </span>
                    <span style={{ marginLeft: "1rem" }}>
                        <span className="sm-color-dot black-color-dot"></span>
                        12mm
                    </span>
                    <span style={{ marginLeft: "1rem" }}>
                        <span className="sm-color-dot grey-color-dot"></span>
                        25mm
                    </span>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6">
                        {transformedDelhiDataArray.length > 0 ? (
                            <LineBarChart graphData={transformedDelhiDataArray} options={delhiOptions} ChartHeightSm/>
                        ) : (
                            <FallBackUIDataNotAvailable />
                        )}
                    </div>
                    <div
                        className="col-md-6"
                        style={{
                            borderLeft: "1px #d9d7d5 solid",
                        }}
                    >
                        {transformedMumbaiDataArray.length > 0 ? (
                            <LineBarChart graphData={transformedMumbaiDataArray} options={mumbaiOptions} ChartHeightSm />
                        ) : (
                            <FallBackUIDataNotAvailable />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SteelGraph;
