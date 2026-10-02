import React, { useMemo } from "react";
import { Button, Flex, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import downloadTemplate from "../../../../assets/logos/download.svg";
import uploadDocument from "../../../../assets/logos/upload.svg";
import InfoIcons from "../../../../assets/logos/SVG/infocircle.svg";
import plusIcon from "../../../../assets/logos/SVG/only_add.svg";
import filexlsxIcon from "../../../../assets/logos/filexlsx.svg";
import { selectIsCashflowSetup, selectCashflowLoaders } from "../../../../lib/services/HDFC/Cashflow/selector";
import { selectSetProject } from "../../../../lib/services/HDFC/Project/selectors";
import { Project } from "../../../../lib/services/HDFC/Project/dataTypes";
import { useDisclosure } from "@mantine/hooks";
import UploadDocumentModal from "./UploadDocumentModal";
import { DownloadCashflowTemplateRequested } from "../../../../lib/services/HDFC/Cashflow/action";
import TypeSelectModal from "../../Common/TypeSelectModal";

const TemplateDownloadUpload = () => {
  const dispatch = useDispatch();
  const loaders = useSelector(selectCashflowLoaders);
  const project = useSelector(selectSetProject) as Project;
  const isCashflowSetupPending = useSelector(selectIsCashflowSetup);
  const [downloadDocumentModal, { open: openDownloadDocumentModal, close: closeDownloadDocumentModal }] = useDisclosure(false);
  const [uploadDocumentModal, { open: openUploadDocumentModal, close: closeUploadDocumentModal }] = useDisclosure(false);
  const isEnabledPage = isCashflowSetupPending?.iscashflowsetup === 1 && project.status.toLowerCase() !== "draft";
  const downloadTemplateType = useMemo(() => {
    return [
      { label: "Actual", value: "Actual" },
      { label: "Projected", value: "Projected" },
    ];
  }, []);
  return (
    <>
      <Flex align={"flex-start"} justify={"space-between"} m={"xl"}>
        <Flex direction={"column"} gap={"xl"}>
          {!isEnabledPage && !loaders?.isCashflowSetup ? <Text color='red'>Cannot update Cashflow MIS. Project setup status still pending</Text> : null}
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Download the project cashflow update template
            </Text>
            <Button
              variant='outline'
              loading={loaders?.downloadCashflowTemplate}
              disabled={!isEnabledPage && !loaders?.isCashflowSetup}
              rightIcon={<img src={downloadTemplate} style={{ width: "15px", height: "15px" }} className='svgColorGray' />}
              leftIcon={<img src={filexlsxIcon} style={{ width: "15px", height: "15px" }} className='svgColorGray' />}
              color='gray'
              w={350}
              onClick={openDownloadDocumentModal}>
              Project Cashflow Update Template.xlsx
            </Button>
          </Flex>
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Upload Cashflow Template
            </Text>
            <Button
              disabled={!isEnabledPage && !loaders?.isCashflowSetup}
              bg={"#001d56"}
              w={350}
              rightIcon={<img src={uploadDocument} style={{ width: "15px", height: "15px" }} className='svgColorWhite' />}
              leftIcon={<img src={plusIcon} style={{ width: "12px", height: "12px" }} className='svgColorWhite' />}
              onClick={openUploadDocumentModal}
              color='truboard-primary.0'>
              Select file to upload
            </Button>
            <Text color='gray' size={"xs"} weight={500} w={300}>
              <img src={InfoIcons} style={{ width: "15px", height: "15px", color: "#001d56" }} />
              Single Upload file should not be more than 5MB, only .xls and .xlsx files are allowed
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {/* modals */}
      {isEnabledPage ? <UploadDocumentModal open={uploadDocumentModal} onClose={closeUploadDocumentModal} showTypeField={true} /> : null}
      {downloadDocumentModal && (
        <TypeSelectModal
          typesList={downloadTemplateType}
          open={downloadDocumentModal}
          onClose={(type?: string) => {
            type ? dispatch(DownloadCashflowTemplateRequested(project?.REAssetId, type, () => closeDownloadDocumentModal())) : closeDownloadDocumentModal();
          }}
        />
      )}
    </>
  );
};

export default TemplateDownloadUpload;
