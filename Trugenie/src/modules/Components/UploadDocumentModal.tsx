import { Box, Button, FileButton, Flex, Modal, Table, Text, Textarea } from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { useForm } from "@mantine/form";
// import { IconFileTypeXls } from "@tabler/icons-react";
import { useEffect } from "react";
import { mime_types } from "../../utils/commonFunctions";
import { TableRow } from "./TableRow";
import { DEFAULT_DATE_FORMAT } from "./UtilityFunctions";
import uploadDocument from "../../assets/logos/upload.svg";
import addLogo from "../../assets/logos/SVG/add_new.svg";

type FormData = {
  document_date: Date;
  multipartFile: File[] | undefined;
  remarks: string;
};

const UploadDocumentModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const form = useForm<FormData>({
    initialValues: {
      document_date: new Date(),
      multipartFile: undefined,
      remarks: "",
    },

    validate: {
      multipartFile: value => {
        if (!value) {
          return "Please upload a file";
        }
        return true;
      },
    },
  });

  useEffect(() => {
    return () => {
      form.reset();
    };
  }, []);

  const handleUpload = (values: FormData) => {
    console.log("tetxv")
  };

  return (
    <Modal
      size={"lg"}
      opened={open}
      onClose={onClose}
      title={
        <Flex gap={"xs"}>
          <img src={uploadDocument} className = "icon-size" style={{ width: "20px", height: "20px", color: "#001d56" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Upload Document
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleUpload)}>
        <Table>
          <tbody>
            <TableRow
              title={"MIS Date"}
              value={
                <DatesProvider settings={{ firstDayOfWeek: 0, weekendDays: [0] }}>
                  <DatePickerInput
                    labelProps={{
                      style: { color: "#001d56", fontWeight: "bold" },
                    }}
                    valueFormat={DEFAULT_DATE_FORMAT}
                    {...form.getInputProps("document_date")}
                  />
                </DatesProvider>
              }
            />
            <TableRow
              title={"Upload Document"}
              value={
                <FileButton multiple accept={[mime_types.xls, mime_types.xlsx].join(",")} {...form.getInputProps("multipartFile")}>
                  {props => {
                    return (
                      <>
                        {form.values.multipartFile && (
                          <>
                            <Text fw={700}>Files Uploaded :</Text>
                            {form.values.multipartFile?.map(file => file.name).join(", ")}
                          </>
                        )}
                        <Button {...props} h={"150px"} w={"100%"} variant='outline'>
                          <Flex direction={"column"}>
                            <Box mb={"xl"} ml={50}>
                              {/* <IconFileTypeXls size={50} /> */}
                            </Box>
                            <Flex justify={"center"} align={"center"}>
                            <img src={addLogo} className = "icon-size" style={{ width: "20px", height: "20px", color: "#001d56" }} />
                              Select {form.values.multipartFile && form.values.multipartFile?.length > 0 ? "More" : ""} Files to Upload
                            </Flex>
                          </Flex>
                        </Button>
                      </>
                    );
                  }}
                </FileButton>
              }
            />
            <TableRow title={"Remarks"} value={<Textarea placeholder='Remarks' {...form.getInputProps("remarks")} />} />
          </tbody>
        </Table>
        <Flex justify={"center"} gap={"xl"} >
          <Box w={200}>
            <Button variant='outline' onClick={form.reset} className="reset-btn-onhover">
              Reset
            </Button>
          </Box>

          <Box w={200}>
            <Button type="submit" color="truboard-primary.0">
              Upload
            </Button>
          </Box>
        </Flex>
      </form>
    </Modal>
  );
};

export default UploadDocumentModal;
