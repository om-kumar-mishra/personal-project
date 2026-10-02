import { useMemo, useState } from "react";
import SwitchTab, { ButtonTabType } from "../../../Components/SwitchTab";
import AdminReport from "./AdminReportTab";
import LoginLogoutReport from "./LoginLogoutReport";
import PopulationReport from "./PopulationReportTab";
import RoleRightsReport from "./RoleRightsReportTab";

export type TableRowDataType = {
  customerInvesteeCompany: string;
  customerGroup: string;
  leadRM: string;
};

function ReportPage() {
  //#region [state]
  const [activeTab, setActiveTab] = useState<string>("populationReport");
  //#endregion

  const ButtonTab: ButtonTabType[] = useMemo(() => {
    return [
      {
        id: "populationReport",
        value: "Population Report",
      },
      {
        id: "adminReport",
        value: "Admin Report",
      },
      {
        id: "roleRightsReport",
        value: "Role Rights Report",
      },
      {
        id: "loginLogoutReport",
        value: "Login Logout Report",
      },
    ];
  }, []);

  return (
    <>
      <SwitchTab ButtonTab={ButtonTab} width={"260px"} setActiveTab={setActiveTab} activeTab={activeTab} />

      <div className='mt-3'>
        {activeTab === ButtonTab[0].id && <PopulationReport />}
        {activeTab === ButtonTab[1].id && <AdminReport />}
        {activeTab === ButtonTab[2].id && <RoleRightsReport />}
        {activeTab === ButtonTab[3].id && <LoginLogoutReport />}
      </div>
    </>
  );
}

export default ReportPage;
