import { useSelector } from "react-redux";
import CurrentTable from "./CurrentTable";
import InventoryStatusTable from "./InventoryStatusTable";
import PreviousTable from "./PreviousTable";
import SalesPerformanceTable from "./SalesPerformanceTable";
import TotalCostCurrentTable from "./TotalCostCurrentTable";
import TotalCostPreviousTable from "./TotalCostPreviousTable";
import UnitConfigurationTable from "./UnitConfigurationTable";
import { selectMonitoringSheetDetails } from "../../../lib/services/HDFC/MonitoringSheet/selectors";
import { MoitoringSheetDetailsDataType } from "../../../lib/services/HDFC/MonitoringSheet/dataTypes";

const TableSection = () => {
    const MonitoringSheetDetails = useSelector(selectMonitoringSheetDetails) as MoitoringSheetDetailsDataType | undefined;
    return (
        <>

            <div className="col-md-12 col-sm-12">
                <CurrentTable data={MonitoringSheetDetails?.totalCostCurrent ?? []}/>
            </div>

            <div className="col-md-12 col-sm-12">
                <PreviousTable data={MonitoringSheetDetails?.totalCostPrevious ?? []} />
            </div>

            <div className="col-md-8 col-sm-12">
                <InventoryStatusTable data={MonitoringSheetDetails?.inventoryStatus ?? []} />
            </div>

            <div className="col-md-12 col-sm-12">
                <SalesPerformanceTable data={MonitoringSheetDetails?.salesPerformance ?? []} />
            </div>

            <div className="col-md-12 col-sm-12">
                <UnitConfigurationTable data={MonitoringSheetDetails?.unitConfiguration ?? []} />
            </div>

            <div className="col-md-12 col-sm-12">
                <TotalCostCurrentTable data={MonitoringSheetDetails?.constructionCost ?? []} />
            </div>

            <div className="col-md-12 col-sm-12">
                <TotalCostPreviousTable data={MonitoringSheetDetails?.constructionCostArchive ?? []} />
            </div>
        </>
    );
};

export default TableSection;
