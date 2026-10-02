import React, { useMemo, useState } from "react";
import TimelineChart from "../GanttChart";
import { TransformedData, transformGanttData } from "../GanttChart/data";
import { gantChartDataType } from "../../../../../lib/services/constructionDashboardv2/dataType";
import { Pagination } from "reactstrap";

interface ConstructionActivityScheduleProps {
  activeBtn: string;
  data: gantChartDataType[][];
}

const ConstructionActivitySchedule: React.FC<
  ConstructionActivityScheduleProps
> = ({ activeBtn, data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const responseData: gantChartDataType[] = useMemo(() => {
    const flattenedArray = data.reduce((acc, curr) => acc.concat(...curr), []);
    return flattenedArray.slice(0, 10);
  }, [data]);

  const totalData = useMemo(() => {
    const flattenedArray = data.reduce((acc, curr) => acc.concat(...curr), []);
    return flattenedArray.length;
  }, [data]);

  const totalPages = Math.ceil(totalData / itemsPerPage);
  const limitedData = useMemo(() => {
    const flattenedArray = data.reduce((acc, curr) => acc.concat(...curr), []);
    return flattenedArray.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  }, [data, currentPage]);

  const transFormedData: TransformedData = useMemo(() => {
    return transformGanttData(limitedData, activeBtn);
  }, [limitedData, activeBtn]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div className="mt-5">
      <div className="sales-graph-heading">Construction Activity Schedule</div>
      <div
        className="d-flex text-center justify-content-end"
        style={{ marginRight: "3em" }}
      >
        <span className="color-dot-text">
          <span
            className="color-dot"
            style={{ backgroundColor: "black" }}
          ></span>
          Underwritten / Business Plan
        </span>
        <span className="color-dot-text">
          <span
            className="color-dot"
            style={{ backgroundColor: "#B6BBC4" }}
          ></span>{" "}
          Actual
        </span>
        <span className="color-dot-text">
          <span
            className="color-dot"
            style={{ backgroundColor: "darkOrange" }}
          ></span>{" "}
          Projected
        </span>
      </div>
      <div className="sales-graph-border col-md-12 col-sm-12">
        <TimelineChart
          transFormedData={transFormedData}
          responseData={responseData}
          activeBtn={activeBtn}
        />
      </div>
      <Pagination
        previousPage={previousPage}
        nextPage={nextPage}
        currentPage={currentPage}
        totalPages={totalPages}
        totalData={totalData}
        btnClass="active-red"
      />
    </div>
  );
};

export default ConstructionActivitySchedule;
