import React, { useEffect, useMemo, useState } from "react";
import { customStyle } from "../style";
import PhysicalProgressDetailTable from "../table/PhysicalProgressDetailTable";
import { PhysicalProgressDetailsList } from "../../../../../lib/services/constructionDashboardv2/dataType";
import SelectOrMultiselect, { DropDownProps, dropDownsType } from "../../../../Components/SelectOrMultiselect";

interface DetailTableProps {
  data: PhysicalProgressDetailsList[];
  getDetailTableCellColor?: (
    val?: string | number
  ) => string | undefined;
  title: string;
}
const DetailTable: React.FC<DetailTableProps> = ({
  data,
  title,
  getDetailTableCellColor,
}) => {
  const [dropDownsValue, setDropDownsValue] = useState<DropDownProps>({});
  const [selectedFilterData, setSelectedFilterData] =
    useState<PhysicalProgressDetailsList>();

  const selectlist = useMemo(() => {
    if (data.length > 0 && data[0].name !== null) {
      return data.map((v, i) => ({
        id: `${v.name}-${i}`,
        label: v.name,
        value: v.name,
      }));
    } else return [];
  }, [data]);

  const towerDropDowns: dropDownsType[] = useMemo(() => {
    return [
      {
        label: title,
        name: "tower",
        id: "label",
        value: "value",
        options: selectlist ?? [],
        singleSelect: true,
      },
    ];
  }, [selectlist, title]);

  const selectedData = useMemo(() => {
    if (selectedFilterData) {
      return selectedFilterData.activityDetailsFloorWiseList;
    } else return [];
  }, [selectedFilterData]);

  const tableHeader = useMemo(() => {
    if (selectedFilterData) {
      const activity = selectedFilterData.activityList;
      return activity.map((v) => ({ name: v, key: v }));
    } else return [];
  }, [selectedFilterData]);

  const tableData = useMemo(() => {
    return {
      id: `physical-progress-detail-construction-${title}`,
      columns: [
        {
          name: dropDownsValue?.tower?.value ?? title,
          key: "floor",
          style: customStyle.physicalProgressDetailTableHead,
          bodycellStyle: customStyle.physicalProgressDetailTable,
        },
        ...tableHeader,
      ],
      data: selectedData ?? [],
    };
  }, [tableHeader, selectedData, dropDownsValue?.tower?.value]);

  useEffect(() => {
    if (dropDownsValue?.tower?.value) {
      const filterData = data.filter(
        (v) => v.name === dropDownsValue?.tower?.value
      );
      setSelectedFilterData(filterData[0]);
    } else setSelectedFilterData(data[0]);
  }, [dropDownsValue?.tower?.value]);

  // const otherRowsBottom = () => {
  //   const data = [
  //     {
  //       tower: "Progress %",
  //       excavation: 1,
  //       rcc: 1,
  //       finishing: 1,
  //     },
  //     {
  //       tower: "Weightage %",
  //       excavation: 1,
  //       rcc: 1,
  //       finishing: 1,
  //     },
  //   ];

  //   return (
  //     <>
  //       {data.map((row: any) => (
  //         <tr>
  //           {tableData.columns.map(
  //             (col: TableColumnDataType, colIndex: number) => (
  //               <td
  //                 style={
  //                   colIndex === 0
  //                     ? customStyle.physicalProgressDetailOtherHead
  //                     : customStyle.physicalProgressDetailOther
  //                 }
  //               >
  //                 {colIndex !== tableData.columns.length - 1
  //                   ? `${row?.[col.key]}${colIndex !== 0 ? "%" : ""}`
  //                   : sumAllValuesofObjExceptFirstKey({ ...row }) + "%"}
  //               </td>
  //             )
  //           )}
  //         </tr>
  //       ))}
  //     </>
  //   );
  // };

  useEffect(() => {
    towerDropDowns[0]?.options &&
      towerDropDowns[0].options.length > 0 &&
      setDropDownsValue({ tower: towerDropDowns[0].options[0] });
  }, [towerDropDowns[0].options]);

  return (
    <div className="mt-3">
      {selectlist.length > 0 && (
        <SelectOrMultiselect
          id="detailTablephysicalprogress"
          dropDowns={towerDropDowns}
          dropDownsValue={dropDownsValue}
          setDropDownsValue={setDropDownsValue}
        />
      )}
      <div className="col-md-12 col-sm-12 mt-4">
        <PhysicalProgressDetailTable
          tableData={tableData}
          headerColorClass="active-red"
          height="800px"
          tableClasses="table table-bordered-grey text-center"
          // otherRowsBottom={otherRowsBottom}
          getCellColor={getDetailTableCellColor}
          activityValueKey="activityValues"
        />
      </div>
    </div>
  );
};

export default DetailTable;
