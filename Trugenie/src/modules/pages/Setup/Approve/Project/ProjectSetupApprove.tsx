import { Button, Flex, Modal, Text, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import downloadTemplate from "../../../../../assets/logos/download.svg";
import filexlsxIcon from "../../../../../assets/logos/filexlsx.svg";
import useSearchAndPagination from "../../../../../hooks/useSearchAndPagination";
import { Project } from "../../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import {
  downloadProjectSetupRequest,
  downloadProjectSetupRowRequest,
  getGetProjectSalesApprovalsListRequested,
  getGetProjectSalesListRequested,
  statusChangeProjectSalesListRequested,
} from "../../../../../lib/services/HDFC/ProjectSetupUpdate/action";
import {
  ProjectSalesApprovalsListDataType,
  ProjectSalesListDataType,
  StatusChangeProjectDataType,
} from "../../../../../lib/services/HDFC/ProjectSetupUpdate/dataTypes";
import { selectProjectLoaders, selectProjectSalesApprovalsList, selectProjectSalesList } from "../../../../../lib/services/HDFC/ProjectSetupUpdate/selectors";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { getPresentableValue, successNotification } from "../../../../Components/UtilityFunctions";

import { useDisclosure } from "@mantine/hooks";

const ConfirmModal = ({
  open,
  onClose,
  modalTitle,
  remarks,
  setRemarks,
  handleSubmitRemarks,
}: {
  open: boolean;
  onClose: () => void;
  modalTitle: string | null;
  remarks: string | null;
  setRemarks: React.Dispatch<React.SetStateAction<string | null>>;
  handleSubmitRemarks: (type: string | null) => void;
}) => {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const handleOnChange = (e: { currentTarget: { value: string } }) => {
    if (e.currentTarget.value.trim().length > 500) {
      setErrorMsg("Invalid Input! Input can not be more than 500 characters.");
    } else {
      setRemarks(e.currentTarget.value);
      setErrorMsg("");
    }
  };
  return (
    <>
      <Modal
        size='md'
        opened={open}
        onClose={onClose}
        title={
          <Text size='md' fw='bold' color='#001d56'>
            {modalTitle}
          </Text>
        }>
        <Textarea
          w={"100%"}
          withAsterisk
          label='Remarks'
          placeholder='Enter Remarks'
          value={remarks != null ? remarks : ""}
          error={errorMsg}
          onChange={e => handleOnChange(e)}
        />
        {!remarks || remarks.trim().length === 0 ? (
          <Text size={10} color='red'>
            This Field cannot empty
          </Text>
        ) : (
          ""
        )}

        <Flex gap={10} mt='xs' justify='flex-end'>
          <Button onClick={onClose} color={"truboard-primary.0"}>
            Cancel
          </Button>
          <Button disabled={!remarks || remarks.trim().length === 0} onClick={() => handleSubmitRemarks(modalTitle)} color={"truboard-primary.0"}>
            Confirm
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

const ProjectSetupApprove = () => {
  const dispatch = useDispatch();

  const project = useSelector(selectSetProject) as Project;
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const projectSalesList = useSelector(selectProjectSalesList);
  const projectSalesApprovalsList = useSelector(selectProjectSalesApprovalsList);
  const loader = useSelector(selectProjectLoaders);

  //#region [state]
  const [modalData, setModalData] = useState<ProjectSalesApprovalsListDataType | null>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [remarks, setRemarks] = useState<string | null>(null);
  const [dowloadApprovalRowLoader, setDowloadApprovalRowLoader] = useState<{
    id: string | number;
    for: "approve" | "reject" | "download";
  } | null>(null);
  const [dowloadRowLoader, setDowloadRowLoader] = useState<string | null>(null);

  // disclosure
  const [actionModalOpen, { open, close }] = useDisclosure(false);

  const {
    finalData: projectPastData,
    SearchComponent: PastUpdatesSearchComponent,
    PaginationComponent: PastUpdatesPaginationComponent,
  } = useSearchAndPagination({
    data: projectSalesList,
    columnsToSearch: [
      { accessorKey: "CreatedBy", type: "text", label: "Created By" },
      { accessorKey: "Entity", type: "text", label: "entity" },
      { accessorKey: "EntityRole", type: "text", label: "Role" },
      { accessorKey: "UserName", type: "text", label: "UserName" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const {
    finalData: projectApprovedList,
    SearchComponent: projectApproveSearchComponent,
    PaginationComponent: projectApprovePaginationComponent,
  } = useSearchAndPagination({
    data: projectSalesApprovalsList,
    columnsToSearch: [
      { accessorKey: "CreatedBy", type: "text", label: "Created By" },
      { accessorKey: "Entity", type: "text", label: "entity" },
      { accessorKey: "EntityRole", type: "text", label: "Role" },
      { accessorKey: "UserName", type: "text", label: "UserName" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const handelDownloadProject = () => {
    dispatch(downloadProjectSetupRequest(Number(project?.REAssetId)));
  };
  const downloadLoaderCallback = () => {
    setDowloadApprovalRowLoader(null);
    setDowloadRowLoader(null);
  };
  const handelDownloadApprovalsRowData = (row: ProjectSalesApprovalsListDataType) => {
    setDowloadApprovalRowLoader({
      id: row.FileName,
      for: "download",
    });
    dispatch(downloadProjectSetupRowRequest("renoc", row.FilePath, row.FileName, downloadLoaderCallback));
  };

  const handelDownloadRowData = (row: ProjectSalesListDataType) => {
    setDowloadRowLoader(row.FileName);
    dispatch(downloadProjectSetupRowRequest("renoc", row.FilePath, row.FileName, downloadLoaderCallback));
  };

  // callback
  const actionCallback = (success: boolean) => {
    setDowloadApprovalRowLoader(null);
    if (success) {
      successNotification(`${modalTitle}ed Successfully!`);
      dispatch(getGetProjectSalesApprovalsListRequested(project?.REAssetId));
      dispatch(getGetProjectSalesListRequested(Number(project?.REAssetId), "setup"));
    }
    setModalData(null);
    setModalTitle(null);
    setRemarks(null);
  };

  useEffect(() => {
    dispatch(getGetProjectSalesListRequested(Number(project?.REAssetId), "setup"));
    dispatch(getGetProjectSalesApprovalsListRequested(Number(project?.REAssetId)));
  }, []);

  // handle-action
  const handleOpenActionModal = (title: string, data: ProjectSalesApprovalsListDataType) => {
    setDowloadApprovalRowLoader({
      id: data.SaleMISHistoryId,
      for: title === "Approve" ? "approve" : "reject",
    });
    setModalData(data);
    setModalTitle(title);
    open();
  };

  const handleCloseActionModal = () => {
    setModalData(null);
    setModalTitle(null);
    setRemarks(null);
    close();
  };

  const handleSubmitRemarks = (type: string | null) => {
    if (modalData && remarks && type) {
      const data: StatusChangeProjectDataType = {
        reAssetId: Number(project?.REAssetId),
        salesMISHistoryId: modalData.SaleMISHistoryId,
        status: type,
        userEmail: userDetails?.EmailId,
        remarks: remarks,
      };
      dispatch(dispatch(statusChangeProjectSalesListRequested(data, actionCallback)));
    }
    close();
  };

  return (
    <>
      <Flex align={"flex-start"} justify={"space-between"} m={"md"}>
        <Flex direction={"column"} gap={"xl"}>
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Download the project setup template
            </Text>
            <Button
              onClick={handelDownloadProject}
              name='file-upload'
              rightIcon={<img src={downloadTemplate} style={{ width: "15px", height: "15px" }} />}
              leftIcon={<img src={filexlsxIcon} style={{ width: "15px", height: "15px" }} />}
              variant='outline'
              color='gray'
              w={300}
              loading={loader?.downloadProjectTemplateLoader}>
              Project Setup Template.xlsx
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <NewTableWithActions
        loader={loader?.projectSalesApprovalsListLoader}
        cardHeader={
          <TableHeader title={"Setup Approval"} SearchComponent={projectApproveSearchComponent} PaginationComponent={projectApprovePaginationComponent} />
        }
        columns={[
          {
            title: "Upload Date",
            accessorKey: "CreateAt",
            transform: (value: string) => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
          },
          { title: "Entity", accessorKey: "Entity" },
          { title: "Role", accessorKey: "EntityRole" },
          { title: "Username", accessorKey: "UserName" },
          { title: "Status", accessorKey: "Status" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "approve",
                onClick: row => handleOpenActionModal("Approve", row),
                loading(row) {
                  return (
                    row?.SaleMISHistoryId === dowloadApprovalRowLoader?.id && loader?.withdrawnConfirmLoader && dowloadApprovalRowLoader?.for === "approve"
                  );
                },
              },
              {
                type: "reject",
                onClick: row => handleOpenActionModal("Reject", row),
                loading(row) {
                  return row?.SaleMISHistoryId === dowloadApprovalRowLoader?.id && loader?.withdrawnConfirmLoader && dowloadApprovalRowLoader?.for === "reject";
                },
              },
              {
                type: "download",
                onClick: row => handelDownloadApprovalsRowData(row),
                loading(row) {
                  return row?.FileName === dowloadApprovalRowLoader?.id && loader?.downloadProjectRowLoader;
                },
              },
            ],
          },
        ]}
        data={projectApprovedList}
      />

      <NewTableWithActions
        loader={loader?.projectSalesListLoader}
        cardHeader={<TableHeader title={"Past Updates"} SearchComponent={PastUpdatesSearchComponent} PaginationComponent={PastUpdatesPaginationComponent} />}
        columns={[
          {
            title: "Upload Date",
            accessorKey: "CreateAt",
            transform: (value: string) => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
          },
          { title: "Entity", accessorKey: "Entity" },
          { title: "Role", accessorKey: "EntityRole" },
          { title: "Username", accessorKey: "UserName" },
          { title: "Status", accessorKey: "Status" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "download",
                onClick: row => handelDownloadRowData(row),
                loading(row) {
                  return row?.FileName === dowloadRowLoader && loader?.downloadProjectRowLoader;
                },
              },
            ],
          },
        ]}
        data={projectPastData}
      />

      <ConfirmModal
        open={actionModalOpen}
        onClose={handleCloseActionModal}
        modalTitle={modalTitle}
        remarks={remarks}
        setRemarks={setRemarks}
        handleSubmitRemarks={handleSubmitRemarks}
      />
    </>
  );
};

export default ProjectSetupApprove;
