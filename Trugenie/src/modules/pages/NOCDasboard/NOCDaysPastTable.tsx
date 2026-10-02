import React from "react";
import { sumArrayofObj } from "../../../utils/commonFunctions";
import { numberWithCommasAndFraction } from "../../../widgets/charts/Recharts/utils";
import { daysPastNocDpnDetailsListType } from "../../../lib/services/nocDashboard/datatypes";

interface NOCDaysPastTableProps {
  daysPastNocDpnDetailsList: daysPastNocDpnDetailsListType[];
}

const NOCDaysPastTable: React.FC<NOCDaysPastTableProps> = ({
  daysPastNocDpnDetailsList,
}) => {
  const nocDPNTableRows = [
    "DPN Sr. No.",
    "Unit No",
    "Sqft",
    "Exact Days",
    "Homebuyer",
    "Financer",
    "Sales Value",
    "Amount Received",
    "Receivable",
  ];

  return (
    <>
      <table className="table" style={{ width: "98%", margin: "1rem auto" }}>
        <thead className="table-secondary main-color">
          <tr>
            {nocDPNTableRows.map((v: any) => (
              <th className="text-center">{v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysPastNocDpnDetailsList.map(
            (v: daysPastNocDpnDetailsListType, i: number) => (
              <tr>
                <td className="text-center">{i + 1}</td>
                <td>{v.unitNo}</td>
                <td className="text-center">
                  {numberWithCommasAndFraction(
                    v.sqft,
                    import.meta.env.VITE_REACT_APP_AREA_DECIMAL
                  )}
                </td>
                <td>{v.daysDiff}</td>
                <td>{v.homebuyer}</td>
                <td>{v.financer}</td>
                <td className="text-center">
                  {numberWithCommasAndFraction(
                    v.salesvalue,
                    import.meta.env.VITE_REACT_APP_INR_DECIMALS
                  )}
                </td>
                <td className="text-center">
                  {numberWithCommasAndFraction(
                    v.amountRecevied,
                    import.meta.env.VITE_REACT_APP_INR_DECIMALS
                  )}
                </td>
                <td className="text-center">
                  {numberWithCommasAndFraction(
                    v.receivable,
                    import.meta.env.VITE_REACT_APP_INR_DECIMALS
                  )}
                </td>
              </tr>
            )
          )}
          <tr className="main-color font-bold">
            <td className="text-center">Total</td>
            <td></td>
            <td className="text-center">
              {sumArrayofObj(daysPastNocDpnDetailsList, "sqft", (val: number) =>
                Number(val)
                  ? numberWithCommasAndFraction(
                      val,
                      import.meta.env.VITE_REACT_APP_AREA_DECIMAL
                    )
                  : "-"
              )}
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td className="text-center">
              {sumArrayofObj(
                daysPastNocDpnDetailsList,
                "salesvalue",
                (val: number) =>
                  Number(val)
                    ? numberWithCommasAndFraction(
                        val,
                        import.meta.env.VITE_REACT_APP_INR_DECIMALS
                      )
                    : "-"
              )}
            </td>
            <td className="text-center">
              {sumArrayofObj(
                daysPastNocDpnDetailsList,
                "amountRecevied",
                (val: number) =>
                  Number(val)
                    ? numberWithCommasAndFraction(
                        val,
                        import.meta.env.VITE_REACT_APP_INR_DECIMALS
                      )
                    : "-"
              )}
            </td>
            <td className="text-center">
              {sumArrayofObj(
                daysPastNocDpnDetailsList,
                "receivable",
                (val: number) =>
                  Number(val)
                    ? numberWithCommasAndFraction(
                        val,
                        import.meta.env.VITE_REACT_APP_INR_DECIMALS
                      )
                    : "-"
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default NOCDaysPastTable;
