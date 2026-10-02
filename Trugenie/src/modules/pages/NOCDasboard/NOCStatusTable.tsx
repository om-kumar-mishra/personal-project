import React from "react";
import { BuildingTowerViewType } from "../../../lib/services/nocDashboard/datatypes";

interface NocFloorUnitsTableProps {
  buildingTowerView: BuildingTowerViewType | undefined;
  getFloorUnitColor: (nocStatus: string) => string;
}
const NocFloorUnitsTable: React.FC<NocFloorUnitsTableProps> = ({
  buildingTowerView,
  getFloorUnitColor,
}) => {
  console.log('buildingTowerView: ', buildingTowerView);
  return (
    <div
      className="border rounded table-responsive scrollbar-width-thin"
      style={{ margin: "1rem auto", minHeight: "150px" }}
    >
      <table className="table table-bordered mt-3 text-center noc-floor-units-table">
        <thead className="table-active main-color">
          <tr>
            <th>Floor</th>
            <th colSpan={buildingTowerView?.maxUnits ?? 1}>Units</th>
          </tr>
        </thead>
        <tbody>
          {buildingTowerView?.nocFloorList &&
            buildingTowerView.nocFloorList.map((floor) => (
              <tr key={floor.unitFloor}>
                <td>{floor.unitFloor}</td>
                {floor?.nocUnitsStatusList &&
                  floor.nocUnitsStatusList.map((unit) => (
                    <td
                      key={`${floor.unitFloor}_${unit.unitNo}`}
                      className={`title-tip ${getFloorUnitColor(
                        unit?.nocStatus
                      )}`}
                      data-title={`Unit No: ${unit.unitNo}`}
                    ></td>
                  ))}
                {[
                  ...Array(
                    buildingTowerView.maxUnits -
                      (floor?.nocUnitsStatusList
                        ? floor.nocUnitsStatusList.length
                        : 0)
                  ),
                ].map((value,index) => (
                  <td key={index}></td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default NocFloorUnitsTable;
