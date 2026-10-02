import { Box, Tabs } from "@mantine/core";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../routeConstants";
import ExcelUpload from "./ApproveTab/ExcelUpload";
import PhysicalProgress from "./ApproveTab/PhysicalProgress";
import Approval from "./ApproveTab/Approval";
import SiteImage from "./ApproveTab/SiteImage";


enum UpdateConstructionTabs {
  Upload = "Excel Upload",
  Physicalprogress = "Physical Progress",
  Uploadsiteimage = "Upload Site Images",
  Approvals = "Approvals"
}

const ConstructionApprove = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<UpdateConstructionTabs>(UpdateConstructionTabs.Upload);

  const handleOnClick = useCallback(data => {
    navigate(ROUTES.CONSTRUCTION_UPDATE, {
      state: { requestData: data },
    });
  }, []);

  // selectSetProject
  return (
    <Box>
      <Tabs
        value={activeTab}
        onTabChange={(tabsvalue: UpdateConstructionTabs) => {
          setActiveTab(tabsvalue);
        }}
        color='truboard-primary.0'
        activateTabWithKeyboard={false}>
        <Tabs.List grow>
          {Object.values(UpdateConstructionTabs).map((tab, index) => {
            return (
              <Tabs.Tab value={tab} key={index}>
                {tab}
              </Tabs.Tab>
            );
          })}
        </Tabs.List>

        {/* ExcelUpload */}
        <Tabs.Panel value={UpdateConstructionTabs.Upload} pt='xs'>
          {activeTab === UpdateConstructionTabs.Upload &&
            <ExcelUpload handleOnClick={handleOnClick} />}
        </Tabs.Panel>

        {/* Physical Progress */}
        <Tabs.Panel value={UpdateConstructionTabs.Physicalprogress} pt='xs'>
          {activeTab === UpdateConstructionTabs.Physicalprogress &&
            <PhysicalProgress handleOnClick={handleOnClick} />
          }
        </Tabs.Panel>

        {/* Upload Site Images */}
        <Tabs.Panel value={UpdateConstructionTabs.Uploadsiteimage} pt='xs'>
          {activeTab === UpdateConstructionTabs.Uploadsiteimage &&
            <SiteImage handleOnClick={handleOnClick} />
          }
        </Tabs.Panel>

        {/* Approvals */}
        <Tabs.Panel value={UpdateConstructionTabs.Approvals} pt='xs'>
          {activeTab === UpdateConstructionTabs.Approvals &&
            <Approval handleOnClick={handleOnClick} />
          }
        </Tabs.Panel>

      </Tabs>
    </Box>
  );
};

export default ConstructionApprove;
