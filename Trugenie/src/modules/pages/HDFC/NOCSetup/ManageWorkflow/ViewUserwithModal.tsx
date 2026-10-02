import { Box, Table } from "@mantine/core";
import { useSelector } from "react-redux";
import withModalMatine from "../../../../../hoc/withModalMatine";
import { AppState } from "../../../../../lib/common/appState";
import NewTableWithActions from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { useStyles } from "../../../../Components/TableRow";

const ViewUserModal = () => {
  const nocSetup = useSelector((state: AppState) => state.nocSetup);
  const { classes } = useStyles();
  const summaryData = [
    {
      header: "Group",
      content: nocSetup?.viewUserDetails?.[0]?.developerCustomerGroup ?? "",
    },
    {
      header: "Borrower",
      content: nocSetup?.viewUserDetails?.[0]?.developerCustomerInvestee ?? "",
    },
  ];
  return (
    <>
      <Box w={500}>
        <Table>
          <tbody>
            {summaryData.map((data, i) => (
              <tr key={`${data.header}-${i}`} className={classes.row}>
                <th className={classes.header}>{data.header}:</th>
                <td className={classes.content}>{data.content}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
      <NewTableWithActions
        columns={[
          // {
          //   title: "Sr.No.",
          //   accessorKey: "srno",
          // },
          { title: "Employee Name", accessorKey: "empName" },
          { title: "Email ID", accessorKey: "emailId" },
        ]}
        data={nocSetup.viewUserDetails ?? []}
      />
    </>
  );
};
const ViewUserwithModal = withModalMatine(ViewUserModal);

export default ViewUserwithModal;
