import React, { useEffect } from "react";
import SalesDashboardv2Page from "../Sales/Dashboard/SalesDashboardv2Page";

const SalesDashboard = () => {
  useEffect(() => {
    document.title = "Sales Dashboard";

    // // on Page Scroll
    // const header = document.querySelector(".sticky-header");
    // const handleScroll = () => {
    //   if (window.scrollY > 0) {
    //     header?.classList.add("bg-color-onscroll");
    //     // header?.classList.add("text-light");
    //   } else {
    //     header?.classList.remove("bg-color-onscroll");
    //     // header?.classList.remove("text-light");
    //   }
    // };
    // window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  return <div className='m-0 row main-body'>{<SalesDashboardv2Page />}</div>;
};

export default SalesDashboard;
