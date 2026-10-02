import { Box, Tabs } from "@mantine/core";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../../routeConstants";
import ApprovedNocTables from "./Tables/ApprovedNocTables";
import CancelledNocTable from "./Tables/CancelledNocTables";
import PendingNocTables from "./Tables/PendingNocTables";
import RejectedNocTables from "./Tables/RejectedNocTables";
import ProjectDetails from "./ProjectDetails";

enum ManageRequestTabs {
  Pending = "Pending",
  Approved = "Approved",
  Cancelled = "Cancelled",
  Rejected = "Rejected",
}

const ManageRequestList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ManageRequestTabs>(ManageRequestTabs.Pending);
  // const handleOnClick = (data: any) => {
  //   navigate(ROUTES.AUTHORIZATION_REQUEST_PAGE, {
  //     state: { requestData: data },
  //   });
  // };

  const handleOnClick = useCallback(data => {
    navigate(ROUTES.AUTHORIZATION_VIEW_REQUEST_PAGE, {
      state: { requestData: data },
    });
  }, []);

  // selectSetProject
  return (
    <Box>
      <ProjectDetails />
      <Tabs
        value={activeTab}
        onTabChange={(tabsvalue: ManageRequestTabs) => {
          setActiveTab(tabsvalue);
        }}
        color='truboard-primary.0'
        activateTabWithKeyboard={false}>
        <Tabs.List grow>
          {Object.keys(ManageRequestTabs).map((tab, index) => {
            return (
              <Tabs.Tab value={tab} key={index}>
                {tab}
              </Tabs.Tab>
            );
          })}
        </Tabs.List>

        {/* PendingNocTables */}
        <Tabs.Panel value={ManageRequestTabs.Pending} pt='xs'>
          {activeTab === ManageRequestTabs.Pending && <PendingNocTables handleOnClick={handleOnClick} />}
        </Tabs.Panel>

        {/* ApprovedNocTables */}
        <Tabs.Panel value={ManageRequestTabs.Approved} pt='xs'>
          {activeTab === ManageRequestTabs.Approved && <ApprovedNocTables handleOnClick={handleOnClick} />}
        </Tabs.Panel>

        {/* CancelledNocTable */}
        <Tabs.Panel value={ManageRequestTabs.Cancelled} pt='xs'>
          {activeTab === ManageRequestTabs.Cancelled && <CancelledNocTable handleOnClick={handleOnClick} />}
        </Tabs.Panel>

        {/* RejectedNocTables */}
        <Tabs.Panel value={ManageRequestTabs.Rejected} pt='xs'>
          {activeTab === ManageRequestTabs.Rejected && <RejectedNocTables handleOnClick={handleOnClick} />}
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default ManageRequestList;
