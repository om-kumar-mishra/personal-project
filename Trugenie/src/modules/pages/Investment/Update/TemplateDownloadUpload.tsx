import React from "react";
import { Button, Flex, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import downloadTemplate from "../../../../assets/logos/download.svg";
import uploadDocument from "../../../../assets/logos/upload.svg";
import InfoIcons from "../../../../assets/logos/SVG/infocircle.svg";
import plusIcon from "../../../../assets/logos/SVG/only_add.svg";
import filexlsxIcon from "../../../../assets/logos/filexlsx.svg";
import { useDisclosure } from "@mantine/hooks";
import UploadDocumentModal from "./UploadDocumentModal";
import { DownloadInvestmentTemplateRequested } from "../../../../lib/services/HDFC/Investment/actions";
import { selectInvestmentLoaders, selectIsInvestmentSetup, selectSelectedInvestment } from "../../../../lib/services/HDFC/Investment/selector";
import { InvestmentListData } from "../../../../lib/services/HDFC/Investment/dataTypes";

const TemplateDownloadUpload = () => {
  const dispatch = useDispatch();
  const loaders = useSelector(selectInvestmentLoaders);
  const investment = useSelector(selectSelectedInvestment) as InvestmentListData;
  const isInvestmentSetupPending = useSelector(selectIsInvestmentSetup);
  const [uploadDocumentModal, { open: openUploadDocumentModal, close: closeUploadDocumentModal }] = useDisclosure(false);

  const isEnabledPage = isInvestmentSetupPending?.isSetup === 1

  return (
    <>
      <Flex align={"flex-start"} justify={"space-between"} m={"xl"}>
        <Flex direction={"column"} gap={"xl"}>
          {!isEnabledPage && !loaders?.isInvestmentSetup ? <Text color='red'>Cannot update Investment MIS. Investment Setup is still pending</Text> : null}
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Download the investment update template 
            </Text>
            <Button
              variant='outline'
              loading={loaders?.downloadInvestmentTemplate}
              disabled={!isEnabledPage && !loaders?.isInvestmentSetup}
              rightIcon={<img src={downloadTemplate} style={{ width: "15px", height: "15px" }} className='svgColorGray' />}
              leftIcon={<img src={filexlsxIcon} style={{ width: "15px", height: "15px" }} className='svgColorGray' />}
              color='gray'
              w={300}
              onClick={() => dispatch(DownloadInvestmentTemplateRequested(investment.InvestmentId, "Update"))}>
              Investment Update Template.xlsx
            </Button>
          </Flex>
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Upload Investment Update Template
            </Text>
            <Button
              disabled={!isEnabledPage && !loaders?.isInvestmentSetup}
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
      {isEnabledPage ? (
        <UploadDocumentModal open={uploadDocumentModal} onClose={closeUploadDocumentModal} />
      ) : null}
    </>
  );
};

export default TemplateDownloadUpload;
