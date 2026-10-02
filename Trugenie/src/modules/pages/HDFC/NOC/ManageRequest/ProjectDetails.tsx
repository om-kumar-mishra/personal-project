import { Card, SimpleGrid, Table, Text } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNOCProjectDetailsRequested } from "../../../../../lib/services/HDFC/NOCManageRequest/actions";
import { selectedNocProjectDetailsData } from "../../../../../lib/services/HDFC/NOCManageRequest/selectors";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { TableRow } from "../../../../Components/TableRow";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const project = useSelector(selectSetProject);
  const userDetails = useSelector(selectUserDetails);
  const nocProjectDetails = useSelector(selectedNocProjectDetailsData);

  useEffect(() => {
    project?.NocProjectId && userDetails?.EmailId && dispatch(getNOCProjectDetailsRequested(project.NocProjectId, userDetails.EmailId));
  }, [project]);

  return (
    <Card withBorder radius='lg' shadow='sm' m={12}>
      <SimpleGrid
        cols={2}
        sx={{
          gap: "0px",
        }}>
        <Table>
          <tbody>
            <TableRow title='Project: ' value={<Text>{nocProjectDetails?.REAssetName}</Text>} />
            <TableRow title='Project Location: ' value={<Text>{nocProjectDetails?.ProjectLocation}</Text>} />
            <TableRow title='Total Units: ' value={<Text>{nocProjectDetails?.TotalUnits}</Text>} />
            <TableRow title='' value='' />
            {/* <TableRow title='Cancellation Requests: ' value={<Text>{nocProjectDetails?.cancelrequest}</Text>} />
            <TableRow title='NOC issued: ' value={<Text>{nocProjectDetails?.nocissued}</Text>} /> */}
          </tbody>
        </Table>
        <Table>
          <tbody>
            <TableRow title='Group: ' value={<Text>{nocProjectDetails?.DeveloperName}</Text>} />
            <TableRow title='New Request: ' value={<Text>{nocProjectDetails?.newrequest}</Text>} />
            <TableRow title='Registered: ' value={<Text>{nocProjectDetails?.registered}</Text>} />
            <TableRow title='Booked: ' value={<Text>{nocProjectDetails?.booked}</Text>} />
            {/* <TableRow title='' value='' /> */}
          </tbody>
        </Table>
      </SimpleGrid>
    </Card>
  );
};

export default ProjectDetails;
