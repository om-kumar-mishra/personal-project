import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import ExistingApprovalTable from "./ExistingApprovalTable";
import PendingApprovalTable from "./PendingApprovalTable";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import {
  ApprovalDocumentsResult,
  ConstructionSummaryResult,
  ExistingApprovalListType,
  PendingApprovalListType,
  constructioApprovalDocumentsListType,
} from "../../../../../lib/services/constructionDashboardv2/dataType";
import { RemarksObjType } from "../../../../../layout/dashboardRemarks/Datatypes";
import { InsertDashboardRemarkPayload } from "../../../../../lib/services/dashboardRemarks/dataType";
import { getApprovalDocuments, resetApprovalDocuments } from "../../../../../lib/services/constructionDashboardv2/action";
import { convertDateFormatYY } from "../../../../../utils/commonFunctions";
import SpinnerComponent from "../../../../Components/SpinnerComponent";
import { SimpleTableWithModal } from "../../../../../widgets/tables/SimpleTableWithModal";
import { DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { constrcutionChartNames } from "../../../../../lib/services/dashboardRemarks/constants";
import { downloadRowDataRequest } from "../../../../../lib/services/HDFC/common/action";

interface ApprovalPropsType {
  constructionSummary?: ConstructionSummaryResult;
  misDate: string;
  projectId: number;
  emailid: string;
  addRemark: boolean;
  remarks: RemarksObjType;
  setRemarks: (obj: RemarksObjType) => void;
  saveRequest: InsertDashboardRemarkPayload;
  approvalDocuments?: ApprovalDocumentsResult;
  alertVisible: boolean;
  setAlertVisible: (value: boolean) => void;
}

const Approvals: React.FC<ApprovalPropsType> = ({
  constructionSummary,
  misDate,
  addRemark,
  remarks,
  setRemarks,
  saveRequest,
  projectId,
  emailid,
  approvalDocuments,
}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [actionTable, setActionTable] = useState<boolean>(false);
  useEffect(() => {
    if (approvalDocuments?.data?.constructioApprovalDocumentsList && !actionTable) {
      setActionTable(true);
    }
  }, [approvalDocuments?.data?.constructioApprovalDocumentsList]);

  useEffect(() => {
    if (!actionTable) {
      dispatch(resetApprovalDocuments());
    }
  }, [actionTable]);

  const handleOnClickModal = (row: ExistingApprovalListType | PendingApprovalListType) => {
    const payload = {
      reAssetId: Number(projectId),
      useremail: emailid,
      projectPhase: row.projectPhase,
      developmentType: row.developmentType,
      productSubType: row.productSubType,
      wing: row.wing,
      stage: row.stage,
      approvalsType: row.configurationApprovalName,
      approvalAuthority: row.approvalAuthority,
    };
    dispatch(getApprovalDocuments(payload));
  };
  const modalData = approvalDocuments?.data?.constructioApprovalDocumentsList ?? [];
  const modalTableData = useMemo(() => {
    return {
      id: "modal-existingApprovalTable-construction",
      columns: [
        {
          name: "Date",
          key: "misDate",
          formatValue: (item: string) => convertDateFormatYY(item),
        },
        {
          name: "Particulars",
          key: "status",
        },
        {
          name: "Action",
          key: "action",
          icon: {
            icon: faDownload,
            onClick: (row: constructioApprovalDocumentsListType) => {
              setLoader(true);
              dispatch(
                downloadRowDataRequest(row.fileContainer, row.filePath, row.fileName, () => {
                  setLoader(false);
                }),
              );
            },
          },
        },
      ],
      data: modalData,
    };
  }, [modalData]);

  return (
    <>
      {loader && <SpinnerComponent />}
      {actionTable && (
        <SimpleTableWithModal
          tableData={modalTableData}
          headerColorClass='active-red'
          tableClasses='table table-bordered-0 text-center'
          isOpen={actionTable}
          setIsOpen={setActionTable}
          title='Approval Timeline'
          removeFooter
        />
      )}
      <ExistingApprovalTable
        data={constructionSummary?.data?.approvals?.existingApprovalList ?? []}
        misDate={misDate}
        handleOnClickModal={handleOnClickModal}
      />
      <PendingApprovalTable data={constructionSummary?.data?.approvals?.pendingApprovalList ?? []} misDate={misDate} handleOnClickModal={handleOnClickModal} />
      <div className='mt-4 mb-4'>
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={constrcutionChartNames.Approvals}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
    </>
  );
};
export default Approvals;
