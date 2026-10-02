import React, { useMemo, useRef, useState } from "react";
import InvestmentPerformance from "./investmentPerformance";
import SalesPerformance from "./salesPerformance";

interface ButtonTabType {
  id: string;
  value: string;
}

const PortfolioView = () => {
  const [activeTab, setActiveTab] = useState<string>("investementPerformance");
  const investmentPerformanceTab = useRef(null);
  const investmentSalesTab = useRef(null);
  const ButtonTab: ButtonTabType[] = useMemo(() => {
    return [
      {
        id: "investementPerformance",
        value: "Investment Performance",
      },
      {
        id: "salesPerformance",
        value: "Sales Performance",
      },
    ];
  }, []);

  return (
    <div className="main-body">
      <div className="d-flex flex-wrap justify-content-end">
        {ButtonTab.map((v: ButtonTabType) => (
          <span key={v.id}
            style={{ width: "210px", cursor: "pointer" }}
            className={`${
              activeTab === v.id
                ? "tab-btn-active"
                : "heading-bg-color main-color"
            } pb-1 pt-1 m-1  text-center font-bold`}
            onClick={() => setActiveTab(v.id)}
          >
            {v.value}
          </span>
        ))}
      </div>
      <div className="mt-2">
        {activeTab === ButtonTab[0].id && (
          <div ref={investmentPerformanceTab}>
            <InvestmentPerformance />
          </div>
        )}
      </div>
      <div className="mt-3">
        {activeTab === ButtonTab[1].id && (
          <div ref={investmentSalesTab}>
            <SalesPerformance />
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioView;
