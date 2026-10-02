import React from "react";
import AccountDetails from "./AccountDetails";
import ThresholdDetails, { ThreshholdDataType } from "./ThresholdDetails";
import { NocAccountDetailsApiData } from "../../../../../lib/services/nocSetup/datatype";
import { Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";

const Details: React.FC<{
  accountDetails: NocAccountDetailsApiData[] | undefined;
  setAccountDetails: (obj: NocAccountDetailsApiData[]) => void;
  thresholdDetails: ThreshholdDataType | undefined;
  setThresholdDetails: (obj: ThreshholdDataType) => void;
  setThresHoldError: (b: boolean) => void;
}> = ({ accountDetails, setAccountDetails, thresholdDetails, setThresholdDetails, setThresHoldError }) => {
  const selectedProject = useSelector(selectSetProject);
  return (
    <>
      <Text ml={10} fw={500} size='ld'>
        {`Project: ${selectedProject?.AssetName}`}
      </Text>
      <AccountDetails accountDetails={accountDetails} setAccountDetails={setAccountDetails} />
      <ThresholdDetails thresholdDetails={thresholdDetails} setThresholdDetails={setThresholdDetails} setThresHoldError={setThresHoldError} />
    </>
  );
};

export default Details;
