import React from "react";
import { Title } from "@mantine/core";
import NewTableWithActions from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { useSelector } from "react-redux";
import { AppState } from "../../../../../lib/common/appState";

const ManageWorkflowReview = () => {
  const nocSetup = useSelector((state: AppState) => state.nocSetup);
  return (
    <div className="mt-3">
      <Title className="ms-2" order={5}>Manage Workflow</Title>
      <NewTableWithActions
        columns={[
          {
            title: "Step",
            accessorKey: "Step",
          },
          { title: "Role", accessorKey: "Role" },
          { title: "Type of step", accessorKey: "TypeOfStep" },
        ]}
        data={nocSetup?.setupWorkflow ?? []}

      />
    </div>
  );
};

export default ManageWorkflowReview;
