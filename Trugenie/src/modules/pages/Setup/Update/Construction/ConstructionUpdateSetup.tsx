import React, { useState } from "react";
import { Box, Tabs } from "@mantine/core";
import ExcelUpload from "./ExcelUpload";
import PhysicalProgress from "./PhysicalProgress";
import SiteImage from "./SiteImage/SiteImage";

enum ConstructionTabs {
  ExcelUpload = "Excel Upload",
  PhysicalProgress = "Physical Progress",
  UploadSiteImages = "Upload Site Images",
}
const ConstructionUpdateSetup = () => {
  const [activeTab, setActiveTab] = useState<ConstructionTabs>(ConstructionTabs.ExcelUpload);
  return (
    <Box>
      <Tabs
        value={activeTab}
        onTabChange={(tabsvalue: ConstructionTabs) => {
          setActiveTab(tabsvalue);
        }}
        color='truboard-primary.0'
        activateTabWithKeyboard={false}>
        <Tabs.List grow>
          {Object.values(ConstructionTabs).map((tab, index) => {
            return (
              <Tabs.Tab value={tab} key={index}>
                {tab}
              </Tabs.Tab>
            );
          })}
        </Tabs.List>

        {/* Excel Upload */}
        <Tabs.Panel value={ConstructionTabs.ExcelUpload} pt='xs'>
          {activeTab === ConstructionTabs.ExcelUpload && <ExcelUpload />}
        </Tabs.Panel>

        {/* Physical Progress */}
        <Tabs.Panel value={ConstructionTabs.PhysicalProgress} pt='xs'>
          {activeTab === ConstructionTabs.PhysicalProgress && <PhysicalProgress />}
        </Tabs.Panel>

        {/* Upload Site Images */}
        <Tabs.Panel value={ConstructionTabs.UploadSiteImages} pt='xs'>
          {activeTab === ConstructionTabs.UploadSiteImages && <SiteImage />}
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default ConstructionUpdateSetup;
