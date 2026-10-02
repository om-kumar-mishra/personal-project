import React from "react";
import { Button, Flex, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import uploadDocument from "../../../../../../assets/logos/upload.svg";
import InfoIcons from "../../../../../../assets/logos/SVG/infocircle.svg";
import plusIcon from "../../../../../../assets/logos/SVG/only_add.svg";
import { selectSetProject } from "../../../../../../lib/services/HDFC/Project/selectors";
import { Project } from "../../../../../../lib/services/HDFC/Project/dataTypes";
import { useDisclosure } from "@mantine/hooks";
import UploadDocumentModal from "./UploadDocumentModal";
import {
  selectContructionExcelLoaders,
  selectIsConstructionSetupPending
} from "../../../../../../lib/services/HDFC/Construction/ExcelUpload/selector";

const TemplateDownloadUpload = () => {
  const dispatch = useDispatch();
  const loaders = useSelector(selectContructionExcelLoaders);
  const project = useSelector(selectSetProject) as Project;
  const isConstructionSetupPending = useSelector(selectIsConstructionSetupPending);
  const [uploadDocumentModal, { open: openUploadDocumentModal, close: closeUploadDocumentModal }] = useDisclosure(false);

  const isEnabledPage = isConstructionSetupPending?.isSetup === 0;

  return (
    <>
      <Flex align={"flex-start"} justify={"space-between"} m={"xl"}>
        <Flex direction={"column"} gap={"xl"}>
          {!isEnabledPage && !loaders?.isConstructionSetup ? <Text color='red'>Cannot update SiteImage MIS. SiteImage Setup is still pending</Text> : null}
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Upload Approvals Attachment
            </Text>
            <Button
              disabled={!isEnabledPage && !loaders?.isConstructionSetup}
              bg={"#001d56"}
              w={300}
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

      <UploadDocumentModal open={uploadDocumentModal} onClose={closeUploadDocumentModal} />

    </>
  );
};

export default TemplateDownloadUpload;

