import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Carousel, Modal, Button } from "react-bootstrap";
import LabourRecordTwo from "./LabourRecordTwo";
import LabourRecordOne from "./LabourRecordOne";
import { customStyle } from "../style";
import { RemarksObjType } from "../../../../../layout/dashboardRemarks/Datatypes";
import { InsertDashboardRemarkPayload } from "../../../../../lib/services/dashboardRemarks/dataType";
import { AppState } from "../../../../../lib/common/appState";
import { labourRecordListType } from "../../../../../lib/services/constructionDashboardv2/dataType";
import { minMaxValueOfArrayofObject } from "../../../../../widgets/charts/Recharts/utils";
import { getDocFiles } from "../../../../../lib/api";
import { getFileExtrension } from "../../../../../utils/commonFunctions";
import { DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { constrcutionChartNames } from "../../../../../lib/services/dashboardRemarks/constants";
import { selectAccessToken } from "../../../../../lib/services/hdfc_login/selectors";

interface SiteVisitProps {
  addRemark: boolean;
  remarks: RemarksObjType;
  setRemarks: (obj: RemarksObjType) => void;
  saveRequest: InsertDashboardRemarkPayload;
}

const SiteVisit: React.FC<SiteVisitProps> = ({ addRemark, remarks, setRemarks, saveRequest }) => {
  const { constructionDashboard, login } = useSelector((state: AppState) => state);
  const accessToken = useSelector(selectAccessToken);
  const { constructionSummary } = constructionDashboard;
  const [schemaImages, setSchemaImages] = useState<string[]>([]);
  const [atInvestmentImages, setAtInvestmentImages] = useState<string[]>([]);
  const [siteVisitImages, setSiteVisitImages] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [historyGraphData, setHistoryGraphData] = useState<labourRecordListType[]>([]);
  const [projectedGraphData, setProjectedGraphData] = useState<labourRecordListType[]>([]);
  const [domain, setDomain] = useState<number[] | string[]>(["auto", "auto"]);
  const [activeBtn, setActiveBtn] = useState<string>("");

  const HeaderButton = ["Skilled", "Unskilled"];

  useEffect(() => {
    if (constructionSummary?.data?.siteVisit?.labourRecordList && constructionSummary.data.siteVisit.labourRecordList.length > 0) {
      const alldata = constructionSummary.data.siteVisit.labourRecordList;
      setHistoryGraphData(alldata.filter((v: labourRecordListType) => v.title === "Prescribed Historic"));
      setProjectedGraphData(alldata.filter((v: labourRecordListType) => v.title === "Prescribed Future"));
      const range = minMaxValueOfArrayofObject(alldata, ["actualValue", "labourCount", "projectedValue"]);
      setDomain(range);
      setActiveBtn("Skilled");
    } else {
      setHistoryGraphData([]);
      setProjectedGraphData([]);
      setDomain(["auto", "auto"]);
    }
  }, [constructionSummary?.data?.siteVisit?.labourRecordList]);

  useEffect(() => {
    if (activeBtn && (projectedGraphData.length > 0 || historyGraphData.length > 0)) {
      const alldata = constructionSummary.data.siteVisit.labourRecordList;
      historyGraphData.length > 0 &&
        setHistoryGraphData(alldata.filter((v: labourRecordListType) => v.title === "Prescribed Historic" && v.labourTag === activeBtn));
      // setHistoryGraphData(
      //   historyGraphData.filter(
      //     (v: labourRecordListType) => v.labourTag === activeBtn
      //   )
      // );
      projectedGraphData.length > 0 &&
        setProjectedGraphData(alldata.filter((v: labourRecordListType) => v.title === "Prescribed Future" && v.labourTag === activeBtn));
    }
  }, [activeBtn]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const { data } = constructionSummary;
        if (data && data.siteVisit && data.siteVisit.layoutPhtoGraphsTypes) {
          const schemaImagesData = data.siteVisit.layoutPhtoGraphsTypes["Schema"];
          const atInvestmentImagesData = data.siteVisit.layoutPhtoGraphsTypes["At Investment"];
          const siteVisitImagesData = data.siteVisit.layoutPhtoGraphsTypes["Site Visit"];

          await fetchImagesForSection(schemaImagesData, setSchemaImages, "Thumb");
          await fetchImagesForSection(atInvestmentImagesData, setAtInvestmentImages, "Thumb");
          await fetchImagesForSection(siteVisitImagesData, setSiteVisitImages, "Thumb");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }
    fetchImages();

    return () => {
      schemaImages.forEach(URL.revokeObjectURL);
      atInvestmentImages.forEach(URL.revokeObjectURL);
      siteVisitImages.forEach(URL.revokeObjectURL);
    };
  }, [constructionSummary, login.token]);

  const fetchImagesForSection = async (imagesData: any, setImages: any, type: string) => {
    const fetchedImages: string[] = [];
    for (const image of imagesData) {
      const res = await getDocFiles(image.fileContainer, image.filePath, image.fileName, accessToken , "thumb");
      if (res.ok) {
        const blob = await res.blob();
        const fileExtension = getFileExtrension(image.fileName);
        if (fileExtension === "png" || fileExtension === "jpg" || fileExtension === "jpeg") {
          fetchedImages.push(URL.createObjectURL(blob));
        }
      }
    }
    setImages(fetchedImages);
  };

  const handleImageClick = (images: string[], index: number) => {
    setModalImages(images);
    setActiveIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCarouselSelect = (selectedIndex: number, e: any) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <>
      <div className='sales-graph-heading'>Layout & Photographs</div>

      <div className='text-center row'>
        <div className='col-md-4 col-sm-12 mt-4'>
          <Carousel>
            {schemaImages.map((image, index) => (
              <Carousel.Item key={index}>
                <div className='p-3' style={{ backgroundColor: "white" }} onClick={() => handleImageClick(schemaImages, index)}>
                  <img className='d-block w-100' src={image} alt={`Schema ${index}`} height={300} width={700} />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className='mt-4 w-50 border border-secondary rounded p-2 mx-auto'>Schema</div>
        </div>
        <div className='col-md-4 col-sm-12 mt-4'>
          <Carousel>
            {atInvestmentImages.map((image, index) => (
              <Carousel.Item key={index}>
                <div className='p-3' style={{ backgroundColor: "white" }} onClick={() => handleImageClick(atInvestmentImages, index)}>
                  <img className='d-block w-100' src={image} alt={`At Investment ${index}`} height={300} width={700} />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className='mt-4 w-50 border border-secondary rounded p-2 mx-auto'>At Investment</div>
        </div>
        <div className='col-md-4 col-sm-12 mt-4'>
          <Carousel>
            {siteVisitImages.map((image, index) => (
              <Carousel.Item key={index}>
                <div className='p-3' style={{ backgroundColor: "white" }} onClick={() => handleImageClick(siteVisitImages, index)}>
                  <img className='d-block w-100' src={image} alt={`Site Visit ${index}`} height={300} width={700} />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className='mt-4 w-50 border border-secondary rounded p-2 mx-auto'>Site Visit</div>
        </div>
      </div>

      <Modal show={showModal} onHide={closeModal} centered size='lg'>
        <Modal.Body>
          <Carousel activeIndex={activeIndex} onSelect={handleCarouselSelect}>
            {modalImages.map((image, index) => (
              <Carousel.Item key={index}>
                <img src={image} alt={`Modal ${index}`} className='d-block w-100' />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='mt-4 mb-4'>
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={constrcutionChartNames.Layout_and_Photographs}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>

      <div className='row mt-4'>
        <div className='d-flex justify-content-between'>
          <span className='sales-graph-heading'>Labour Record</span>
          <span>
            {HeaderButton.map(v => (
              <span
                key={v}
                style={activeBtn === v ? customStyle.constructionActivityBtnActive : customStyle.constructionActivityBtn}
                onClick={() => setActiveBtn(v)}>
                {v}
              </span>
            ))}
          </span>
        </div>

        <div className='col-md-6 col-sm-12'>
          <LabourRecordOne graphData={historyGraphData} domain={domain} />
        </div>
        <div className='col-md-6 col-sm-12'>
          <LabourRecordTwo graphData={projectedGraphData} domain={domain} />
        </div>
      </div>

      <div className='mt-4 mb-4'>
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={constrcutionChartNames.Labour_Record}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
    </>
  );
};

export default SiteVisit;
