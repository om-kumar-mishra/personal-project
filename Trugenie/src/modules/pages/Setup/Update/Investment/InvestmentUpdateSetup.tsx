import { Button, Flex, Text, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InforCircleIcon from "../../../../../assets/logos/SVG/infocircle.svg";
import addIcon from "../../../../../assets/logos/SVG/only_add.svg";
import withDraw from "../../../../../assets/logos/SVG/withdraw.svg";
import downloadTemplate from "../../../../../assets/logos/download.svg";
import filexlsxIcon from "../../../../../assets/logos/filexlsx.svg";
import uploadDocument from "../../../../../assets/logos/upload.svg";
import useSearchAndPagination from "../../../../../hooks/useSearchAndPagination";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { getPresentableValue, successNotification } from "../../../../Components/UtilityFunctions";
import CanUploadDocumentModal from "./modals/CanUploadDocumentModal";
import UploadDocumentModal from "./modals/UploadDocumentModal";
import { downloadRowDataRequest } from "../../../../../lib/services/HDFC/common/action";
import {
  selectCanSetupInvestment,
  selectInvestmentLoaders,
  selectInvestmentPastHistoryList,
  selectSelectedInvestment,
} from "../../../../../lib/services/HDFC/Investment/selector";
import {
  CanSetupInvestmentRequested,
  DownloadInvestmentTemplateRequested,
  GetInvestmentPastHistoryListRequested,
  UpdateInvestmentStatusRequested,
} from "../../../../../lib/services/HDFC/Investment/actions";
import { InvestmentListData, InvestmentPastHistoryData } from "../../../../../lib/services/HDFC/Investment/dataTypes";

const InvestmentUpdateSetup = () => {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const [dowloadRowLoader, setdowloadRowLoader] = useState<string | number | null>(null);
  const investment = useSelector(selectSelectedInvestment) as InvestmentListData;
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const loaders = useSelector(selectInvestmentLoaders);
  const investmentPastHistoryList = useSelector(selectInvestmentPastHistoryList);
  const canUpdateValue = useSelector(selectCanSetupInvestment);
  const canUpdate = canUpdateValue?.canupdate;
  const [uploadDocumentModal, { open: openUploadDocumentModal, close: closeUploadDocumentModal }] = useDisclosure(false);
  const [canUploadDocumentModal, { open: openCanUploadDocumentModal, close: closeCanUploadDocumentModal }] = useDisclosure(false);
  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: investmentPastHistoryList ?? [],
    columnsToSearch: [
      { accessorKey: "Entity", type: "text" },
      { accessorKey: "Role", type: "text" },
      { accessorKey: "UpdatedBy", type: "text" },
      { accessorKey: "Status", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const handelDownloadProject = () => {
    investment.InvestmentId && dispatch(DownloadInvestmentTemplateRequested(investment.InvestmentId, "Setup"));
  };

  useEffect(() => {
    if (investment.InvestmentId) {
      dispatch(GetInvestmentPastHistoryListRequested(investment.InvestmentId, "Setup"));
      dispatch(CanSetupInvestmentRequested(investment.InvestmentId));
    }
  }, [investment.InvestmentId]);

  const callBack = () => {
    setdowloadRowLoader(null);
  };

  const handelDownloadRowData = (row: InvestmentPastHistoryData) => {
    setdowloadRowLoader(row?.FileName);
    dispatch(downloadRowDataRequest(row.FileContainer, row.FilePath, row.FileName, callBack));
  };

  const successCallback = (success: boolean) => {
    setdowloadRowLoader(null);
    if (success) {
      successNotification("Withdraw successfully");
      dispatch(GetInvestmentPastHistoryListRequested(investment.InvestmentId, "Setup"));
      dispatch(CanSetupInvestmentRequested(investment.InvestmentId));
    }
  };
  const handelWithDrawRowData = (row: InvestmentPastHistoryData) => {
    openConfirmModal({
      title: (
        <Flex align='center'>
          <img src={withDraw} style={{ width: "1rem", height: "1rem", marginRight: "8px" }} />
          <Text size='md'>Withdraw Setup</Text>
        </Flex>
      ),
      centered: true,
      color: "blue",
      size: "lg",
      children: (
        <>
          <Text size='sm'>Are you sure you want to withdraw the setup uploaded on {getPresentableValue(row?.UploadDate, true, false, false)} ?</Text>
        </>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: {
        loading: loaders?.updateInvestmentStatus,
        style: { backgroundColor: theme.colors["truboard-primary"][0], color: theme.colors["white"][0] },
      },
      cancelProps: {
        style: { backgroundColor: theme.colors["truboard-primary"][0], color: theme.colors["white"][0] },
      },
      onConfirm: () => {
        setdowloadRowLoader(row?.InvestmentHistoryId);
        const requestdata = { status: "Withdraw", investmentHistoryId: row.InvestmentHistoryId, createdBy: userDetails?.EmailId };
        dispatch(UpdateInvestmentStatusRequested(requestdata, successCallback));
      },
    });
  };
  const handelUploadModalCanUpdateModal = () => {
    {
      canUpdate ? openUploadDocumentModal() : openCanUploadDocumentModal();
    }
  };
  return (
    <>
      <Flex align={"flex-start"} justify={"space-between"} m={"md"}>
        <Flex direction={"column"} gap={"xl"}>
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Download the investment setup template
            </Text>
            <Button
              onClick={handelDownloadProject}
              name='file-upload'
              variant='outline'
              rightIcon={<img src={downloadTemplate} style={{ width: "20px", height: "20px" }} />}
              leftIcon={<img src={filexlsxIcon} style={{ width: "20px", height: "20px" }} />}
              color='gray'
              w={300}
              loading={loaders.downloadInvestmentTemplate}>
              Investment Setup Template.xlsx
            </Button>
          </Flex>
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Upload Investment Setup Template
            </Text>
            <Button
              rightIcon={<img src={uploadDocument} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
              leftIcon={<img src={addIcon} style={{ width: "15px", height: "15px", filter: "invert(1)" }} />}
              onClick={handelUploadModalCanUpdateModal}
              color='truboard-primary.0'>
              Select File to Upload
            </Button>
            <Text color='gray' size={"xs"} weight={500} w={300}>
              <img src={InforCircleIcon} style={{ width: "15px", height: "15px", color: "#001d56" }} /> Single Upload file should not be more than 5MB, only
              .xls and .xlsx file type allowed
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <NewTableWithActions
        loader={loaders?.investmentHistoryList}
        cardHeader={<TableHeader title={"Past Updates"} SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Upload Date",
            accessorKey: "UploadDate",
            transform: (value: string) => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
          },
          { title: "Entity", accessorKey: "Entity" },
          { title: "Role", accessorKey: "Role" },
          { title: "Updated By", accessorKey: "UpdatedBy" },
          { title: "Status", accessorKey: "Status" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "download",
                onClick: row => handelDownloadRowData(row),
                loading(row) {
                  return row?.FileName === dowloadRowLoader && loaders?.downloadInvestmentTemplate;
                },
              },

              {
                type: "withDraw",
                onClick: row => handelWithDrawRowData(row),
                override: rowData => {
                  return {
                    icon: rowData.Status === "Pending" ? withDraw : null,
                    tooltip: rowData.Status === "Pending" ? "Withdraw" : "",
                  };
                },
                loading(row) {
                  return row?.InvestmentHistoryId === dowloadRowLoader && loaders?.updateInvestmentStatus;
                },
              },
            ],
          },
        ]}
        data={finalData}
      />
      <UploadDocumentModal open={uploadDocumentModal} onClose={closeUploadDocumentModal} />
      <CanUploadDocumentModal open={canUploadDocumentModal} onClose={closeCanUploadDocumentModal} />
    </>
  );
};

export default InvestmentUpdateSetup;
