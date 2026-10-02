import React, { useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import { selectSalesPerformanceFilters, selectSalesfilterValues } from "../../../../../lib/services/portfolioView/selectors";
import { selectedSalesFilterValue } from "../../../../../lib/services/portfolioView/action";
import { customValueRendererMultiSelect } from "../../../../../utils/commonFunctions";

const SalesPerformanceSelectBox = () => {
  const dispatch = useDispatch();
  const selectSalesFilterValue = useSelector(selectSalesfilterValues);
  const salesPerformanceFiltersList = useSelector(
    selectSalesPerformanceFilters
  );

  // // logics
  // function subtractMonths(date: any, months: any) {
  //   date.setMonth(date.getMonth() - months);
  //   return date;
  // }

  // const startDate = subtractMonths(new Date(), 1);
  // const endDate = new Date().toISOString();

  const startDateData = useMemo(() => {
    return salesPerformanceFiltersList?.period &&
      salesPerformanceFiltersList.period.length > 0
      ? new Date(salesPerformanceFiltersList.period[0].startdate)
      : null;
  }, [salesPerformanceFiltersList]);

  const endDateData = useMemo(() => {
    return salesPerformanceFiltersList?.period &&
      salesPerformanceFiltersList.period.length > 0
      ? new Date(salesPerformanceFiltersList.period[0].enddate)
      : null;
  }, [salesPerformanceFiltersList]);

  const developerTypeData = useMemo(() => {
    return salesPerformanceFiltersList?.developers
      ? salesPerformanceFiltersList.developers?.map((item: any) => ({
          value: item.developerId,
          label: item.developerName,
        }))
      : [];
  }, [salesPerformanceFiltersList]);

  const fundData = useMemo(() => {
    return salesPerformanceFiltersList?.funds
      ? salesPerformanceFiltersList.funds?.map((item: any) => ({
          value: item.fundid,
          label: item.fundname,
        }))
      : [];
  }, [salesPerformanceFiltersList]);

  const regionData = useMemo(() => {
    return salesPerformanceFiltersList?.regions
      ? salesPerformanceFiltersList.regions?.map((item: any) => ({
          value: item.regionId,
          label: item.regionName,
        }))
      : [];
  }, [salesPerformanceFiltersList]);

  const locationData = useMemo(() => {
    return salesPerformanceFiltersList?.location
      ? salesPerformanceFiltersList.location?.map((item: any) => ({
          value: item.locationId,
          label: item.locationName,
        }))
      : [];
  }, [salesPerformanceFiltersList]);

  useEffect(() => {
    if (endDateData && startDateData)
      dispatch(
        selectedSalesFilterValue({
          ...selectSalesFilterValue,
          startDate: startDateData,
          endDate: endDateData,
        })
      );
  }, [endDateData, startDateData]);

  return (
    <div className="row m-0 d-flex flex-wrap justify-content-between">
      <div className="col-md-2 col-sm-6">
        <label className="mb-1 mt-1  select-label">Start Date</label>
        <DatePicker
          selected={
            selectSalesFilterValue.startDate
              ? new Date(selectSalesFilterValue.startDate)
              : startDateData
          }
          onChange={(e: any) =>
            dispatch(
              selectedSalesFilterValue({
                ...selectSalesFilterValue,
                startDate: e,
              })
            )
          }
          dateFormat={
            import.meta.env.VITE_REACT_APP_DATE_PICKER_FORMAT ?? "dd-MMM-yy"
          }
          minDate={startDateData}
          maxDate={
            selectSalesFilterValue.endDate
              ? new Date(selectSalesFilterValue.endDate)
              : endDateData
          }
          className="dashboard-filter-date"
          // withPortal
        />
      </div>
      <div className="col-md-2 col-sm-6">
        <label className=" mb-1 mt-1  select-label">End Date</label>
        <DatePicker
          selected={
            selectSalesFilterValue.endDate
              ? new Date(selectSalesFilterValue.endDate)
              : endDateData
          }
          onChange={(e: any) =>
            dispatch(
              selectedSalesFilterValue({
                ...selectSalesFilterValue,
                endDate: e,
              })
            )
          }
          dateFormat={
            import.meta.env.VITE_REACT_APP_DATE_PICKER_FORMAT ?? "dd-MMM-yy"
          }
          minDate={
            selectSalesFilterValue.startDate
              ? new Date(selectSalesFilterValue.startDate)
              : startDateData
          }
          maxDate={endDateData}
          className="dashboard-filter-date"
          // withPortal
        />
      </div>
      <div className="col-md-2 col-sm-6">
        <label className=" mb-1 mt-1  select-label">Developer</label>
        <MultiSelect
          options={developerTypeData}
          value={selectSalesFilterValue.developer ?? developerTypeData}
          className="p-0 w-100"
          onChange={(e: any) => {
            dispatch(
              selectedSalesFilterValue({
                ...selectSalesFilterValue,
                developer: e,
              })
            );
          }}
          labelledBy="Select"
          ClearSelectedIcon={true}
          valueRenderer={customValueRendererMultiSelect}
        />
      </div>
      <div className="col-md-2 col-sm-6">
        <label className=" mb-1 mt-1  select-label">Fund</label>
        <MultiSelect
          options={fundData}
          value={selectSalesFilterValue.fund ?? fundData}
          className="p-0 w-100"
          onChange={(e: any) => {
            dispatch(
              selectedSalesFilterValue({
                ...selectSalesFilterValue,
                fund: e,
              })
            );
          }}
          labelledBy="Select"
          ClearSelectedIcon={true}
          valueRenderer={customValueRendererMultiSelect}
        />
      </div>
      <div className="col-md-2 col-sm-6">
        <label className=" mb-1 mt-1  select-label">Project Region</label>
        <MultiSelect
          options={regionData}
          value={selectSalesFilterValue.region ?? regionData}
          className="p-0 w-100"
          onChange={(e: any) => {
            dispatch(
              selectedSalesFilterValue({
                ...selectSalesFilterValue,
                region: e,
              })
            );
          }}
          labelledBy="Select"
          ClearSelectedIcon={true}
          valueRenderer={customValueRendererMultiSelect}
        />
      </div>
      <div className="col-md-2 col-sm-6">
        <label className=" mb-1 mt-1  select-label">Project Location</label>
        <MultiSelect
          options={locationData}
          value={selectSalesFilterValue.location ?? locationData}
          className="p-0 w-100"
          onChange={(e: any) => {
            dispatch(
              selectedSalesFilterValue({
                ...selectSalesFilterValue,
                location: e,
              })
            );
          }}
          labelledBy="Select"
          ClearSelectedIcon={true}
          valueRenderer={customValueRendererMultiSelect}
        />
      </div>
    </div>
  );
};

export default SalesPerformanceSelectBox;
