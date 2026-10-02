import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { getUnitNumberSystem } from "../../../../lib/services/common/selector";
import { numberWithCommasAndFraction } from "../../../../widgets/charts/Recharts/utils";
import { convertDateFormatYY } from "../../../../utils/commonFunctions";
import { projectSummarySectionsType } from "../../../../lib/services/projectSummary/datatype";
import TableWithRedHeader from "../../../../widgets/tables/TableWithRedHeader";

const ProjectSummary: React.FC<{
  isUnderwrittenActive: boolean;
  handleButtonClick: (isUnderwritten: boolean) => void;
}> = ({ isUnderwrittenActive, handleButtonClick }) => {
  const { projectSummaryReducer } = useSelector((state: any) => state);
  const { dashboardDetails } = projectSummaryReducer;
  const unitNumberSystem = useSelector(getUnitNumberSystem);

  const projectSummaryRows = useMemo(() => {
    return [
      {
        name: "Product",
        key: "phase",
      },
      {
        name: "Phases",
        key: "product",
      },
      {
        name: "Units (Nos.)",
        key: "units",
        formatValue: (value: number) => `${numberWithCommasAndFraction(Number(value), import.meta.env.VITE_REACT_APP_UNIT_DECIMAL)}`,
      },
      {
        name: `Avg.Ticket Size (${unitNumberSystem})`,
        key: "avgTicketSite",
        formatValue: (value: number) => `${numberWithCommasAndFraction(Number(value), import.meta.env.VITE_REACT_APP_AVG_TICKET_SIZE_DECIMALS)}`,
      },
      {
        name: "Approvals in Place",
        key: "approvalsInPlace",
      },
      {
        name: "Launch",
        key: "launch",
        formatValue: (value: string) => `${convertDateFormatYY(value)}`,
        formatClass: (row: projectSummarySectionsType) =>
          (isUnderwrittenActive && new Date(row.launch) > new Date(row.underwrittenLaunchDate)) ||
          (!isUnderwrittenActive && new Date(row.launch) > new Date(row.businessPlanLaunchDate))
            ? "text-danger"
            : "", // If Actual launch > underwritten launch - Highlight actual launch in red
      },
      {
        name: "Construction Start",
        key: "constructionStart",
        formatValue: (value: string) => `${convertDateFormatYY(value)}`,
      },
      {
        name: "Completion - RERA",
        key: "reraCompletion",
        formatValue: (value: string) => `${convertDateFormatYY(value)}`,
      },
      {
        name: "Completion - BBA",
        key: "customerAgreement",
        formatValue: (value: string) => `${convertDateFormatYY(value)}`,
      },
      {
        name: "Completion - Expected",
        key: "expectedCompletion",
        formatValue: (value: string) => `${convertDateFormatYY(value)}`,
        formatClass: (row: projectSummarySectionsType) =>
          (isUnderwrittenActive && new Date(row.expectedCompletion) > new Date(row.underwrittenCompletionDate)) ||
          (!isUnderwrittenActive && new Date(row.expectedCompletion) > new Date(row.underwrittenCompletionDate)) ||
          new Date(row.expectedCompletion) > new Date(row.reraCompletion) ||
          new Date(row.expectedCompletion) > new Date(row.customerAgreement)
            ? "text-danger"
            : "", // if expected completion > underwritten completion OR RERA Completion OR Customer Agreement Completion - highlight expected completion in red
      },
      {
        name: "Launch",
        key: isUnderwrittenActive ? "underwrittenLaunchDate" : "businessPlanLaunchDate",
        formatValue: (value: string) => `${convertDateFormatYY(value)}`,
      },
      {
        name: "Completion",
        key: isUnderwrittenActive ? "underwrittenCompletionDate" : "businessPlanCompletionDate",
        formatValue: (value: string) => `${convertDateFormatYY(value)}`,
      },
    ];
  }, [isUnderwrittenActive]);

  const upperHeader = () => {
    return (
      <tr>
        <td colSpan={5}></td>
        <td colSpan={5} className='background-black-table text-center'>
          Actual/Anticipated
        </td>
        <td colSpan={2} className='background-black-table text-center'>
          {isUnderwrittenActive ? "Underwritten" : "Business Plan"}
        </td>
      </tr>
    );
  };

  return (
    <div className='row'>
      <div className='sales-graph-heading'>Project Summary</div>
      <div className='col-md-12 col-sm-12'>
        <div className='sales-graph-border'>
          <div className='p-1'>
            <TableWithRedHeader
              data={dashboardDetails?.data?.projectSummarySections || []}
              cols={projectSummaryRows}
              handleButtonClick={handleButtonClick}
              showTotalRow={false}
              upperHeader={upperHeader}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;
