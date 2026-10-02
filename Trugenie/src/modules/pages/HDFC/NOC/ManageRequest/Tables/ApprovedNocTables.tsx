import { Box, Loader, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import checkIcon from "../../../../../../assets/logos/SVG/Check.svg";
import BookIcon from "../../../../../../assets/logos/SVG/Reports.svg";
import crossIcon from "../../../../../../assets/logos/SVG/cross.svg";
import downloadIcon from "../../../../../../assets/logos/download.svg";
import useSearchAndPagination from "../../../../../../hooks/useSearchAndPagination";
import { downloadApprovedNOCRequested, getApprovedNOCListRequested } from "../../../../../../lib/services/HDFC/NOCManageRequest/actions";
import { ApprovedDataType } from "../../../../../../lib/services/HDFC/NOCManageRequest/dataTypes";
import { selectManageRequestLoaders, selectedApprovedNOCList } from "../../../../../../lib/services/HDFC/NOCManageRequest/selectors";
import { selectSetProject } from "../../../../../../lib/services/HDFC/Project/selectors";
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { getPresentableValue, successNotification } from "../../../../../Components/UtilityFunctions";
import PaymentVerificationModal from "../Modal/PaymentVerificationModal";
import ViewDocumentModal from "../Modal/ViewDocumentModal";
const ApprovedNocTables = ({ handleOnClick }: { handleOnClick: (data: any) => void }) => {
  const dispatch = useDispatch();
  const selectedProject = useSelector(selectSetProject);
  const userDetails = useSelector(selectUserDetails);
  const approvedNocList = useSelector(selectedApprovedNOCList);
  const loaders = useSelector(selectManageRequestLoaders);

  const [modalData, setModalData] = useState<ApprovedDataType | null>(null);
  const [paymentRow, setPaymentRow] = useState<ApprovedDataType | undefined>();
  const [isViewDocumentModalOpened, { open: openViewDocumentModal, close: closeViewDocumentModal }] = useDisclosure(false);
  const [ViewPaymentModalState, { open: openViewPaymentModal, close: closeViewPaymentModal }] = useDisclosure(false);

  useEffect(() => {
    selectedProject?.NocProjectId && dispatch(getApprovedNOCListRequested(selectedProject?.NocProjectId || 0, userDetails?.EmailId ?? ""));
  }, [selectedProject?.NocProjectId]);

  useEffect(() => {
    if (paymentRow) {
      openViewPaymentModal();
    }
  }, [paymentRow]);

  const downloadApprovedNocList = () => {
    dispatch(
      downloadApprovedNOCRequested(selectedProject?.NocProjectId || 0, userDetails?.EmailId ?? "", (success: boolean) => {
        if (success) {
          successNotification("Downloaded Successfully!");
        }
      }),
    );
  };

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: approvedNocList ?? [],
    columnsToSearch: [
      { accessorKey: "unitrequestid", type: "text" },
      { accessorKey: "uniqueref", type: "text" },
      { accessorKey: "PurchaserName", type: "text" },
      { accessorKey: "RequestDate", type: "date" },
      { accessorKey: "TypeOfNoc", type: "text" },
      { type: "text", accessorKey: "dpn" },
      { type: "text", accessorKey: "TypeOfNoc" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  return (
    <Box>
      <NewTableWithActions
        loader={loaders.getApprovedNOCList}
        cardHeader={
          <TableHeader
            title='Approved NOCs'
            SearchComponent={
              <>
                {loaders.downloadApprovedNOC ? (
                  <Loader size={"xs"} />
                ) : (
                  <img src={downloadIcon} style={{ height: "15px", width: "15px", cursor: "pointer" }} onClick={downloadApprovedNocList} />
                )}
                {SearchComponent}
              </>
            }
            PaginationComponent={PaginationComponent}
          />
        }
        columns={[
          { title: "Unit Request Id", accessorKey: "unitrequestid", onClick: rowData => handleOnClick(rowData) },
          { title: "Unit", accessorKey: "uniqueref" },
          { title: "Purchaser", accessorKey: "PurchaserName" },
          { title: "Request Raised Date", accessorKey: "RequestDate", transform: value => <Text title={getPresentableValue(value, true, false, false) as string}>{getPresentableValue(value, true, false, false) as string}</Text> },
          { title: "Noc Issued On", accessorKey: "NOCIssued", transform: value =>  <Text title={getPresentableValue(value, true, false, false) as string}>{getPresentableValue(value, true, false, false) as string}</Text> },
          {
            title: "DPN",
            accessorKey: "dpn",
            onClick: rowData => {
              setPaymentRow(rowData);
            },
            icon: row =>
              row.dpnsubmitted === 3 ? (
                <img src={checkIcon} style={{ width: "1rem", height: "0.8rem" }} />
              ) : // <IconCheck size='1rem' color='green' stroke={3} />
              row.dpnsubmitted === 2 ? (
                <img src={BookIcon} style={{ width: "1rem", height: "0.8rem" }} />
              ) : // <IconBook size='1rem' color='orange' stroke={3} />
              row.dpnsubmitted === 4 ? (
                <img src={crossIcon} style={{ width: "1rem", height: "0.8rem" }} />
              ) : (
                // <IconX size='1rem' color='red' stroke={3} />
                ""
              ),
          },
          { title: "Type of Noc", accessorKey: "TypeOfNoc" },
          {
            title: "Action",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "document",
                onClick: rowData => {
                  setModalData(rowData);
                  openViewDocumentModal();
                },
              },
            ],
          },
        ]}
        data={finalData}
      />

      <ViewDocumentModal
        open={isViewDocumentModalOpened}
        onClose={() => {
          setModalData(null);
          closeViewDocumentModal();
        }}
        modalData={modalData}
      />
      <PaymentVerificationModal
        open={ViewPaymentModalState}
        onClose={() => {
          setPaymentRow(undefined);
          closeViewPaymentModal();
        }}
        modalData={paymentRow}
        decision={paymentRow?.dpnsubmitted !== 2} //show dropdown if false, hence it will be shown only for dpnsubmitted== 2
      />
    </Box>
  );
};

export default ApprovedNocTables;
