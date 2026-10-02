import { Card, Flex, Modal, Table, Text, createStyles, Button, Title, Center, Loader, Badge, Space } from "@mantine/core";
import { useDynamicDataSearchAndPagination } from "./customSearchPagination";
import { SummaryDetailsData } from "../../../../../lib/services/HDFC/Sales/dataTypes";

export const useStyles = createStyles(theme => {
  return {
    header: {
      ["th"]: {
        backgroundColor: "#dedede",
        color: "#001d56 !important",
        fontSize: "12px !important",
      },
      height: "2.5rem",
    },
    body: {
      fontSize: "0.8rem !important",
      color: "gray !important",
      fontWeight: 500,
      // lineBreak: "anywhere",
    },
    stickyHeader: {
      position: "sticky",
      top: 0,
      zIndex: 49,
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      ["th"]: { backgroundColor: "#dedede", color: "#001d56 !important" },
      transition: "box-shadow 150ms ease",
    },
    selectedRow: {
      backgroundColor: "#001d56",
      ["td"]: { color: "#fff !important" },
    },
  };
});

const SalesSummaryDetail = ({
  open,
  selectedStatus,
  salesSummaryDetail,
  dataLoader,
  onClose,
}: {
  open: boolean;
  selectedStatus: string | null;
  salesSummaryDetail: SummaryDetailsData;
  dataLoader: boolean;
  onClose: () => void;
}) => {
  const { classes } = useStyles();
  const { finalData, SearchComponent, PaginationComponent } = useDynamicDataSearchAndPagination({
    data: salesSummaryDetail?.tableData,
    // columnsToSearch: [],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  return (
    <Modal
      size='100%'
      opened={open}
      onClose={onClose}
      style={{ overflow: "visible" }}
      title={
        <Flex gap={"xs"}>
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Summary Details
          </Text>
        </Flex>
      }>
      <Flex align={"center"} justify={"space-between"} my='xs'>
        <Flex gap={10} align={"center"}>
          {/* <Title order={4} color='#001d56'></Title> */}
          <Badge color='truboard-primary.0' size='xl' radius='sm' variant='outline'>
            {selectedStatus} {salesSummaryDetail?.tableData?.length}
          </Badge>
          {SearchComponent}
        </Flex>
        {PaginationComponent}
      </Flex>
      <Card
        shadow='sm'
        radius='sm'
        padding='sm'
        withBorder
        style={{
          overflow: "revert",
          overflowX: "scroll",
        }}>
        <Table fontSize={"xs"}>
          <thead className={classes.header}>
            <tr>{salesSummaryDetail && salesSummaryDetail?.headers?.map((item, index) => <th key={index}>{item}</th>)}</tr>
          </thead>
          <tbody className={classes.body}>
            {finalData && finalData.length > 0 && !dataLoader ? (
              finalData.map((rows, index) => (
                <tr key={index}>
                  {rows?.map((item, rowIndex) => (
                    <td key={`${index}.${rowIndex}`}>{item ?? "-"}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={salesSummaryDetail?.headers?.length}
                  style={{
                    backgroundColor: "white",
                  }}>
                  <Center mx='auto'>{dataLoader ? <Loader size='md' /> : "No data Found!"}</Center>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
      <Flex justify='flex-end' style={{marginTop:"1em"}}>
        <Button color='truboard-primary.0' onClick={onClose}>
          Close
        </Button>
      </Flex>
    </Modal>
  );
};

export default SalesSummaryDetail;
