import { useMemo, useState } from "react";
import SwitchTab, { ButtonTabType } from "../../../../Components/SwitchTab";
import NOCIssuedReport from "./NOCIssuedReport";
import AllNOCReport from "./AllNOCReport";

export type TableRowDataType = {
  customerInvesteeCompany: string;
  customerGroup: string;
  leadRM: string;
};

function NOCTransactionReportPage() {
  //#region [state]
  const [activeTab, setActiveTab] = useState<string>("nocIssuedReport");
  //#endregion

  const ButtonTab: ButtonTabType[] = useMemo(() => {
    return [
      {
        id: "nocIssuedReport",
        value: "NOC Issued Report",
      },

      {
        id: "allNOCReport",
        value: "All NOC Report",
      },
    ];
  }, []);

  return (
    <>
      <SwitchTab ButtonTab={ButtonTab} width={"260px"} setActiveTab={setActiveTab} activeTab={activeTab} />

      <div className='mt-3'>
        {activeTab === ButtonTab[0].id && <NOCIssuedReport />}
        {activeTab === ButtonTab[1].id && <AllNOCReport />}
      </div>
    </>
  );
}

export default NOCTransactionReportPage;
