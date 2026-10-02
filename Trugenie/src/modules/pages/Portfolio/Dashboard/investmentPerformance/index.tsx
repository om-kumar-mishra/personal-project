import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faFloppyDisk, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import InvestmentPerformanceSelectBox from "./selectBox";
import { Option } from "react-multi-select-component";
import { selectPortfolioSummaryList, selectfilterValues } from "../../../../../lib/services/portfolioView/selectors";
import { AppState } from "../../../../../lib/common/appState";
import { getNumberSystem } from "../../../../../lib/services/common/selector";
import { IconListType, RemarksObjType } from "../../../../../layout/dashboardRemarks/Datatypes";
import { modules, portfolioChartNames, portfolioDashboardName } from "../../../../../lib/services/dashboardRemarks/constants";
import { DEFAULT_ALL } from "../../../../../utils/constants";
import { fetchInvestementPerformanceFiltersRequested, fetchPortfolioSummaryListRequested } from "../../../../../lib/services/portfolioView/action";
import { investmentWiseSummaryList } from "../../../../../lib/services/portfolioView/dataTypes";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";
import { convertDateFormatYY, handleMultiFormatValue, openInNewTab } from "../../../../../utils/commonFunctions";
import SpinnerComponent from "../../../../Components/SpinnerComponent";
import { DashboardIcons, DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { formatDealMultiple, getPercentForInvestment, numberWithCommasAndFraction } from "../../../../../widgets/charts/Recharts/utils";
import InvestmentTable from "../../../InvestmentsDashboard/InvestmentTable";
import { selectSwitchClient } from "../../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../../lib/services/HDFC/Commons/dataTypes";

export const filterDropdowns = {
  sumaryAsOn: null,
  developers: null,
  regions: null,
  funds: null,
  exitTimeline: null,
};
export type dropdowns = {
  sumaryAsOn: { value: string; label: string } | null;
  developers: Option[] | null;
  regions: Option[] | null;
  funds: Option[] | null;
  exitTimeline: { value: string; label: string } | null;
};
const InvestmentPerformance = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const portfolioSummaryList = useSelector(selectPortfolioSummaryList);
  const {dashboardRemark } = useSelector((state: AppState) => state);
  const selectFilterValue = useSelector(selectfilterValues);
  const numberSystem = useSelector(getNumberSystem);
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  const clientId = String(activeClient.ClientId);
  const [addRemark, setAddRemark] = useState<boolean>(false);
  const [remarks, setRemarks] = useState<RemarksObjType>({});

  const iconsList: IconListType[] = useMemo(() => {
    return [
      {
        title: addRemark ? "Save Remark" : "Add Remark",
        icon: addRemark ? faFloppyDisk : faFolderPlus,
        onClick: () => setAddRemark(!addRemark),
        remark: true,
      },
    ];
  }, [addRemark, setAddRemark]);

  const saveRemarkRequest = useMemo(() => {
    return {
      moduleId: Number(clientId),
      module: modules.Portfolio,
      misDate: selectFilterValue?.sumaryAsOn?.value ?? "",
      dashboardName: portfolioDashboardName.Investment_Performance,
      chartName: "",
      remark: "",
      addedBy: "",
      createdBy: userDetails.EmailId,
      filters: [
        {
          filterName: "funds",
          filterValue: selectFilterValue?.funds
            ? selectFilterValue.funds.map((v) => v.value).join(",")
            : DEFAULT_ALL,
        },
        {
          filterName: "sumaryAsOn",
          filterValue: selectFilterValue?.sumaryAsOn?.value ?? "",
        },
        {
          filterName: "developers",
          filterValue: selectFilterValue?.developers
            ? selectFilterValue.developers.map((v) => v.value).join(",")
            : DEFAULT_ALL,
        },
        {
          filterName: "regions",
          filterValue: selectFilterValue?.regions
            ? selectFilterValue.regions.map((v) => v.value).join(",")
            : DEFAULT_ALL,
        },
        {
          filterName: "exitTimeline",
          filterValue: selectFilterValue?.exitTimeline?.value ?? DEFAULT_ALL,
        },
      ],
    };
  }, [clientId, selectFilterValue]);

  useEffect(() => {
    if (portfolioSummaryList?.remarks) setRemarks(portfolioSummaryList.remarks);
    else setRemarks({});
  }, [portfolioSummaryList?.remarks]);


  useEffect(() => {
    if (clientId) {
      dispatch(fetchInvestementPerformanceFiltersRequested(clientId));
    }
  }, [ clientId]);

  useEffect(() => {
    if (selectFilterValue && clientId && selectFilterValue?.sumaryAsOn?.value)
      dispatch(
        fetchPortfolioSummaryListRequested(
          clientId,
          userDetails.EmailId,
          selectFilterValue?.funds
            ? selectFilterValue.funds.map((v) => v.value).join(",")
            : DEFAULT_ALL,
          selectFilterValue?.sumaryAsOn?.value ?? "",
          selectFilterValue?.developers
            ? selectFilterValue.developers.map((v) => v.value).join(",")
            : DEFAULT_ALL,
          selectFilterValue?.regions
            ? selectFilterValue.regions.map((v) => v.value).join(",")
            : DEFAULT_ALL,
          selectFilterValue?.exitTimeline
            ? selectFilterValue.exitTimeline?.value
            : DEFAULT_ALL
        )
      );
  }, [selectFilterValue]);

  const handelView = (invetsmentDetails: investmentWiseSummaryList) => {
    const investmentID = invetsmentDetails.investmentId;
    // if (!investmentID) return;
    // navigate({
    //   pathname: ROUTES.INVESTMENTS_DASHBOARD,
    //   search: createSearchParams({
    //     emailid,
    //     oid,
    //     investmentID,
    //   }).toString(),
    // });
    localStorage.setItem("investmentId", investmentID);
    const url = `${portfolioSummaryList?.url}/#/InvestmentHome`;
    openInNewTab(url);
  };

  return (
    <div className="main-body">
      {(dashboardRemark.loading.getDashboardRemark ||
        dashboardRemark.loading.insertDashboardRemark) && <SpinnerComponent />}
      <div className="padding-none">
        <div className="main-color p-2 d-flex justify-content-between dashboard-heading heading-bg-color">
          <span className="dashboard-heading-text">
            INVESTMENT PERFORMANCE - Portfolio View
          </span>
          <DashboardIcons iconsList={iconsList} />
        </div>
      </div>
      <div className="mt-3 mb-3">
        <InvestmentPerformanceSelectBox type="fund" />
      </div>
      <div className="sales-graph-heading">Fund Wise Summary</div>
      <div className="col-md-12 col-sm-12">
        <div className="table-border">
          <div className="p-3">
            <InvestmentTable
              containerStyles={{
                maxHeight: "250px",
              }}
              columns={[
                { title: "Fund", accessorKey: "fund" },
                {
                  title: `Fund Commitment (${numberSystem})`,
                  accessorKey: "fundCommitment",
                  // type: "float",
                  formatValue: (value: number) =>
                    `${numberWithCommasAndFraction(
                      value,
                      import.meta.env.VITE_REACT_APP_INR_DECIMALS
                    )}`,
                },
                {
                  title: `Amount Committed (${numberSystem})`,
                  accessorKey: "amountCommited",
                  // type: "float",
                  formatValue: (value: number) =>
                    `${numberWithCommasAndFraction(
                      value,
                      import.meta.env.VITE_REACT_APP_INR_DECIMALS
                    )}`,
                },
                {
                  title: `Amount Invested (${numberSystem})`,
                  accessorKey: "amountInvested",
                  // type: "float",
                  formatValue: (value: number) =>
                    `${numberWithCommasAndFraction(
                      value,
                      import.meta.env.VITE_REACT_APP_INR_DECIMALS
                    )}`,
                },
                {
                  title: `Amount Returned (${numberSystem})`,
                  accessorKey: "amountReturned",
                  // type: "float",
                  formatValue: (value: number) =>
                    `${numberWithCommasAndFraction(
                      value,
                      import.meta.env.VITE_REACT_APP_INR_DECIMALS
                    )}`,
                },
                {
                  title: "NAV/Outstanding",
                  accessorKey: "outstanding",
                  // type: "float",
                  formatValue: (value: number) =>
                    `${numberWithCommasAndFraction(
                      value,
                      import.meta.env.VITE_REACT_APP_INR_DECIMALS
                    )}`,
                },
                {
                  title: "Current IRR (Gross/Net)",
                  accessorKey: "currentIRR",
                },
                {
                  title: "Current Multiple (Gross/Net)",
                  accessorKey: "currentMultiple",
                },
              ]}
              // fund wise summary data
              data={portfolioSummaryList?.fundWiseSummaryList ?? []}
            />
          </div>
        </div>
      </div>
      <div className="mt-3 mb-3">
        <InvestmentPerformanceSelectBox type="investment" />
      </div>
      <div className="sales-graph-heading">Investment Wise Summary</div>
      <div className="col-md-12 col-sm-12 ">
        <div className="table-Portfolio-col-scroll table-border ">
          <div className="p-3">
            <div className="table-scrollbar">
              <InvestmentTable
                // containerStyles={{
                //   maxHeight: "500px",
                // }}
                columns={[
                  { title: "Actions", accessorKey: "actions" },
                  { title: "Fund", accessorKey: "fund", sort: true },
                  { title: "Developer", accessorKey: "developer", sort: true },
                  {
                    title: "Developer Location",
                    accessorKey: "region",
                    sort: true,
                  },
                  {
                    title: "Investee Company",
                    accessorKey: "investeeCompany",
                    sort: true,
                  },
                  {
                    title: "First Investment Date",
                    accessorKey: "firstInvestmentDate",
                    formatValue: (value: string) =>
                      `${convertDateFormatYY(value)}`,
                  },
                  {
                    title: "Exit Timeline",
                    accessorKey: "exitTimeline",
                    formatValue: (value: string) =>
                      `${convertDateFormatYY(value)}`,
                  },
                  {
                    title: "Investment Nature",
                    accessorKey: "investmentNature",
                  },
                  {
                    title: "Underwritten IRR",
                    accessorKey: "underWrittenIRR",
                    formatValue: (value: number) =>
                      `${getPercentForInvestment(value)}%`,
                  },
                  {
                    title: "Underwritten Multiple",
                    accessorKey: "underWrittenMultiple",
                    formatValue: (value: number) =>
                      `${formatDealMultiple(value)}x`,
                  },
                  {
                    title: "Current IRR",
                    accessorKey: "currentIRR",
                    formatValue: (value: number) =>
                      `${getPercentForInvestment(value)}%`,
                  },
                  {
                    title: "Current Multiple",
                    accessorKey: "currentMultiple",
                    formatValue: (value: number) =>
                      `${formatDealMultiple(value)}x`,
                  },
                  {
                    title: `Amount Committed (${numberSystem})`,
                    accessorKey: "amountCommited",
                    // type: "float",
                    formatValue: (value: number) =>
                      `${numberWithCommasAndFraction(
                        value,
                        import.meta.env.VITE_REACT_APP_INR_DECIMALS
                      )}`,
                  },
                  {
                    title: `Amount Invested (${numberSystem})`,
                    accessorKey: "amountInvested",
                    // type: "float",
                    formatValue: (value: number) =>
                      `${numberWithCommasAndFraction(
                        value,
                        import.meta.env.VITE_REACT_APP_INR_DECIMALS
                      )}`,
                  },
                  {
                    title: `Distribustion/ Repayments Received (${numberSystem})`,
                    accessorKey: "distribution",
                    // type: "float",
                    formatValue: (value: number) =>
                      `${numberWithCommasAndFraction(
                        value,
                        import.meta.env.VITE_REACT_APP_INR_DECIMALS
                      )}`,
                  },
                  {
                    title: `NAV (${numberSystem})`,
                    accessorKey: "nav",
                    // type: "float",
                    formatValue: (value: number) =>
                      `${numberWithCommasAndFraction(
                        value,
                        import.meta.env.VITE_REACT_APP_INR_DECIMALS
                      )}`,
                  },
                  {
                    title: `LTV`,
                    accessorKey: "ltv",
                    // type: "float",
                    // formatValue: (value: number) =>
                    //   `${numberWithCommasAndFraction(
                    //     value,
                    //     import.meta.env.VITE_REACT_APP_LTV_MULTIPLE_DECIMALS
                    //   )}`,
                    formatValue: (value: string | number) =>
                      `${handleMultiFormatValue(value, 2)}`,
                  },
                ]}
                isRowViewEnabled={true}
                handleView={handelView}
                data={portfolioSummaryList?.investmentWiseSummaryList ?? []}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-4">
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={portfolioChartNames.Investment_Performance}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRemarkRequest}
        />
      </div>
    </div>
  );
};

export default InvestmentPerformance;
