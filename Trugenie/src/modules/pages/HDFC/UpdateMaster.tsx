import { Card, Flex, Loader, Select, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import EditIcon from "../../../assets/logos/SVG/Edit.svg";
import { UserDetails } from "../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../lib/services/hdfc_login/selectors";
import { applicationMasterUpdateRequested, getApplicationMasterRequested } from "../../../lib/services/reports/actions";
import { ApplicationMasterData } from "../../../lib/services/reports/dataTypes";
import { selectMasterApplicationData, selectReportLoaders, selectUpdateMasterState } from "../../../lib/services/reports/selectors";
import { errorNotification } from "../../../utils/notifications";
import { successNotification } from "../../Components/UtilityFunctions";

type FormData = {
  days: string;
};

const UpdateMaster = () => {
  const dispatch = useDispatch();

  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const masterData = useSelector(selectMasterApplicationData) as ApplicationMasterData[];
  const updateMasterState = useSelector(selectUpdateMasterState)
  const [isEdit, setIsEdit] = useState(false);
  const updateMasterLoading = useSelector(selectReportLoaders)

  const form = useForm<FormData>({
    initialValues: {
      days: masterData?.[0]?.Value.toString() ?? "30",
    },

    validate: {
      days: value => {
        if (!value) {
          return "Days is required";
        }
      },
    },
  });

  useEffect(() => {
    dispatch(getApplicationMasterRequested(userDetails.EmailId));
  }, []);

  useEffect(() => {
    form.setFieldValue("days", masterData?.[0]?.Value.toString() ?? "30");
  }, [masterData]);

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("Application Master updated Successfully");
      setIsEdit(false);
    } else {
      errorNotification("Failed to update Application Master");
    }
  };

  const handleSubmit = (data: FormData) => {
    if (data) {
      dispatch(applicationMasterUpdateRequested(Number(data.days), actionCallback));
    }
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Card
        shadow='sm'
        padding='lg'
        radius='md'
        m={"md"}
        withBorder
        sx={{
          overflow: "visible",
        }}>
        <Flex align={"center"} justify={"space-between"} gap={10}>
          <Text size='sm'>
            Max acceptable Period in days for the user ids which have never been used since it&#39;s creation
          </Text>
          <Select searchable
            placeholder='Select Days'
            readOnly={!isEdit}
            data={[
              { label: "30 days", value: "30" },
              { label: "60 days", value: "60" },
              { label: "90 days", value: "90" },
            ]}
            {...form.getInputProps("days")}
          />
          {isEdit ? (
            <>
              <Button color='primary' type='submit' >
                <Flex align={"center"} gap={"xs"}>
                  {updateMasterLoading.updateMaster && <Loader size={"sm"} />}
                  Submit
                </Flex>
              </Button>
            </>
          ) : (
            <img src={EditIcon} style={{ width: "20px", height: "20px", color: "#001d56" }} onClick={() => setIsEdit(!isEdit)} />
          )}
        </Flex>
      </Card>
    </form>
  );
};

export default UpdateMaster;
