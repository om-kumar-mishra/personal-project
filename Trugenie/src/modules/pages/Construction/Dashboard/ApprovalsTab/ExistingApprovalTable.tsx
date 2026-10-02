import React, { useMemo } from "react";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { ExistingApprovalListType } from "../../../../../lib/services/constructionDashboardv2/dataType";
import { convertDateFormatYY } from "../../../../../utils/commonFunctions";
import SimpleTable from "../../../../../widgets/tables/SimpleTable";

interface ExistingApprovalTableProps {
  data: ExistingApprovalListType[];
  misDate: string;
  handleOnClickModal: (row: ExistingApprovalListType) => void;
}

const ExistingApprovalTable: React.FC<ExistingApprovalTableProps> = ({ data, misDate, handleOnClickModal }) => {
  const tableData = useMemo(() => {
    return {
      id: "existingApprovalTable-construction",
      columns: [
        {
          name: "Configuration",
          key: "configurationApprovalName",
        },
        {
          name: "Approval Authority",
          key: "approvalAuthority",
        },
        {
          name: "Remark",
          key: "remark",
        },
        {
          name: "Expiry Date",
          key: "expiryDate",
          getTextColor: (value: any) => (new Date(value) < new Date(misDate) ? "text-color-red" : ""),
          formatValue: (value: string) => `${convertDateFormatYY(value)}`,
        },
        {
          name: "Stage",
          key: "stage",
        },
        {
          name: "Actions",
          key: "actions",
          icon: {
            icon: faClock,
            onClick: (row: ExistingApprovalListType) => {
              handleOnClickModal(row);
            },
          },
        },
      ],
      data,
    };
  }, [data]);

  return (
    <div>
      <span className='sales-graph-heading'>Existing Approval</span>
      <div className='sales-graph-border col-md-12 col-sm-12 mt-4'>
        <SimpleTable tableData={tableData} headerColorClass='active-red' tableClasses='table table-bordered-0 text-center' minHeight='250px' height='250px' />
      </div>
    </div>
  );
};

export default ExistingApprovalTable;
