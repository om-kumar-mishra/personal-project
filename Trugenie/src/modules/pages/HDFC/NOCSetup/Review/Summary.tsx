import React from "react";
import { Box, Table } from "@mantine/core";
import { useStyles } from "../../../../Components/TableRow";
import { useSelector } from "react-redux";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";

const Summary = () => {
  const { classes } = useStyles();
  const projectData = useSelector(selectSetProject);

  const summaryData = [
    { header: "Developer Name", content: projectData?.DeveloperName },
    { header: "Project", content: projectData?.AssetName },
    { header: "Asset Locations", content: projectData?.Address },
    { header: "Total Sales Units", content: projectData?.totalunits },
  ];
  return (
    <div className='border boder-primary rounded p-2'>
      <Box w={500}>
        <Table>
          <tbody>
            {summaryData.map((data, i) => (
              <tr key={`summary ${i}`} className={classes.row}>
                <th className={classes.header}>{data.header}:</th>
                <td className={classes.content}>{data.content}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </div>
  );
};

export default Summary;
