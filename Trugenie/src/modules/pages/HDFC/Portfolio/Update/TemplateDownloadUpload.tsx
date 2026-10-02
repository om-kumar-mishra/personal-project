import React from "react";
import { Button, Flex, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import downloadTemplate from "../../../../../assets/logos/download.svg";
import uploadDocument from "../../../../../assets/logos/upload.svg";
import InfoIcons from "../../../../../assets/logos/SVG/infocircle.svg";
import plusIcon from "../../../../../assets/logos/SVG/only_add.svg";
import filexlsxIcon from "../../../../../assets/logos/filexlsx.svg";
import { useDisclosure } from "@mantine/hooks";
import UploadDocumentModal from "./UploadDocumentModal";
import { DownloadFundsTemplateRequested } from "../../../../../lib/services/HDFC/Portfolio/actions";
import { selectFundsLoaders } from "../../../../../lib/services/HDFC/Portfolio/selectors";
import { selectSwitchClient } from "../../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../../lib/services/HDFC/Commons/dataTypes";

const TemplateDownloadUpload = () => {
  const dispatch = useDispatch();
  const loaders = useSelector(selectFundsLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  const [uploadDocumentModal, { open: openUploadDocumentModal, close: closeUploadDocumentModal }] = useDisclosure(false);

  return (
    <>
      <Flex align={"flex-start"} justify={"space-between"} m={"xl"}>
        <Flex direction={"column"} gap={"xl"}>
          {/* {!isEnabledPage && !loaders?.isSummarySetup ? <Text color='red'>Cannot update Summary MIS. Project Summary Setup is still pending</Text> : null} */}
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Download the portfolio template
            </Text>
            <Button
              variant='outline'
              loading={loaders?.downloadFundTemplate}
              rightIcon={<img src={downloadTemplate} style={{ width: "15px", height: "15px" }} className='svgColorGray' />}
              leftIcon={<img src={filexlsxIcon} style={{ width: "15px", height: "15px" }} className='svgColorGray' />}
              color='gray'
              w={300}
              onClick={() => activeClient.ClientId && dispatch(DownloadFundsTemplateRequested(activeClient.ClientId))}>
              Portfolio Template.xlsx
            </Button>
          </Flex>
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Upload Porfolio Template
            </Text>
            <Button
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
