import { Card, Flex, Space, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Editicon from "../../../../assets/logos/SVG/Edit.svg";
import ViewIcon from "../../../../assets/logos/SVG/view.svg";
import { ResetRMUsersList, getTaggedRMUserListRequested } from "../../../../lib/services/HDFC/Commons/actions";
import { GetRmUsersDataType } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectTaggedRMUserList } from "../../../../lib/services/HDFC/Commons/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../routeConstants";
import CommonAddButton from "../../../Components/Buttons";
import { TableRow } from "../../../Components/TableRow";
import { getPresentableValue } from "../../../Components/UtilityFunctions";

const rmsNeeded = ["Lead RM", "RM 2", "RM 3"];

const ViewProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userDetails = useSelector(selectUserDetails);
  const taggedRmUserList = useSelector(selectTaggedRMUserList);

  const [rmData, setRmData] = useState<GetRmUsersDataType[] | null>(taggedRmUserList ?? []);

  useEffect(() => {
    return () => {
      dispatch(ResetRMUsersList());
    };
  }, []);

  useEffect(() => {
    setRmData(taggedRmUserList);
  }, [taggedRmUserList]);

  // useEffect(() => {
  //   if (location.state?.DeveloperId && userDetails?.EmailId) {
  //     dispatch(getTaggedRMUserListRequested(userDetails?.EmailId ?? "", Number(location.state?.DeveloperId)));
  //   }
  // }, [location.state?.DeveloperId]);

  const handelEditNavigate = () => {
    navigate(ROUTES.EDIT_PROJECT_PAGE, { state: location.state });
  };

  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder m={20}>
      <Flex gap={"xs"} justify={"space-between"}>
        <div>
          <Flex gap={10} justify={"center"} align={"center"}>
            <img src={ViewIcon} className='icon-size' style={{ width: "20px", height: "20px", color: "#001d56" }} />
            <Text size={"md"} fw='bold' color={"#001d56"}>
              View Project
            </Text>
          </Flex>
        </div>
        <div>
          <Flex gap={10} justify={"center"} align={"center"}>
            <CommonAddButton
              handleClick={handelEditNavigate}
              title='Edit'
              leftIcon={<img src={Editicon} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
            />
          </Flex>
        </div>
      </Flex>
      <Space h={"sm"} />
      <TableRow fullWidth title='Group' value={<Text>{location?.state?.DeveloperName}</Text>} />
      <TableRow title='Borrower' value={<Text>{location?.state?.BorrowerName}</Text>} />
      <TableRow title='Project ID' value={<Text>{location?.state?.ProjectId}</Text>} />
      <TableRow title='Project Name' value={<Text>{location?.state?.AssetName}</Text>} />
      <TableRow title='Zone' value={<Text>{location?.state?.zonename}</Text>} />
      <TableRow title='Region' value={<Text>{location?.state?.RegionsName}</Text>} />
      <TableRow title='Location' value={<Text>{location?.state?.LocationName}</Text>} />
      <TableRow title='Address' value={<Text>{location?.state?.Address}</Text>} />
      {/* <TableRow
        title="RM's Tagged"
        value={
          <Flex direction={"column"}>
            {rmData?.map((item, index) => {
              return (
                <Flex key={index}>
                  <Text>{item.AccessTag} - &emsp;</Text>
                  <Text>{`${item.EmpCode} ${item.EmpName} `}</Text>
                </Flex>
              );
            })}
            {rmsNeeded
              .filter(item => !rmData?.map(item => item.AccessTag)?.includes(item))
              .map((item, index) => {
                return (
                  <Flex key={index}>
                    <Text>{item} - &emsp;</Text>
                    {rmData && rmData.length > 0 && <Text>Not Tagged</Text>}
                  </Flex>
                );
              })}
          </Flex>
        }
      /> */}
      <TableRow
        title='Last Edited By/On'
        value={
          <Text>
            {location?.state?.lasteditby ? `${location?.state?.lasteditby} - ` : ""}
            {getPresentableValue(location?.state.lastediton, true)}
          </Text>
        }
      />
      <TableRow title='Status' value={<Text>{location?.state?.status}</Text>} />
    </Card>
  );
};

export default ViewProject;
