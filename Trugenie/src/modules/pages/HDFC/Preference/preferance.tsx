import { Box, Button, Checkbox, Flex, Select, Table, TextInput, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import calanderIcon from "../../../../assets/logos/SVG/calendar.svg";
import { Project } from "../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../lib/services/HDFC/Project/selectors";
import { UserDetails } from "../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import {
  accountDelinquentUpdateRequested,
  cashCoverCalculateRequested,
  getUpdateHoldStatusRequested,
  nocProjectPrefrenceRequested,
  reProjectExposureRequested,
  reProjectSecurityRequested,
  updateHoldStatusRequested,
} from "../../../../lib/services/prefrences/actions";
import { NOCProjectPrefrence } from "../../../../lib/services/prefrences/dataTypes";
import {
  selectCalculateCashCover,
  selectNOCProjectPrefrence,
  selectPrefrenceLoader,
  selectReProjectExposure,
  selectReProjectSecurity,
  selectUpdateHoldStatus,
} from "../../../../lib/services/prefrences/selectors";
import { DATE_TIME_FORMAT_WITH_SECONDS } from "../../../../utils/constants";
import { TableRow } from "../../../Components/TableRow";
import { errorNotification, successNotification } from "../../../Components/UtilityFunctions";
import ClaculateCashModal from "./modal/calculateCashModal";
import ClaculateSecurityModal from "./modal/calculateSecurity";

const NOCPreferences = () => {
  const dispatch = useDispatch();

  //UseSelector
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const nocPrefrenceData = useSelector(selectNOCProjectPrefrence);
  const reProjectSecurityData = useSelector(selectReProjectSecurity);
  const project = useSelector(selectSetProject) as Project;
  const reProjectExposureData = useSelector(selectReProjectExposure);
  const calulateCashCoverData = useSelector(selectCalculateCashCover);
  const getUpdateHoldData = useSelector(selectUpdateHoldStatus);
  const loader = useSelector(selectPrefrenceLoader);

  // useState
  const [selectedCheckBox, setSelectedCheckBox] = useState(getUpdateHoldData?.data[0].onHold === 1 ? true : false);
  const [accountDelinquent, setAccountDelinquent] = useState(nocPrefrenceData?.data[0] ? nocPrefrenceData["Is account delinquent?"] : "");
  const [updateHoldStatus, setUpdateHoldStatus] = useState(getUpdateHoldData?.data[0].Remarks ?? "");
  const [asOndate, setAsOnDate] = useState(new Date());
  // open modal
  const [CalculateCashState, { open: openCalculateCashModal, close: closeCalculateCashModal }] = useDisclosure(false);
  const [CalculateSecurityState, { open: openCalculateSecurityModal, close: closeCalculateSecurityModal }] = useDisclosure(false);

  // handelCheckBox
  const handelCheckBox = () => {
    setSelectedCheckBox(!selectedCheckBox);
    setUpdateHoldStatus("");
  };

  // current-date
  // const currentDate = new Date();

  //#region [useEffect]
  useEffect(() => {
    setSelectedCheckBox(getUpdateHoldData?.data[0].onHold === 1 ? true : false);
    setUpdateHoldStatus(getUpdateHoldData?.data[0].Remarks ?? "");
  }, [getUpdateHoldData]);

  useEffect(() => {
    dispatch(nocProjectPrefrenceRequested(project?.REAssetId));
    dispatch(getUpdateHoldStatusRequested(project?.REAssetId));
    dispatch(reProjectExposureRequested(project?.REAssetId));
  }, []);

  useEffect(() => {
    setAccountDelinquent(nocPrefrenceData?.data[0]["Is account delinquent?"]);
  }, [nocPrefrenceData]);
  //#endregion

  // handelCashCoverCalculate modal
  const handleCalculateCashCover = () => {
    dispatch(
      cashCoverCalculateRequested({
        reAssetId: project.REAssetId,
        stipulatedCashCover: 0,
        balanceCostProject: 0,
        totalExposure: 0,
        misDate: dayjs(asOndate).format(DATE_TIME_FORMAT_WITH_SECONDS),
        update: 0,
        userEmail: userDetails?.EmailId,
      }),
    );
    openCalculateCashModal();
  };

  // handelCalculateSecurity modal
  const handleCalculateSecurityCover = () => {
    dispatch(nocProjectPrefrenceRequested(project?.REAssetId));
    dispatch(reProjectSecurityRequested(project?.REAssetId));
    dispatch(reProjectExposureRequested(project?.REAssetId));
    openCalculateSecurityModal();
  };

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("Updated successfully");
      dispatch(nocProjectPrefrenceRequested(project?.REAssetId));
    } else {
       // error handling done in common component
    }
  };

  // handel update button
  const handelUpdateDelinquent = () => {
    dispatch(accountDelinquentUpdateRequested(project?.REAssetId, accountDelinquent.toString(),dayjs(asOndate).format("YYYY-MM-DD"), actionCallback));
  };
  const callback = (success: boolean) => {
    if (success) {
      successNotification("Updated successfully");
      dispatch(getUpdateHoldStatusRequested(project?.REAssetId));
    } else {
      errorNotification("Failed to Update zone");
    }
  };

  // handel update hold status button
  const handelUpdateHoldStatus = () => {
    dispatch(
      updateHoldStatusRequested(
        project?.REAssetId,
        Number(selectedCheckBox),
        dayjs(asOndate).format(DATE_TIME_FORMAT_WITH_SECONDS),
        updateHoldStatus ?? "",
        userDetails?.EmailId,
        callback,
      ),
    );
  };
  return (
    <Box pl={"md"}>
      <Table>
        {nocPrefrenceData?.data?.map((pre: NOCProjectPrefrence) => (
          <tbody key={"index"}>
            <TableRow title={"Project"} value={<TextInput mr={400} w={"60%"} disabled placeholder='' value={project?.AssetName} />} />
            <TableRow
              title={"As on Date"}
              value={
                <DateInput
                  label=''
                  mr={400}
                  w={"60%"}
                  placeholder=''
                  value={asOndate}
                  onChange={e => setAsOnDate(e as Date)}
                  maxDate={new Date()}
                  icon={<img src={calanderIcon} style={{ width: "1rem", height: "1rem", color: "#001d56" }} />}
                />
              }
            />

            <TableRow
              title={"Is Account Delinquent ?"}
              value={
                <Flex gap={"md"}>
                  <Select
                    searchable
                    w={"60%"}
                    data={[
                      { value: "0", label: "No" },
                      { value: "1", label: "Yes" },
                    ]}
                    value={accountDelinquent?.toString()}
                    onChange={value => setAccountDelinquent(value)}
                    placeholder='Select'
                  />
                  <Button color='truboard-primary.0' onClick={handelUpdateDelinquent} loading={loader?.updateAccountDelinquent}>
                    Update
                  </Button>
                </Flex>
              }
            />

            <TableRow
              title={"Is cash cover met ?"}
              value={
                <Flex gap={"md"}>
                  <TextInput w={"60%"} disabled placeholder='' value={pre["Is cash cover met?"] === 0 ? "NO" : "Yes"} />
                  <Button color='truboard-primary.0' onClick={handleCalculateCashCover}>
                    Calculate Cash Cover
                  </Button>
                </Flex>
              }
            />

            <TableRow
              title={"Is security cover met ?"}
              value={
                <Flex gap={"md"}>
                  <TextInput w={"60%"} disabled placeholder='' value={pre["Is Security cover met?"] === 0 ? "NO" : "Yes"} />
                  <Button color='truboard-primary.0' onClick={handleCalculateSecurityCover}>
                    Calculate Security Cover
                  </Button>
                </Flex>
              }
            />
            <TableRow
              centerHeader={false}
              title={"Put project on hold ?"}
              value={
                <Flex direction={"column"} gap={"md"}>
                  <Checkbox label='HDFC' onChange={handelCheckBox} color='truboard-primary.0' checked={selectedCheckBox} />
                  <Flex gap={20}>
                    <Textarea minRows={4} w={"60%"} disabled={!selectedCheckBox} value={updateHoldStatus} onChange={e => setUpdateHoldStatus(e.target.value)} />
                    <Button color='truboard-primary.0' onClick={handelUpdateHoldStatus} loading={loader?.getUpdateHoldStatusLoader}>
                      Update Hold Status
                    </Button>
                  </Flex>
                </Flex>
              }
            />
          </tbody>
        ))}
      </Table>
      {calulateCashCoverData && calulateCashCoverData?.data?.length > 0 && (
        <ClaculateCashModal open={CalculateCashState} onClose={closeCalculateCashModal} data={calulateCashCoverData.data} />
      )}
      <ClaculateSecurityModal
        open={CalculateSecurityState}
        onClose={closeCalculateSecurityModal}
        securityData={reProjectSecurityData?.data ?? []}
        exposureData={reProjectExposureData?.data ?? []}
        totalExposureTillDate={nocPrefrenceData as any}
      />
      {/* )} */}
    </Box>
  );
};

export default NOCPreferences;
