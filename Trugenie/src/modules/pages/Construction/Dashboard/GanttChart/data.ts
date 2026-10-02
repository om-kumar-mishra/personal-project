import dayjs from "dayjs";
import { gantChartDataType } from "../../../../../lib/services/constructionDashboardv2/dataType";
import { black, darkOrange, silverishGray } from "../../../../../assets/colorConstants";

export type ResponseData = {
  productType: string;
  timeLineHead: string;
  stages: {
    name: string;
    underWritten: {
      startDate: number;
      endDate: number;
    };
    actual: {
      startDate: number | null;
      endDate: number | null;
    };
    projected: {
      startDate: number;
      endDate: number;
    };
  }[];
}[];

export type TransformedData = {
  productType: string;
  timeLineHead: string;
  stages: {
    name: string;
    data: {
      x: string;
      y: number[];
      fillColor: string;
    }[];
  }[];
}[];

export const transformGanttData = (data: gantChartDataType[], active: string) => {
  return data.map(row => {
    const stages = row.stages.map(stage => {
      return {
        name: stage.name,
        data: [
          {
            x: active,
            y: [
              active === "UnderWritten"
                ? stage.underWritten.startDate
                  ? dayjs(stage.underWritten.startDate).valueOf()
                  : new Date().valueOf()
                : stage.businessPlan.startDate
                ? dayjs(stage.businessPlan.startDate).valueOf()
                : new Date().valueOf(),
              active === "UnderWritten"
                ? stage.underWritten.endDate
                  ? dayjs(stage.underWritten.endDate).valueOf()
                  : new Date().valueOf()
                : stage.businessPlan.endDate
                ? dayjs(stage.businessPlan.endDate).valueOf()
                : new Date().valueOf(),
            ],
            fillColor: black,
          },
          {
            x: "Actual/Projected",
            y: [
              stage.actual.startDate ? dayjs(stage.actual.startDate).valueOf() : new Date().valueOf(),
              stage.actual.endDate ? dayjs(stage.actual.endDate).valueOf() : new Date().valueOf(),
            ],
            fillColor: silverishGray,
          },
          {
            x: "Actual/Projected",
            y: [
              stage.projected.startDate ? dayjs(stage.projected.startDate).valueOf() : new Date().valueOf(),
              stage.projected.endDate ? dayjs(stage.projected.endDate).valueOf() : new Date().valueOf(),
            ],
            fillColor: darkOrange,
          },
        ],
      };
    });

    return {
      productType: row.productType,
      timeLineHead: row.timeLineHead,
      stages,
    };
  });
};

// export default transFormedData;
