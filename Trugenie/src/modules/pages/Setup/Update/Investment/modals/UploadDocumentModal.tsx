import { Box, Button, FileButton, Flex, Modal, Table, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
// import { IconFileTypeXls } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import onlyPlusIcon from "../../../../../../assets/logos/SVG/only_add.svg";
import uploadDocument from "../../../../../../assets/logos/upload.svg";
import { mime_types } from "../../../../../../utils/commonFunctions";
import { DATE_TIME_FORMAT_WITH_SECONDS } from "../../../../../../utils/constants";
import { TableRow } from "../../../../../Components/TableRow";
import { successNotification } from "../../../../../Components/UtilityFunctions";
import { selectCanSetupInvestment, selectInvestmentLoaders, selectSelectedInvestment } from "../../../../../../lib/services/HDFC/Investment/selector";
import {
  CanSetupInvestmentRequested,
  GetInvestmentPastHistoryListRequested,
  UploadInvestmentSetupTemplateRequested,
} from "../../../../../../lib/services/HDFC/Investment/actions";
import { remarkValidation, uploadFileValidation } from "../../../../../../utils/formValidations";
import { InvestmentListData } from "../../../../../../lib/services/HDFC/Investment/dataTypes";

type FormData = {
  misDate?: Date | null;
  remarks?: string;
  uploadedFile?: File;
};

const UploadDocumentModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const dispatch = useDispatch();

  //#region [selector]
  const loaders = useSelector(selectInvestmentLoaders);
  const investment = useSelector(selectSelectedInvestment) as InvestmentListData;
  const canUpdateValue = useSelector(selectCanSetupInvestment);
  const canUpdate = canUpdateValue?.canupdate !== 0;
  const currentDate = new Date();
  const form = useForm<FormData>({
    initialValues: {
      misDate: null,
      remarks: "",
      uploadedFile: undefined,
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      remarks: remarkValidation,
      uploadedFile: uploadFileValidation,
    },
  });

  //#region [useEffect]
  useEffect(() => {
    return () => {
      form.reset();
      onClose();
    };
  }, []);

  const handelOnclose = () => {
    form.reset();
    onClose();
  };
  const onCallback = (success: boolean) => {
    if (success) {
      successNotification("Uploaded Successfully");
      if (investment.InvestmentId) {
        dispatch(GetInvestmentPastHistoryListRequested(Number(investment.InvestmentId), "setup"));
        dispatch(CanSetupInvestmentRequested(investment.InvestmentId));
      }
      handelOnclose();
    }
  };

  const handleUpload = (values: FormData) => {
    if (values?.uploadedFile && values?.remarks) {
      const payload = {
        investmentId: investment.InvestmentId,
        clientName: investment.ClientName,
        entityName: "", // need to check
        misDate: dayjs(currentDate).format(DATE_TIME_FORMAT_WITH_SECONDS),
        remark: values.remarks ?? "",
        file: values.uploadedFile,
      };
      dispatch(UploadInvestmentSetupTemplateRequested(payload, onCallback));
    }
  };

  return (
    <Modal
      size={"lg"}
      opened={open}
      onClose={handelOnclose}
      title={
        <Flex gap={"xs"}>
          <img src={uploadDocument} style={{ width: "20px", height: "20px" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Upload Template
          </Text>
        </Flex>
      }>
      <form onReset={form.onReset} onSubmit={form.onSubmit(handleUpload)}>
        <Table>
          <tbody>
            <TableRow
              title={"Upload Document"}
              withAsterisk
              value={
                <>
                  <FileButton accept={[mime_types.xls, mime_types.xlsx].join(",")} {...form.getInputProps("uploadedFile")}>
                    {props => {
                      return (
                        <>
                          {form.values.uploadedFile && (
                            <>
                              <Text fw={700}>File Uploaded :</Text>
                              {form.values.uploadedFile?.name}
                            </>
                          )}
                          <Button {...props} h={"150px"} w={"100%"} variant='outline'>
                            <Flex direction={"column"}>
                              <Box mb={"xl"} ml={50}>
                                {/* <IconFileTypeXls size={50} color="gray" /> */}
                              </Box>
                              <Flex justify={"center"} align={"center"}>
                                <img src={onlyPlusIcon} className='svgColorGray' style={{ width: "15px", height: "15px", marginRight: "1rem" }} />
                                <Text color='gray'>Select file to upload</Text>
                              </Flex>
                            </Flex>
                          </Button>
                          {form.errors.uploadedFile ? (
                            <Text color='red' size={12}>
                              {form.errors.uploadedFile}
                            </Text>
                          ) : null}
                        </>
                      );
                    }}
                  </FileButton>
                </>
              }
            />

            <TableRow title={"Remarks"} withAsterisk value={<TextInput placeholder='Remarks' {...form.getInputProps("remarks")} />} />
          </tbody>
        </Table>
        <Flex justify={"flex-end"} gap={"xl"}>
          <Button color='truboard-primary.0' type='submit' disabled={!form.isValid() || !canUpdate} loading={loaders.uploadInvestmentSetup}>
            Upload
          </Button>
        </Flex>
        {!canUpdate && !loaders.uploadInvestmentSetup ? (
          <Text color='red' size={15}>
            Cannot proceed. Setup is still pending.
          </Text>
        ) : null}
      </form>
    </Modal>
  );
};
export default UploadDocumentModal;
