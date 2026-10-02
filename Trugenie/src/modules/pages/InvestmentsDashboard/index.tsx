import { faFileMedical, faFloppyDisk, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import InvestmentTable from "./InvestmentTable";
import Select, { OptionsOrGroups } from "react-select";
import { useEffect, useMemo, useRef, useState } from "react";
import "../../../widgets/tables/Table.css";
import { styles, centerContent } from "./styles";
import { BorderedPlainTable, LargeCard, PageTitle, SmallCard } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../lib/common/appState";
import { investmentDataRequest, investmentDataSummaryAsOnRequest } from "../../../lib/services/investmentView/actions";
import { getInvestmentDetailsData, getInvestmentLoader, getInvestmentSummaryAsOnData } from "../../../lib/services/investmentView/selectors";
import { downloadSummaryDashboardDoc } from "../../../lib/api";
import { sumArrayofObjFixedTwo, openInNewTab, checkNegativeNumber, convertDateFormatYY, handleMultiFormatValue } from "../../../utils/commonFunctions";
import { getNumberSystem } from "../../../lib/services/common/selector";
import { numberWithCommasAndFraction } from "../../../widgets/charts/Recharts/utils";
import {
  LegalRepaymentScheduleSummaryListType,
  ProjectSummaryDetailsListType,
  financialMetricsListType,
  investmentTermsListType,
} from "../../../lib/services/investmentView/dataTypes";
import { investmentChartNames, investmentDashboardName, modules } from "../../../lib/services/dashboardRemarks/constants";
import SimpleTable from "../../../widgets/tables/SimpleTable";
import { IconListType, RemarksObjType } from "../../../layout/dashboardRemarks/Datatypes";
import { DashboardIcons, DashboardRemarkInput } from "../../../layout/dashboardRemarks/RemarksReportDashboard";
import { generateMultipagePDF } from "../../../utils/GeneateReport";
import SpinnerComponent from "../../Components/SpinnerComponent";
// import { selectSetProject } from "../../../lib/services/HDFC/Project/selectors";
import { selectAccessToken, selectUserDetails } from "../../../lib/services/hdfc_login/selectors";
// import { Project } from "../../../lib/services/HDFC/Project/dataTypes";
import { UserDetails } from "../../../lib/services/hdfc_login/dataTypes";
import { selectSelectedInvestment } from "../../../lib/services/HDFC/Investment/selector";
import { InvestmentListData } from "../../../lib/services/HDFC/Investment/dataTypes";

type ArrayItem = Record<string, any>;

const InvestmentsPerformance = () => {
  const dispatch = useDispatch();
  const investmentPageref = useRef(null);
  const [dropDownsValue, setDropDownsValue] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const investmentData = useSelector(getInvestmentDetailsData);
  const investmentSummaryAson = useSelector(getInvestmentSummaryAsOnData);
  const investmentLoaders = useSelector(getInvestmentLoader);
  const { dashboardRemark } = useSelector((state: AppState) => state);
  const [addRemark, setAddRemark] = useState<boolean>(false);
  const [remarks, setRemarks] = useState<RemarksObjType>({});
  const [printPDF, setPrintPDF] = useState<boolean>(false);
  const [loader, setLoader] = useState(false);
  // const project = useSelector(selectSetProject) as Project;
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const accessToken = useSelector(selectAccessToken);
  const selectedInvestment = useSelector(selectSelectedInvestment) as InvestmentListData;
  const investmentID = selectedInvestment?.InvestmentId ? selectedInvestment.InvestmentId.toString() : "";
  const investmentAsOndropdownData: OptionsOrGroups<any, any> = useMemo(() => {
    return investmentSummaryAson?.misdates
      ? investmentSummaryAson.misdates.map(item => ({
          value: item,
          // label: item,
          label: convertDateFormatYY(item),
        }))
      : [];
  }, [investmentSummaryAson]);
  // const investmentType: string<any,any> = useMemo(()=>{
  //   return investmentSummaryAson?.investmentType;
  // });
  const [legalRepaymentScheduleSummaryList, setLegalRepaymentScheduleSummaryList] = useState<LegalRepaymentScheduleSummaryListType[]>([]);
  const summmaryAsOnFirstValue = investmentSummaryAson?.misdates?.[0];
  const numberSystem = useSelector(getNumberSystem);

  useEffect(() => {
    if (userDetails.EmailId && investmentID && summmaryAsOnFirstValue && summmaryAsOnFirstValue.length > 0) {
      dispatch(investmentDataRequest(userDetails.EmailId, investmentID, summmaryAsOnFirstValue ?? ""));
    }
    dispatch(investmentDataSummaryAsOnRequest(Number(investmentID)));
  }, []);

  useEffect(() => {
    if (dropDownsValue) {
      dispatch(investmentDataRequest(userDetails.EmailId, investmentID, dropDownsValue.value));
    }
  }, [dropDownsValue, investmentID, userDetails.EmailId, summmaryAsOnFirstValue]);

  useEffect(() => {
    if (
      investmentData?.legalRepaymentSchedule?.legalRepaymentScheduleSummaryList &&
      investmentData.legalRepaymentSchedule.legalRepaymentScheduleSummaryList.length > 0
    ) {
      const data: LegalRepaymentScheduleSummaryListType[] = investmentData.legalRepaymentSchedule.legalRepaymentScheduleSummaryList.map(v => {
        return {
          ...v,
          actualInterest: checkNegativeNumber(v.actualInterest) ? 0 : v.actualInterest,
          actualPrincipal: checkNegativeNumber(v.actualPrincipal) ? 0 : v.actualPrincipal,
          actualTotal: checkNegativeNumber(v.actualTotal) ? 0 : v.actualTotal,
        };
      });
      setLegalRepaymentScheduleSummaryList(data);
    }
  }, [investmentData?.legalRepaymentSchedule?.legalRepaymentScheduleSummaryList]);

  useEffect(() => {
    if (investmentData?.remarks) setRemarks(investmentData?.remarks);
    else setRemarks({});
  }, [investmentData?.remarks]);

  const calculateTotalForAKey = (array: Array<ArrayItem>, key: keyof ArrayItem): number => {
    return array.reduce((acc, item) => {
      return acc + Number(item[key]) || acc;
    }, 0);
  };

  const calculateTotalForMultiKey = (array: Array<ArrayItem>, key: keyof ArrayItem, key1: keyof ArrayItem): number => {
    return array.reduce((acc, item) => {
      return acc + Number(item[key] + item[key1]) || acc;
    }, 0);
  };

  useEffect(() => {
    document.title = "Investment View";
  }, []);

  useEffect(() => {
    if (investmentAsOndropdownData.length > 0) {
      setDropDownsValue(investmentAsOndropdownData[0]);
    }
  }, [investmentAsOndropdownData]);

  const futureQuatarlyTotal = useMemo(() => {
    return [
      {
        title: "Total",
        underwrittenPrincipal: `${
          calculateTotalForAKey(investmentData?.legalRepaymentSchedule?.futureQuarterlyDistributionsList ?? [], "underwrittenPrincipal") ?? 0
        }`,
        underwrittenInterest: `${
          calculateTotalForAKey(investmentData?.legalRepaymentSchedule?.futureQuarterlyDistributionsList ?? [], "underwrittenInterest") ?? 0
        }`,
        underwrittenTotal: `${
          calculateTotalForMultiKey(
            investmentData?.legalRepaymentSchedule?.futureQuarterlyDistributionsList ?? [],
            "underwrittenPrincipal",
            "underwrittenInterest",
          ) ?? 0
        }`,
        actualPrincipal: `${calculateTotalForAKey(investmentData?.legalRepaymentSchedule?.futureQuarterlyDistributionsList ?? [], "actualPrincipal") ?? 0}`,
        actualInterest: `${calculateTotalForAKey(investmentData?.legalRepaymentSchedule?.futureQuarterlyDistributionsList ?? [], "actualInterest") ?? 0}`,
        actualTotal: `${
          calculateTotalForMultiKey(investmentData?.legalRepaymentSchedule?.futureQuarterlyDistributionsList ?? [], "actualPrincipal", "actualInterest") ?? 0
        }`,
      },
    ];
  }, [investmentData?.legalRepaymentSchedule?.futureQuarterlyDistributionsList]);

  const futureAndLegalTotalList = useMemo(() => {
    const list = investmentData?.legalRepaymentSchedule?.legalRepaymentScheduleSummaryList.filter(v => v.fieldName !== "Due Till Date") ?? [];
    return [...list, ...futureQuatarlyTotal];
  }, [futureQuatarlyTotal, investmentData?.legalRepaymentSchedule?.legalRepaymentScheduleSummaryList]);

  const handelView = (row: ProjectSummaryDetailsListType) => {
    localStorage.setItem("reassetid", row.reassetId.toString());
    const url = `${investmentData?.url}/#/ReSummaryDashboard`;
    openInNewTab(url);
  };

  const saveRemarkRequest = useMemo(() => {
    return {
      moduleId: Number(investmentID) ?? "",
      module: modules.Investment,
      misDate: dropDownsValue?.value ?? "",
      dashboardName: investmentDashboardName.Investment,
      chartName: "",
      remark: "",
      addedBy: "",
      createdBy: userDetails.EmailId,
      filters: [],
    };
  }, [investmentID, dropDownsValue?.value]);

  useEffect(() => {
    if (printPDF) {
      setTimeout(() => generateMultipagePDF([investmentPageref], setPrintPDF), 10000);
      // generatePDF(images, setPrintPDF);
    }
  }, [printPDF]);

  const iconsList: IconListType[] = useMemo(() => {
    return [
      {
        title: addRemark ? "Save Remark" : "Add Remark",
        icon: addRemark ? faFloppyDisk : faFolderPlus,
        onClick: () => setAddRemark(!addRemark),
        remark: true,
      },
      {
        title: "Generate Report",
        icon: faFileMedical,
        onClick: () => setPrintPDF(true),
      },
      // {
      //   title: "View Report",
      //   icon: faFileLines,
      //   viewReport: true,
      // },
    ];
  }, [addRemark, setAddRemark]);

  const HeadingAndIcons = () => {
    return (
      <div className='padding-none'>
        <div className='main-color p-2 d-flex justify-content-between dashboard-heading heading-bg-color'>
          <span className='dashboard-heading-text'>INVESTMENT PERFORMANCE - Investment View</span>
          <DashboardIcons iconsList={iconsList} />
        </div>
      </div>
    );
  };

  const investmentTableData = useMemo(() => {
    return {
      id: "investment-table",
      columns: [
        {
          name: "particular",
          key: "particular",
        },
        {
          name: "fields",
          key: "fields",
          formatValue: (value: number, row: investmentTermsListType) => {
            return `${handleMultiFormatValue(value, row.format)}`;
          },
        },
      ],
      data: investmentData?.equityInvestmentSummary?.investmentTermsList ?? [],
    };
  }, [investmentData?.equityInvestmentSummary?.investmentTermsList]);

  return (
    <div
      // style={styles.backgroundColor}
      className='main-body'
      ref={investmentPageref}>
      {(dashboardRemark.loading.getDashboardRemark || dashboardRemark.loading.insertDashboardRemark || loader) && <SpinnerComponent />}
      <HeadingAndIcons />
      {/* Summary as on dropdown Row */}
      <div className={`${centerContent} `}>
        <div className='col-md-2 col-sm-6 d-flex flex-wrap justify-content'>
          <label className='select-lable'>Summary as on</label>
          <Select
            options={investmentAsOndropdownData}
            className='p-0 w-100'
            value={dropDownsValue}
            placeholder={investmentAsOndropdownData.length > 0 ? investmentAsOndropdownData[0].label : ""}
            isLoading={investmentLoaders.fetchInvestmentDataSummaryAsOn}
            isClearable={true}
            onChange={(e: any) => {
              setDropDownsValue(e);
            }}
          />

          <br></br>
          <br></br>
        </div>
        {/* <span className="font-bold my-1 text-danger me-3">
          *Amount in INR (Millions)
        </span> */}
      </div>
      <br></br>
      {/*Small  Cards */}
      <SmallCardsRow />

      {/* Equity Investment Summary Card */}
      <div className='d-flex justify-content-between align-items-center'>
        <div className='sales-graph-heading mb-0'>Investment Summary</div>
        <div className='d-flex gap-2 align-items-center'>
          <div className='rounded-pill' style={styles.latestIndicator} />
          <p className='me-2' style={{ marginTop: "20px" }}>
            <strong>Latest Figures</strong>
          </p>
        </div>
      </div>
      <LargeCard title=''>
        <div className='d-flex'>
          <LargeCard containerStyles={{ flex: 1 }}>
            <InvestmentTable
              containerStyles={{
                minHeight: "250px",
              }}
              columns={[
                {
                  title: `Finanacial Metrics`,
                  accessorKey: "financialMetricsName",
                },
                {
                  title: `Current`,
                  accessorKey: "current",
                  formatValue: (value: number, row: financialMetricsListType) => `${handleMultiFormatValue(value, row.format)}`,
                },
                {
                  title: `Underwritten`,
                  accessorKey: "underwritten",
                  formatValue: (value: number, row: financialMetricsListType) => `${handleMultiFormatValue(value, row.format)}`,
                },
              ]}
              isRowViewEnabled={true}
              handleView={() => {
                console.info("handleView");
              }}
              data={investmentData?.equityInvestmentSummary?.financialMetricsList ?? []}
              loader={investmentLoaders.fetchInvestmentData}
              mergeGrossNetValue
            />
          </LargeCard>

          {/* Investment Terms Card */}
          <LargeCard title='' containerStyles={{ flex: 1 }}>
            <div className='sales-graph-heading'>Investment Terms</div>
            <SimpleTable
              tableData={investmentTableData}
              headerColorClass='active-red'
              tableClasses='rounded-corners text-center my-2'
              minHeight='350px'
              // height="250px"
              hideHeader
              addExtraData={[
                {
                  index: 1,
                  valKey: "latestFigure",
                  format: (latestFigure: string) =>
                    `${
                      latestFigure ? ` Latest Figures ${numberWithCommasAndFraction(Number(latestFigure), import.meta.env.VITE_REACT_APP_INR_DECIMALS)}` : ""
                    }`,
                },
              ]}
            />
            {/* <BorderedPlainTable
              formatValueArr={[
                (value: string) => value,
                (value: number) =>
                  numberWithCommasAndFraction(
                    value,
                    import.meta.env.VITE_REACT_APP_INR_DECIMALS
                  ),
              ]}
              loader={investmentLoaders.fetchInvestmentData}
              hideIndex={[2]}
              data={
                investmentData?.equityInvestmentSummary?.investmentTermsList?.map(
                  (item, index) => {
                    if (index === 0) {
                      return {
                        title: `${item.particular} (${numberSystem})`,
                        value: item.fields,
                        format: item.format,
                      };
                    } else {
                      return {
                        title: `${item.particular} (${numberSystem})`,
                        value: {
                          val: item.fields,
                          subValue: item.latestFigure,
                        },
                        format: item.format,
                      };
                    }
                  }
                ) ?? []
              }
            /> */}
            {/* <BorderedPlainTable
              loader={investmentLoaders.fetchInvestmentData}
              data={
                investmentData?.equityInvestmentSummary?.investmentTermsSecondList?.map(
                  (item, index) => {
                    if (index === 1) {
                      return {
                        title: item.particular,
                        value: {
                          val: convertDateFormatYY(item.field),
                          // val: item.field,
                          // val:moment(item.field).format('DD-MMM-YY'),
                          subValue: item.latestFigure,
                        },
                      };
                    } else {
                      return {
                        title: item.particular,
                        value: {
                          val: item.field,
                          subValue: item.latestFigure,
                        },
                      };
                    }
                  }
                ) ?? []
              }
            /> */}
          </LargeCard>
        </div>

        {/* Project Summary Detail table */}
        <InvestmentTable
          loader={investmentLoaders.fetchInvestmentData}
          containerStyles={{ marginTop: "24px" }}
          columns={(
            [
              { title: "Action", accessorKey: "actions" },
              { title: "Project", accessorKey: "project" },
              { title: "Location", accessorKey: "location" },
              {
                title: "Land Area(acres)",
                accessorKey: "landArea",
                formatValue: (value: number) =>
                  Number(value) ? `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_LAND_AREA_DECIMALS)}` : value,
              },
              { title: "Launch Status", accessorKey: "launchStatus" },
              {
                title: `Total Saleable Area (${import.meta.env.VITE_REACT_APP_AREA_UNIT})`,
                accessorKey: "totalSaleableArea",
                // type: "round",
                formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_AREA_DECIMAL)}`,
              },
              {
                title: `Total Area Sold (${import.meta.env.VITE_REACT_APP_AREA_UNIT})`,
                accessorKey: "totalAreaSold",
                // type: "round",
                formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_AREA_DECIMAL)}`,
              },
              {
                title: "% Sold (on Launched Area)",
                accessorKey: "soldPercentage",
                // type: "float",
                formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS)}%`,
              },
              {
                title: "% Project Completion",
                accessorKey: "completionPercentage",
                // type: "float",
                formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS)}%`,
              },
              {
                title: `Cash Balance (${numberSystem})`,
                accessorKey: "cashBalance",
                // type: "float",
                formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
              },
              {
                title: `Sold receivables (${numberSystem})`,
                accessorKey: "soldReceivables",
                // type: "float",
                formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
              },
              {
                title: `Unsold receivables (${numberSystem})`,
                accessorKey: "unSoldReceivables",
                // type: "float",
                formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
              },
              {
                title: `Expenses (${numberSystem})`,
                accessorKey: "expenses",
                // type: "float",
                formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
              },
              {
                title: `FCF (${numberSystem})`,
                accessorKey: "fcf",
                // type: "float",
                formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
              },
              {
                title: `NPV (${numberSystem})`,
                accessorKey: "npv",
                // type: "float",
                formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
              },
            ] as any
          ).filter((obj: any) => investmentSummaryAson?.investmentType === "Debt" || obj.accessorKey !== "npv")}
          isRowViewEnabled={true}
          handleView={handelView}
          data={investmentData?.equityInvestmentSummary?.projectSummaryDetailsList ?? []}
          finalRow={[
            {
              actions: "Total",
              project: "",
              location: "",
              landArea: `${
                numberWithCommasAndFraction(
                  calculateTotalForAKey(investmentData?.equityInvestmentSummary?.projectSummaryDetailsList ?? [], "landArea"),
                  import.meta.env.VITE_REACT_APP_LAND_AREA_DECIMALS,
                ) ?? 0
              }`,
              launchStatus: "",
              totalSaleableArea: "",
              totalAreaSold: `${
                numberWithCommasAndFraction(
                  calculateTotalForAKey(investmentData?.equityInvestmentSummary?.projectSummaryDetailsList ?? [], "totalAreaSold"),
                  import.meta.env.VITE_REACT_APP_AREA_DECIMAL,
                ) ?? 0
              }`,

              soldPercentage: "",
              completionPercentage: "",
              cashBalance: `${
                numberWithCommasAndFraction(
                  calculateTotalForAKey(investmentData?.equityInvestmentSummary?.projectSummaryDetailsList ?? [], "cashBalance"),
                  import.meta.env.VITE_REACT_APP_INR_DECIMALS,
                ) ?? 0
              }`,
              soldReceivables: `${
                numberWithCommasAndFraction(
                  calculateTotalForAKey(investmentData?.equityInvestmentSummary?.projectSummaryDetailsList ?? [], "soldReceivables"),
                  import.meta.env.VITE_REACT_APP_INR_DECIMALS,
                ) ?? 0
              }`,
              unSoldReceivables: `${
                numberWithCommasAndFraction(
                  calculateTotalForAKey(investmentData?.equityInvestmentSummary?.projectSummaryDetailsList ?? [], "unSoldReceivables"),
                  import.meta.env.VITE_REACT_APP_INR_DECIMALS,
                ) ?? 0
              }`,
              expenses: `${
                numberWithCommasAndFraction(
                  calculateTotalForAKey(investmentData?.equityInvestmentSummary?.projectSummaryDetailsList ?? [], "expenses"),
                  import.meta.env.VITE_REACT_APP_INR_DECIMALS,
                ) ?? 0
              }`,
              fcf: `${
                numberWithCommasAndFraction(
                  calculateTotalForAKey(investmentData?.equityInvestmentSummary?.projectSummaryDetailsList ?? [], "fcf"),
                  import.meta.env.VITE_REACT_APP_INR_DECIMALS,
                ) ?? 0
              }`,
              npv: `${
                numberWithCommasAndFraction(
                  calculateTotalForAKey(investmentData?.equityInvestmentSummary?.projectSummaryDetailsList ?? [], "npv"),
                  import.meta.env.VITE_REACT_APP_INR_DECIMALS,
                ) ?? 0
              }`,
            },
          ].map(row => ({
            ...row,
            landArea: row.landArea === "0" ? "-" : row.landArea,
            totalAreaSold: row.totalAreaSold === "0" ? "-" : row.totalAreaSold,
            cashBalance: row.cashBalance === "0" ? "-" : row.cashBalance,
            soldReceivables: row.soldReceivables === "0" ? "-" : row.soldReceivables,
            unSoldReceivables: row.unSoldReceivables === "0" ? "-" : row.unSoldReceivables,
            expenses: row.expenses === "0" ? "-" : row.expenses,
            fcf: row.fcf === "0" ? "-" : row.fcf,
            npv: investmentSummaryAson?.investmentType === "Equity" ? "" : row.npv === "0" ? "-" : row.npv,
          }))}
        />
        <div className='w-50'>
          <InvestmentTable
            loader={investmentLoaders.fetchInvestmentData}
            columns={[
              { title: "Particulars", accessorKey: "particularName" },
              {
                title: `Amount (${numberSystem})`,
                accessorKey: "particularValue",
                // type: "float",
                formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
              },
            ]}
            data={investmentData?.equityInvestmentSummary?.distributionSummaryList ?? []}
          />
        </div>
      </LargeCard>

      <div className='d-flex' style={{ gap: "10px", marginTop: "24px", overflowY: "scroll" }}>
        {/* Disbursement Table in card */}
        <LargeCard title='' containerStyles={{ flex: 1, minHeight: "100%" }}>
          <div className='sales-graph-heading'>Disbursement</div>
          <InvestmentTable
            loader={investmentLoaders.fetchInvestmentData}
            // containerStyles={{
            //   height: "calc(100% - 30px)",
            // }}
            columns={[
              {
                title: `Date`,
                accessorKey: "disbursementDate",
                dateFormat: true,
              },
              {
                title: `Amount Disbursement (${numberSystem})`,
                accessorKey: "disbursementAmount",
                // type: "float",
                formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
              },
              {
                title: `Amount Utilised (${numberSystem})`,
                accessorKey: "amountUtilised",
                // type: "float",
                formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
              },
              { title: `Usage`, accessorKey: "usage" },
              {
                title: `Date of utilisation`,
                accessorKey: "utilizationDate",
                dateFormat: true,
              },
              { title: `Attatchments`, accessorKey: "actions" },
            ]}
            hasAttatchment={true}
            handleAttatchment={(v: any) => {
              if (v.fileContainer && v.filePath && v.fileName && accessToken) {
                downloadSummaryDashboardDoc(v.fileContainer, v.filePath, v.fileName, true, accessToken, undefined, setLoader);
              }
            }}
            data={investmentData?.disbursement ?? []}
            height='500px'
          />
        </LargeCard>

        {/* Legal repayment schedule of undisbursed amount Card */}
        <LargeCard title='' containerStyles={{ flex: 1, minHeight: "100%" }}>
          <div className='sales-graph-heading'>
            {/* Legal repayment schedule of Disbursed amount */}
            Distributions
          </div>
          {/* <InvestmentTable
            loader={investmentLoaders.fetchInvestmentData}
            preHeaderTitles={[
              { title: `Till Date Distributions`, colspan: 1},
              { title: `Underwritten Distributions`, colspan: 3 },
              { title: `Actual Distributions`, colspan: 3 },
            ]}
            columns={[
              { title: `Particulars`, accessorKey: "fieldName" },
              {
                title: `Principal              `,
                accessorKey: "underwrittenPrincipal",
                // type: "float",
                formatValue: (value: number) =>
                  `${numberWithCommasAndFraction(
                    value,
                    import.meta.env.VITE_REACT_APP_INR_DECIMALS
                  )}`,
              },

              {
                title: `Interest`,
                accessorKey: "underwrittenInterest",
                // type: "float",
                formatValue: (value: number) =>
                  `${numberWithCommasAndFraction(
                    value,
                    import.meta.env.VITE_REACT_APP_INR_DECIMALS
                  )}`,
              },
              {
                title: `Total`,
                accessorKey: "underwrittenTotal",
                // type: "float",
                formatValue: (value: number) =>
                  `${numberWithCommasAndFraction(
                    value,
                    import.meta.env.VITE_REACT_APP_INR_DECIMALS
                  )}`,
              },
              {
                title: `Principal`,
                accessorKey: "actualPrincipal",
                // type: "float",
                formatValue: (value: number) =>
                  `${numberWithCommasAndFraction(
                    value,
                    import.meta.env.VITE_REACT_APP_INR_DECIMALS
                  )}`,
              },
              {
                title: `Interest`,
                accessorKey: "actualInterest",
                // type: "float",
                formatValue: (value: number) =>
                  `${numberWithCommasAndFraction(
                    value,
                    import.meta.env.VITE_REACT_APP_INR_DECIMALS
                  )}`,
              },
              {
                title: `Total`,
                accessorKey: "actualTotal",
                // type: "float",
                formatValue: (value: number) =>
                  `${numberWithCommasAndFraction(
                    value,
                    import.meta.env.VITE_REACT_APP_INR_DECIMALS
                  )}`,
              },
            ]}
            isRowViewEnabled={true}
            handleView={() => {}}
            data={legalRepaymentScheduleSummaryList}
          />
           */}
          <PageTitle title='' variant='h5' />
          {/* <div className="sales-graph-heading">Expected distributions</div> */}
          <BorderedPlainTable
            formatValueArr={[
              (value: string) => value,
              (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
              (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
              (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
              (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
              (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
              (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
            ]}
            preHeaderTitles={[
              { title: `Till Date Distributions`, colspan: 1 },
              { title: `Underwritten Distributions`, colspan: 3 },
              { title: `Actual Distributions`, colspan: 3 },
            ]}
            header={[
              `Particulars`,
              `Principal (${numberSystem})`,
              `Interest (${numberSystem})`,
              `Total (${numberSystem})`,
              `Principal (${numberSystem})`,
              `Interest (${numberSystem})`,
              `Total (${numberSystem})`,
            ]}
            data={legalRepaymentScheduleSummaryList.map(item => {
              return {
                title: item.fieldName,
                value: item.underwrittenPrincipal,
                subValue: item.underwrittenInterest,
                total: item.underwrittenPrincipal + item.underwrittenInterest,
                value2: item.actualPrincipal,
                subValue2: item.actualInterest,
                total1: item.actualPrincipal + item.actualInterest,
              };
            })}
            loader={investmentLoaders.fetchInvestmentData}
          />
          <BorderedPlainTable
            formatValueArr={[
              (value: string) => value,
              (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
              (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
              (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
              (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
              (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
              (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
            ]}
            preHeaderTitles={[
              { title: `Future Distributions`, colspan: 1 },
              { title: `Underwritten Distributions`, colspan: 3 },
              { title: `Actual Distributions`, colspan: 3 },
            ]}
            header={[
              `Date`,
              `Principal (${numberSystem})`,
              `Interest (${numberSystem})`,
              `Total (${numberSystem})`,
              `Principal (${numberSystem})`,
              `Interest (${numberSystem})`,
              `Total (${numberSystem})`,
            ]}
            data={
              investmentData?.legalRepaymentSchedule?.futureQuarterlyDistributionsList
                ? investmentData?.legalRepaymentSchedule?.futureQuarterlyDistributionsList.map(item => {
                    return {
                      title: convertDateFormatYY(item.misDate),
                      value: item.underwrittenPrincipal,
                      subValue: item.underwrittenInterest,
                      total: item.underwrittenPrincipal + item.underwrittenInterest,
                      value2: item.actualPrincipal,
                      subValue2: item.actualInterest,
                      total1: item.actualPrincipal + item.actualInterest,
                    };
                  })
                : []
            }
            finalRow={futureQuatarlyTotal}
            additionalFinalRow={[
              {
                title: "Final Total",
                single1: `${sumArrayofObjFixedTwo(futureAndLegalTotalList, "underwrittenPrincipal") ?? 0}`,
                single2: `${sumArrayofObjFixedTwo(futureAndLegalTotalList, "underwrittenInterest") ?? 0}`,
                total1: `${sumArrayofObjFixedTwo(futureAndLegalTotalList, "underwrittenTotal") ?? 0}`,
                single3: `${sumArrayofObjFixedTwo(futureAndLegalTotalList, "actualPrincipal") ?? 0}`,
                single4: `${sumArrayofObjFixedTwo(futureAndLegalTotalList, "actualInterest") ?? 0}`,
                total2: `${sumArrayofObjFixedTwo(futureAndLegalTotalList, "actualTotal") ?? 0}`,
              },
            ]}
            loader={investmentLoaders.fetchInvestmentData}
          />
          {/* <BorderedPlainTable
            data={
              // investmentData?.legalRepaymentSchedule
              //   ?.futureQuarterlyDistributionsList
              //   ? investmentData?.legalRepaymentSchedule?.futureQuarterlyDistributionsList.map(
              //     (item) => {
              //       return {
              //         title: item.misDate,
              //         value: item.underwrittenPrincipal,
              //         subValue: item.underwrittenInterest,
              //         total:item.underwrittenPrincipal + item.underwrittenInterest,
              //         value2: item.actualPrincipal,
              //         subValue2: item.actualInterest,
              //         total1:item.actualPrincipal + item.actualInterest
              //       };
              //     }
              //   )
              //   :
              null
            }

            finalRow={[
              {
                title: "Final Total",
                single1: `${sumArrayofObjFixedTwo(
                  futureAndLegalTotalList,
                  "underwrittenPrincipal"
                ) ?? 0
                  }`,
                single2: `${sumArrayofObjFixedTwo(
                  futureAndLegalTotalList,
                  "underwrittenInterest"
                ) ?? 0
                  }`,
                total1: `${sumArrayofObjFixedTwo(futureAndLegalTotalList, "underwrittenTotal") ??
                  0
                  }`,
                single3: `${sumArrayofObjFixedTwo(futureAndLegalTotalList, "actualPrincipal") ?? 0
                  }`,
                single4: `${sumArrayofObjFixedTwo(futureAndLegalTotalList, "actualInterest") ?? 0
                  }`,
                total2: `${sumArrayofObjFixedTwo(futureAndLegalTotalList, "actualTotal") ?? 0
                  }`,
              },
            ]}
            loader={investmentLoaders.fetchInvestmentData}
          /> */}
        </LargeCard>
      </div>
      <div className='mt-4 mb-4'>
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={investmentChartNames.Investment_Performance}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRemarkRequest}
        />
      </div>
    </div>
  );
};

const SmallCardsRow = () => {
  const investmentData = useSelector(getInvestmentDetailsData);

  return (
    <div className={`d-flex justify-content-start gap-5 align-items-center`} style={{ height: "100px", width: "100%" }}>
      {investmentData && investmentData.investmentSummaryList
        ? investmentData &&
          investmentData.investmentSummaryList.map((cardData, index) => {
            return <SmallCard key={index} title={cardData.titleName} value={cardData.titleValue} />;
          })
        : null}
    </div>
  );
};

export default InvestmentsPerformance;
