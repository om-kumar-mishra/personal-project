import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { getNumberSystem } from "../../../../lib/services/common/selector";
import { numberWithCommasAndFraction } from "../../../../widgets/charts/Recharts/utils";
import { salesSummaryType } from "../../../../lib/services/projectSummary/datatype";
import RedHeaderWithSubHeader from "../../../../widgets/tables/RedHeaderWithSubHeader";

const SalesSummary: React.FC<{
  isUnderwrittenActive: boolean;
}> = ({ isUnderwrittenActive }) => {
  const { projectSummaryReducer } = useSelector((state: any) => state);
  const { dashboardDetails } = projectSummaryReducer;
  const numberSystem = useSelector(getNumberSystem);
  const columns = [
    { key: "phases", name: "Phases" },
    {
      key: "particulars",
      name: "Particulars",
    },
    {
      key: "totalArea",
      name: `Total Area (${import.meta.env.VITE_REACT_APP_AREA_UNIT})`,
      formatValue: (value: number) =>
        numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_AREA_DECIMAL
        ),
    },
    {
      key: "launchedArea",
      name: `Launched Area (${import.meta.env.VITE_REACT_APP_AREA_UNIT})`,
      formatValue: (value: number) =>
        numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_AREA_DECIMAL
        ),
    },
    {
      key: "soldArea",
      name: `Sold Area (${import.meta.env.VITE_REACT_APP_AREA_UNIT})`,
      formatValue: (value: number) =>
        numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_AREA_DECIMAL
        ),
      color: (row: salesSummaryType) => {
        const data = UnderwrittenList
          ? UnderwrittenList.find(
              (v) =>
                v.phases === row.phases &&
                ((isUnderwrittenActive && v.particulars === "Underwritten") ||
                  v.particulars === "Business Plan")
            )
          : undefined;
        return row.particulars === "Actual" &&
          data &&
          data.soldArea > row.soldArea
          ? "text-danger"
          : "";
      },
    },
    {
      key: "unsoldArea",
      name: `Unsold Area - Launched (${
        import.meta.env.VITE_REACT_APP_AREA_UNIT
      })`,
      formatValue: (value: number) =>
        numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_AREA_DECIMAL
        ),
    },
    {
      key: "soldValue",
      name: `Sold Value (${numberSystem})`,
      formatValue: (value: number) =>
        numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        ),
      color: (row: salesSummaryType) => {
        const data = UnderwrittenList
          ? UnderwrittenList.find(
              (v) =>
                v.phases === row.phases &&
                ((isUnderwrittenActive && v.particulars === "Underwritten") ||
                  v.particulars === "Business Plan")
            )
          : undefined;
        return row.particulars === "Actual" &&
          data &&
          data.soldValue > row.soldValue
          ? "text-danger"
          : "";
      },
    },
    {
      key: "collectionsTillDate",
      name: `Collections till Date (${numberSystem})`,
      formatValue: (value: number) =>
        numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        ),
      color: (row: salesSummaryType) => {
        const data = UnderwrittenList
          ? UnderwrittenList.find(
              (v) =>
                v.phases === row.phases &&
                ((isUnderwrittenActive && v.particulars === "Underwritten") ||
                  v.particulars === "Business Plan")
            )
          : undefined;
        return row.particulars === "Actual" &&
          data &&
          data.collectionsTillDate > row.collectionsTillDate
          ? "text-danger"
          : "";
      },
    },
    {
      key: "soldReceivables",
      name: `Sold Receivables (${numberSystem})`,
      formatValue: (value: number) =>
        numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        ),
    },
    {
      key: "unsoldReceivables",
      name: `Unsold Receivables (${numberSystem})`,
      formatValue: (value: number) =>
        numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        ),
    },
    {
      key: "totalReceivables",
      name: `Total Receivables (${numberSystem})`,
      formatValue: (value: number) =>
        numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        ),
      // borderDivider: true,
    },
    {
      key: "percentageAreaSold",
      name: "Area Sold",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
        )}%`,
      color: (row: salesSummaryType) => {
        const data = UnderwrittenList
          ? UnderwrittenList.find(
              (v) =>
                v.phases === row.phases &&
                ((isUnderwrittenActive && v.particulars === "Underwritten") ||
                  v.particulars === "Business Plan")
            )
          : undefined;
        return row.particulars === "Actual" &&
          data &&
          data.percentageAreaSold > row.percentageAreaSold
          ? "text-danger"
          : "";
      },
    },
    {
      key: "percentageCollected",
      name: "Collected",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
        )}%`,
      color: (row: salesSummaryType) => {
        const data = UnderwrittenList
          ? UnderwrittenList.find(
              (v) =>
                v.phases === row.phases &&
                ((isUnderwrittenActive && v.particulars === "Underwritten") ||
                  v.particulars === "Business Plan")
            )
          : undefined;
        return row.particulars === "Actual" &&
          data &&
          data.percentageCollected > row.percentageCollected
          ? "text-danger"
          : "";
      },
    },
    {
      key: "rateAchievedSoldArea",
      name: `Rate Achieved Sold Area (${
        import.meta.env.VITE_REACT_APP_RATE_PER_UNIT_AREA
      })`,
      formatValue: (value: number) =>
        numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_RATE_DECIMAL
        ),
      color: (row: salesSummaryType) => {
        const data = UnderwrittenList
          ? UnderwrittenList.find(
              (v) =>
                v.phases === row.phases &&
                ((isUnderwrittenActive && v.particulars === "Underwritten") ||
                  v.particulars === "Business Plan")
            )
          : undefined;
        return row.particulars === "Actual" &&
          data &&
          data.rateAchievedSoldArea > row.rateAchievedSoldArea
          ? "text-danger"
          : "";
      },
    },
    {
      key: "rateExpectedUnsoldArea",
      name: `Rate Expected - Unsold Area (${
        import.meta.env.VITE_REACT_APP_RATE_PER_UNIT_AREA
      })`,
      formatValue: (value: number) =>
        numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_RATE_DECIMAL
        ),
      color: (row: salesSummaryType) => {
        const data = UnderwrittenList
          ? UnderwrittenList.find(
              (v) =>
                v.phases === row.phases &&
                ((isUnderwrittenActive && v.particulars === "Underwritten") ||
                  v.particulars === "Business Plan")
            )
          : undefined;
        return row.particulars === "Actual" &&
          data &&
          data.rateExpectedUnsoldArea > row.rateExpectedUnsoldArea
          ? "text-danger"
          : "";
      },
    },
  ];

  const UnderwrittenList = useMemo(() => {
    if (
      dashboardDetails?.data?.salesSectionsFormatted &&
      dashboardDetails.data.salesSectionsFormatted.length > 0
    ) {
      const dataWithoutTotal =
        dashboardDetails.data.salesSectionsFormatted.filter(
          (v: salesSummaryType) => v.phases !== "Total"
        );
      const totalData = dashboardDetails.data.salesSectionsFormatted.filter(
        (v: salesSummaryType) => v.phases === "Total"
      );

      let tableDataWithoutTotal: salesSummaryType[] = [];
      if (isUnderwrittenActive) {
        tableDataWithoutTotal = dataWithoutTotal.filter(
          (v: salesSummaryType) =>
            v.particulars === "Underwritten" || v.particulars === "Actual"
        );
      } else {
        tableDataWithoutTotal = dataWithoutTotal.filter(
          (v: salesSummaryType) =>
            v.particulars === "Business Plan" || v.particulars === "Actual"
        );
      }
      let tableData: salesSummaryType[] = [];
      if (isUnderwrittenActive) {
        tableData = totalData.filter(
          (v: salesSummaryType) =>
            v.particulars === "Underwritten" || v.particulars === "Actual"
        );
      } else {
        tableData = totalData.filter(
          (v: salesSummaryType) =>
            v.particulars === "Business Plan" || v.particulars === "Actual"
        );
      }
      return [...tableData, ...tableDataWithoutTotal];
    }
  }, [dashboardDetails?.data?.salesSectionsFormatted, isUnderwrittenActive]);

  return (
    <div className="row">
      <div className="sales-graph-heading">Sales</div>
      <div className="col-md-12 col-sm-12">
        <div className="sales-graph-border">
          <div className="p-1">
            <RedHeaderWithSubHeader
              data={UnderwrittenList ?? []}
              cols={columns}
              colorRow={(row: salesSummaryType) =>
                row.particulars === "Actual" && row.phases === "Total"
                  ? "grey-bold-background"
                  : row.particulars === "Underwritten" ||
                    row.particulars === "Business Plan"
                  ? row.phases === "Total"
                    ? "grey-bold-background darkgrey-bold-background"
                    : "darkgrey-bold-background"
                  : ""
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesSummary;
