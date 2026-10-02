import React, { useEffect, useMemo, useState } from "react";
import { RemarksObjType } from "../../../../../layout/dashboardRemarks/Datatypes";
import SlowMovingInventoryGraph from "./SlowMovingInventoryGraph";
import { DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { SlowMovingInventoryDetailsType } from "../../../../../lib/services/salesDashboard/dataTypes";
import SlowMovingInventoryRateGraph from "./SlowMovingInventoryRateGraph";
import SlowMovingInventoryPriceGraph from "./SlowMovingInventoryPriceGraph";
import { useSelector } from "react-redux";
import { AppState } from "../../../../../lib/common/appState";
import { salesChartNames } from "../../../../../lib/services/dashboardRemarks/constants";
import { InsertDashboardRemarkPayload } from "../../../../../lib/services/dashboardRemarks/dataType";

interface SlowMovingInventoryTabTypes {
  addRemark: boolean;
  remarks: RemarksObjType;
  setRemarks: (obj: RemarksObjType) => void;
  printPDF: boolean;
  saveRequest: InsertDashboardRemarkPayload;
}

const SlowMovingInventoryTab: React.FC<SlowMovingInventoryTabTypes> = ({
  addRemark,
  remarks,
  setRemarks,
  printPDF,
  saveRequest,
}) => {
  const salesDashboard = useSelector((state: AppState) => state.salesDashboard);
  const [inventoryObj, setInventoryObj] = useState<string>("");
  const [detailGraphData, setDetailGraphData] = useState<
    SlowMovingInventoryDetailsType[]
  >([]);

  useEffect(() => {
    if (inventoryObj) {
      const data: SlowMovingInventoryDetailsType[][] =
        salesDashboard.dashboardDetailsv2?.data?.slowMovingInventory
          .slowMovingInventoryDetails ?? [];
      const filterdata = data
        ? data.filter((v) => v[0]?.title === inventoryObj)
        : [];
      setDetailGraphData(filterdata[0]);
    }
  }, [inventoryObj]);

  useEffect(() => {
    if (
      !salesDashboard.dashboardDetailsv2?.data?.slowMovingInventory
        .slowMovingInventorySummary
    ) {
      setInventoryObj("");
      setDetailGraphData([]);
    }
  }, [
    salesDashboard.dashboardDetailsv2?.data?.slowMovingInventory
      .slowMovingInventorySummary,
  ]);

  const subGraphs = (
    inventoryObj: string,
    detailGraphData: SlowMovingInventoryDetailsType[]
  ) => {
    return (
      <>
        {inventoryObj && (
          <>
            <div className="row">
              <div className="sales-graph-heading">{inventoryObj}</div>
              <div className="col-md-6 col-sm-12">
                <SlowMovingInventoryRateGraph graphData={detailGraphData} />
              </div>
              <div className="col-md-6 col-sm-12">
                <SlowMovingInventoryPriceGraph graphData={detailGraphData} />
              </div>
            </div>
            <div className="mt-4 mb-4">
              <DashboardRemarkInput
                addRemark={addRemark}
                remarkKey={`${salesChartNames.Slow_Moving_Inventory_Details} (${inventoryObj})`}
                remarks={remarks}
                setRemarks={setRemarks}
                saveRequest={saveRequest}
              />
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <SlowMovingInventoryGraph
        data={
          salesDashboard.dashboardDetailsv2?.data?.slowMovingInventory
            .slowMovingInventorySummary
        }
        setInventoryObj={setInventoryObj}
      />
      <div className="mt-4 mb-4">
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={salesChartNames.Slow_Moving_Inventory}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
      {!printPDF && subGraphs(inventoryObj, detailGraphData)}
      {printPDF &&
        salesDashboard.dashboardDetailsv2?.data?.slowMovingInventory
          .slowMovingInventoryDetails &&
        salesDashboard.dashboardDetailsv2.data.slowMovingInventory.slowMovingInventoryDetails.map(
          (detail: SlowMovingInventoryDetailsType[]) => {
            return subGraphs(detail[0]?.title, detail);
          }
        )}
    </>
  );
};

export default SlowMovingInventoryTab;
