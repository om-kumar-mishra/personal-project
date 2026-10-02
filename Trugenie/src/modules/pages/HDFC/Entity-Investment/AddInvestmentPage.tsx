import { Button, Flex, Loader, Modal, Select, Space, Table, Text, TextInput, MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import { selectRMUserLoaders, selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { successNotification } from "../../../../utils/notifications";
import { TableRow } from "../../../Components/TableRow";
import { AddInvestmentListRequested, GetInvestmentListRequested } from "../../../../lib/services/HDFC/Entity-Investment/action";
import { selectInvestmentLoaders } from "../../../../lib/services/HDFC/Entity-Investment/selector";
import { selectFundsList } from "../../../../lib/services/HDFC/Funds/selector";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectAllProjectList, selectLoaders } from "../../../../lib/services/HDFC/Project/selectors";

type FormData = {
  investment_name: string;
  type_of_investment: string;
  fund_name: string;
  project: string;
};

const AddInvestmentPageModal = ({ open, onClose }: { onClose: () => void; open: boolean }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const rmUsersLoaders = useSelector(selectRMUserLoaders);
  const loaders = useSelector(selectInvestmentLoaders);
  const fundName = useSelector(selectFundsList);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  const projectList = useSelector(selectAllProjectList);

  const fundNameData =
    fundName && fundName.length > 0
      ? fundName.map(item => ({
        label: item.FundName,
        value: item.FundId.toString(),
      }))
      : [];

      const ProjectData =
      projectList && projectList.length > 0
        ? projectList.map(item => ({
          label: item.AssetName,
          value: item.REAssetId.toString(),
        }))
        : [];

  console.log('fundNameData', fundNameData);

  const form = useForm<FormData>({
    initialValues: {
      investment_name: "",
      type_of_investment: "",
      fund_name: "",
      project: "",
    },
    validateInputOnChange: true,
    validate: {
      //If Needed
    },
  });
  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("Investment added successfully");
      dispatch(GetInvestmentListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
      onClose();
      form.reset();
    }
  };

  const handleFormSubmit = (data: FormData) => {
    const payload = {
      clientId: activeClient.ClientId,
      clientName: activeClient.ClientName,
      fundId: parseInt(data.fund_name),
      investmentType: data.type_of_investment,
      investmentName: data.investment_name,
      createdBy: userDetails?.EmailId ?? "",
      projectIds: form?.values?.project && Array.isArray(form?.values?.project) ? form?.values?.project.join(",") : "",//parseInt(data.project),
    };
    dispatch(
      AddInvestmentListRequested(
        payload,
        actionCallback,
      ),
    );
  };

  return (
    <Modal
      className='modalDropdownOverlay'
      size={"lg"}
      opened={open}
      onClose={() => {
        onClose();
        form.reset();
      }}
      title={
        <Flex gap={"xs"}>
          <img src={addLogo} className='icon-size' style={{ width: "20px", height: "20px", color: "#001d56" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Add Investment
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Table style={{ overflow: "visible" }}>
          <tbody style={{ overflow: "visible" }}>
            <TableRow
              // withAsterisk
              title={"Investment Name"}
              value={<TextInput maxLength={100} placeholder='Enter Investment Name' {...form.getInputProps("investment_name")} />}
            />
            <TableRow
              // withAsterisk
              title={"Type of investment"}
              value={
                <Select
                  required
                  clearable
                  placeholder='Select type of investment'
                  data={[
                    { label: 'Debt', value: 'debt' },
                    { label: 'Equity', value: 'equity' }
                  ]}
                  {...form.getInputProps("type_of_investment")}
                />
              }
            />
            <TableRow
              title={"Fund Name"}
              value={
                <Select
                  clearable
                  placeholder='Select Fund Name'
                  nothingFound={rmUsersLoaders.getRMUserList ? <Loader /> : "No data found"}
                  data={fundNameData}
                  {...form.getInputProps("fund_name")}
                />
              }
            />
            <TableRow //ProjectData
            title={"Project"}
            value={
              <MultiSelect
                clearable
                placeholder='Select project'
                nothingFound={rmUsersLoaders.getRMUserList ? <Loader /> : "No data found"}
                data={ProjectData}
                {...form.getInputProps("project")}
              />
            }
              // withAsterisk
              // title={"Project"}
              // value={<TextInput maxLength={100} placeholder='Enter Project' {...form.getInputProps("project")} />}
            />
          </tbody>
        </Table>
        <Space h={"sm"} />
        <Flex justify={"end"} gap={"xl"}>
          <Button onClick={form.reset} variant='outline' className='reset-btn-onhover'>
            Reset
          </Button>
          <Button color='truboard-primary.0' type='submit' loading={loaders?.addInvestmentListDetails}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddInvestmentPageModal;
