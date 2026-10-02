import React, { useEffect, useState } from "react";
import { brightRed } from "../../../../../assets/colorConstants";
import { useSelector } from "react-redux";
import { AppState } from "../../../../../lib/common/appState";
import {
  numberWithCommasAndFraction,
} from "../../../../../widgets/charts/Recharts/utils";

interface Trailing {
  title: string;
  rate: number;
  velocity: number;
}

const TraillingPerformance = () => {
  const salesDashboard = useSelector((state: AppState) => state.salesDashboard);
  const [trailling, setTrailling] = useState<Trailing[]>([]);

  useEffect(() => {
    if (
      salesDashboard.dashboardDetailsv2?.data?.priceAndVelocityDetails?.cards
    ) {
      setTrailling(
        salesDashboard.dashboardDetailsv2.data.priceAndVelocityDetails.cards
      );
    } else setTrailling([]);
  }, [salesDashboard.dashboardDetailsv2?.data]);

  return (
    <div className="row mt-4">
      <div className="sales-graph-heading">Trailling Performance</div>
      <div className="col-md-12 col-sm-12 d-flex flex-wrap justify-content-around">
        {trailling.map((t) => (
          <div className="sales-trailling-border">
            <div
              className="rounded border text-white"
              style={{
                backgroundColor: brightRed,
                width: "100px",
                padding: "0.2em",
              }}
            >
              {t.title}
            </div>
            <div className="row border-bottom pb-2 pt-2 w-90">
              <div className="col-md-6 col-sm-6">
                <b>
                  Rate <br />
                  (per Sq. Ft.)
                </b>
              </div>
              <div className="col-md-6 col-sm-6 d-flex align-items-center">
                {numberWithCommasAndFraction(
                  t.rate,
                  import.meta.env.VITE_REACT_APP_RATE_DECIMAL
                )}
              </div>
            </div>
            <div className="row pt-2 w-90">
              <div className="col-md-6 col-sm-6">
                <b>
                  Velocity per quarter <br />
                  (in Sq. Ft.)
                </b>
              </div>
              <div className="col-md-6 col-sm-6 d-flex align-items-center">
                {numberWithCommasAndFraction(
                  t.velocity,
                  import.meta.env.VITE_REACT_APP_AREA_DECIMAL
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TraillingPerformance;
