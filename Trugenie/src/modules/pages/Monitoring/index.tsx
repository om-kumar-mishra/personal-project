
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { AppState } from "../../../lib/common/appState";
import { getMonitoringSheetDetailsRequested } from "../../../lib/services/HDFC/MonitoringSheet/action";
// import { selectMonitoringSheetDetails } from "../../../lib/services/HDFC/MonitoringSheet/selectors";
import { Project } from "../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../lib/services/HDFC/Project/selectors";
import TableSection from "./TableSection";

const TycoonMonitoringPage = () => {
    const dispatch = useDispatch();
    const project = useSelector(selectSetProject) as Project;
    // const MonitoringSheetDetails = useSelector(selectMonitoringSheetDetails);

    useEffect(() => {
        if (project?.REAssetId)
            dispatch(getMonitoringSheetDetailsRequested(project.REAssetId.toString()));
    }, [project?.REAssetId]);

    // on Page Scroll
    useEffect(() => {
        const header = document.querySelector(".sticky-header");
        const handleScroll = () => {
            if (window.scrollY > 0) {
                header?.classList.add("bg-color-onscroll");
                // header?.classList.add("text-light");
            } else {
                header?.classList.remove("bg-color-onscroll");
                // header?.classList.remove("text-light");
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // useEffect(() => {
    //     if (constructionDashboard.constructionSummary?.data?.remarks)
    //         setRemarks(constructionDashboard.constructionSummary.data.remarks);
    //     else setRemarks({});
    // }, [constructionDashboard.constructionSummary?.data?.remarks]);

    return (
        <div>
            <TableSection />
        </div>
    );
};

export default TycoonMonitoringPage;
