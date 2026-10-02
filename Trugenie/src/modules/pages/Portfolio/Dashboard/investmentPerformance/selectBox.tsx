import React, { useEffect, useMemo } from "react";
import Select, { StylesConfig } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import { selectInvestementPerformanceFiltersList, selectfilterValues } from "../../../../../lib/services/portfolioView/selectors";
import { convertDateFormatYY, customValueRendererMultiSelect } from "../../../../../utils/commonFunctions";
import { selectedFilterValue } from "../../../../../lib/services/portfolioView/action";

const InvestmentPerformanceSelectBox: React.FC<{
  type: "fund" | "investment";
}> = ({ type }) => {
  const dispatch = useDispatch();

  const selectFilterValue = useSelector(selectfilterValues);
  const investementPerformanceFilters = useSelector(
    selectInvestementPerformanceFiltersList
  );

  const summaryAsOnData = useMemo(() => {
    return investementPerformanceFilters
      ? investementPerformanceFilters?.misdates?.map((item: any) => ({
          value: item,
          label: convertDateFormatYY(item),
        }))
      : [];
  }, [investementPerformanceFilters]);

  const regionsData = useMemo(() => {
    return investementPerformanceFilters
      ? investementPerformanceFilters?.regions?.map((item: any) => ({
          value: item.regionName,
          label: item.regionName,
        }))
      : [];
  }, [investementPerformanceFilters]);

  const fundData = useMemo(() => {
    return investementPerformanceFilters
      ? investementPerformanceFilters?.funds?.map((item: any) => ({
          value: item.fundid,
          label: item.fundname,
        }))
      : [];
  }, [investementPerformanceFilters]);

  const developersData = useMemo(() => {
    return investementPerformanceFilters
      ? investementPerformanceFilters?.developers?.map((item: any) => ({
          value: item.developerId,
          label: item.developerName,
        }))
      : [];
  }, [investementPerformanceFilters]);

  const exitTimelineData = useMemo(() => {
    return investementPerformanceFilters
      ? investementPerformanceFilters?.exitTimeline?.map((item: any) => ({
          value: item.value,
          label: item.fieldName,
        }))
      : [];
  }, [investementPerformanceFilters]);

  useEffect(() => {
    if (summaryAsOnData.length > 0) {
      dispatch(
        selectedFilterValue({
          ...selectFilterValue,
          sumaryAsOn: summaryAsOnData[0],
        })
      );
    }
  }, [summaryAsOnData]);

  const customStyles: StylesConfig = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <div className="row m-0 d-flex justify-content-between flex-wrap">
      {type === "fund" && (
        <div className="col-md-2 col-sm-6">
          <label className="mb-1 mt-1 select-label">Summary As On</label>
          <Select
            options={summaryAsOnData}
            className="p-0 w-100"
            value={selectFilterValue.sumaryAsOn}
            onChange={(e: any) =>
              dispatch(
                selectedFilterValue({
                  ...selectFilterValue,
                  sumaryAsOn: e,
                })
              )
            }
            isClearable
          />
        </div>
      )}

      {type === "investment" && (
        <div className="col-md-2 col-sm-6">
          <label className=" mb-1 mt-1 select-label">Developer</label>
          <MultiSelect
            options={developersData}
            value={selectFilterValue.developers ?? developersData}
            className="p-0 w-100"
            onChange={(e: any) => {
              dispatch(
                selectedFilterValue({
                  ...selectFilterValue,
                  developers: e,
                })
              );
            }}
            labelledBy="Select"
            ClearSelectedIcon={true}
            valueRenderer={customValueRendererMultiSelect}
          />
        </div>
      )}

      {type === "investment" && (
        <div className="col-md-2 col-sm-6">
          <label className=" mb-1 mt-1 select-label">Developer Location</label>
          <MultiSelect
            options={regionsData}
            value={selectFilterValue.regions ?? regionsData}
            className="p-0 w-100"
            onChange={(e: any) => {
              dispatch(
                selectedFilterValue({
                  ...selectFilterValue,
                  regions: e,
                })
              );
            }}
            labelledBy="Select"
            ClearSelectedIcon={true}
            valueRenderer={customValueRendererMultiSelect}
          />
        </div>
      )}

      {type === "investment" && (
        <div className="col-md-2 col-sm-6">
          <label className=" mb-1 mt-1 select-label">Fund</label>
          <MultiSelect
            options={fundData}
            value={selectFilterValue.funds ?? fundData}
            className="p-0 w-100"
            onChange={(e: any) => {
              dispatch(
                selectedFilterValue({
                  ...selectFilterValue,
                  funds: e,
                })
              );
            }}
            labelledBy="Select"
            ClearSelectedIcon={true}
            valueRenderer={customValueRendererMultiSelect}
          />
        </div>
      )}

      {type === "investment" && (
        <div className="col-md-2 col-sm-6">
          <label className=" mb-1 mt-1 select-label">Exit Timeline</label>
          {/* <MultiSelect
            options={exitTimelineData}
            value={selectFilterValue.exitTimeline ?? exitTimelineData}
            className="p-0 w-100"
            onChange={(e: any) => {
              dispatch(
                selectedFilterValue({
                  ...selectFilterValue,
                  exitTimeline: e,
                })
              );
            }}
            labelledBy="Select"
            ClearSelectedIcon={true}
            valueRenderer={customValueRendererMultiSelect}
          /> */}
          <Select
            options={exitTimelineData}
            className="p-0 w-100"
            value={selectFilterValue.exitTimeline}
            onChange={(e: any) =>
              dispatch(
                selectedFilterValue({
                  ...selectFilterValue,
                  exitTimeline: e,
                })
              )
            }
            isClearable
          />
        </div>
      )}
    </div>
  );
};

export default InvestmentPerformanceSelectBox;
