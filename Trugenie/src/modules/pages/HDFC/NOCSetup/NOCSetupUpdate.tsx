import { Button, Group, Stepper } from "@mantine/core";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import LeftArrowIcon from "../../../../assets/logos/SVG/left_arrow.svg";
import RightArrowIcon from "../../../../assets/logos/SVG/right_arrow.svg";
import { AppState } from "../../../../lib/common/appState";
import { selectSetProject } from "../../../../lib/services/HDFC/Project/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { successNotification } from "../../../Components/UtilityFunctions";
import {
  NOCAccountTypeRequestAction,
  NOCProjectDetailsRequestAction,
  getAccountDetailsAction,
  getAccountDetailsFailedAction,
  getNOCSetupWorkFlowAction,
  getPeriodAction,
  getProjectPriceHeadersAction,
  getProjectTypeAction,
  getREProjectTowersAction,
  getThresholdTypeAction,
  setupNocProjectFailedAction,
  setupNocProjectRequestAction,
  NOCProjectEntitiesRequestAction,
  NOCProjectEntityUsersRequestAction,
  NOCWorkflowDetailsRequestAction,
  GetPMCByClientRequestAction,
  GetDeveloperByClientRequestAction,
  GetDebentureByClientRequestAction,
  GetLenderByClientRequestAction,
  NocSetupUpdateRequestAction,
} from "../../../../lib/services/nocSetup/action";
import { NocAccountDetailsApiData, priceHeaderSelect, NocProjectEntitiesApiData, NocProjectEntityUsersApiData, UploadSetupNocPayload, NocWorkflowDetailsApiData } from "../../../../lib/services/nocSetup/datatype";
import { convertDateFormatYY } from "../../../../utils/commonFunctions";
import SpinnerComponent from "../../../Components/SpinnerComponent";
import { errorNotification } from "../../../Components/UtilityFunctions";
import Details from "./Details/Details";
import { ThreshholdDataType } from "./Details/ThresholdDetails";
import ManageWorkFlow from "./ManageWorkflow/ManageWorkFlow";
import Review from "./Review/Review";
import { selectNocSetupLoader } from "../../../../lib/services/nocSetup/selector";
import EntityDetails from "./AddEntity/EntityDetails";
export type dataType = {
  "accounts": any[],//accounts,
  "nocentities": any[],//nocentities,
  "nocentity": any[],//nocentity,
  "workflowdata": any[],//workflowData,
  "priceheader": any[],//headerJsonArray
};
const NOCSetupUpdate = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const nocSetup = useSelector((state: AppState) => state.nocSetup);
  const project = useSelector(selectSetProject);
  const userDetails = useSelector(selectUserDetails);
  const [accountDetails, setAccountDetails] = useState<NocAccountDetailsApiData[] | undefined>(undefined);
  const [thresholdDetails, setThresholdDetails] = useState<ThreshholdDataType | undefined>(undefined);
  const [thresHoldError, setThresHoldError] = useState<boolean>(false);
  const [active, setActive] = useState(0);
  const loader = useSelector(selectNocSetupLoader);
  const [entities, setEntities] = useState<NocProjectEntitiesApiData[] | undefined>(undefined);
  const [user, setUsers] = useState<NocProjectEntityUsersApiData[] | undefined>(undefined);
  const [workflowDetails, setWorkflowDetails] = useState<NocWorkflowDetailsApiData[]>([]);
  const nextStep = () => {
    let isValidWorkflow=checkWorkFlowValid();
    if (active === 2 && (!accountDetails || accountDetails?.length <= 0)) {
      errorNotification("Account Detail Can't be Empty");
    }else if (active === 0 && checkEntityRoles()) {
      errorNotification("Please add all entities user.");
    }else if(active === 1 && !isValidWorkflow ){
      errorNotification("Please add approver");
    }else{
    setActive(current => (
      ((entities && entities?.length > 0) || 
        (!thresHoldError 
          && accountDetails 
          && accountDetails?.length > 0  
          && workflowDetails?.length> 0) ||
        active !== 0
      )
        && current < 3 ? current + 1 : current
    ));
  }
  };
  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));

  const checkEntityRoles = (): boolean => {
    const nocentityRoles = entities && entities.map((entity) => entity.EntityRole);
    const nocentitiesRoles = user &&user.map((entity) => entity.EntityRole);
  
    return nocentityRoles && nocentityRoles.every((role) => nocentitiesRoles && nocentitiesRoles.includes(role)) ? false :true;
  };

  const checkWorkFlowValid = ()=>{
    const lennt =workflowDetails.length;
    if(workflowDetails[lennt - 1].StepType != 'Approver' || workflowDetails.length < 1 ){
      return false
    }else {
      return true;
    }
  
  }
  // useEffect(() => {
  //   return () => {
  //     dispatch(getAccountDetailsFailedAction());
  //   };
  // }, []);

  useEffect(() => {
    if (project?.REAssetId) {
      dispatch(getNOCSetupWorkFlowAction());
    }
  }, [project?.REAssetId]);

  useEffect(() => {
    if (!accountDetails && nocSetup.accountDetails && nocSetup.accountDetails.length > 0)
      setAccountDetails(
        nocSetup.accountDetails.map((v: NocAccountDetailsApiData) => ({
          ...v,
          Startdate: v.Startdate ? convertDateFormatYY(String(v.Startdate)) : "",
          Enddate: v.Enddate ? convertDateFormatYY(String(v.Enddate)) : "",
        })),
      );
    else if (!accountDetails && nocSetup.accountDetails) setAccountDetails([]);
  }, [nocSetup.accountDetails]);
  useEffect(() => {
    if (!entities && nocSetup.projectEntities && nocSetup.projectEntities.length > 0)
      setEntities(
        // entities
        nocSetup.projectEntities, //.map((v: NocProjectEntitiesApiData) => ({
        // ...v,
        // })),
      );
    else if (!entities && nocSetup.projectEntities) setEntities([]);
  }, [nocSetup.projectEntities]);

  useEffect(() => {
    if (!user && nocSetup.projectEntityUsers && nocSetup.projectEntityUsers.length > 0)
      setUsers(
        nocSetup.projectEntityUsers
      );
    else if (!user && nocSetup.projectEntityUsers) setUsers([]);
  }, [nocSetup.projectEntityUsers]);

  useEffect(() => {
    if (!user && nocSetup.WorkflowDetails && nocSetup.WorkflowDetails.length > 0)
      setWorkflowDetails(
        nocSetup.WorkflowDetails
      );
    else if (!workflowDetails && nocSetup.WorkflowDetails) setWorkflowDetails([]);
  }, [nocSetup.WorkflowDetails]);

  useEffect(() => {
    if (project?.REAssetId && project?.NocProjectId && active === 0 && !accountDetails) {
      dispatch(getThresholdTypeAction());
      dispatch(getPeriodAction());
      dispatch(getProjectTypeAction());
      dispatch(getREProjectTowersAction(project.REAssetId));
      dispatch(NOCAccountTypeRequestAction());
      dispatch(getProjectPriceHeadersAction(project.NocProjectId, project.REAssetId));
      dispatch(getAccountDetailsAction(project.NocProjectId));
      dispatch(NOCProjectEntitiesRequestAction(project.NocProjectId, userDetails?.EmailId));
      dispatch(NOCProjectEntityUsersRequestAction(project.NocProjectId, userDetails?.EmailId));
      dispatch(NOCWorkflowDetailsRequestAction(project.NocProjectId));
      // dispatch(GetLenderByClientRequestAction(project.NocProjectId));
      // dispatch(GetDebentureByClientRequestAction(project.NocProjectId));
      // dispatch(GetDeveloperByClientRequestAction(project.NocProjectId));
      // dispatch(GetPMCByClientRequestAction(project.NocProjectId));
      if (location.state) {
        // for edit
        dispatch(NOCProjectDetailsRequestAction(project.NocProjectId));
      }
    }
  }, [project?.REAssetId, active, location.state]);

  useEffect(() => {
    if (location.state && nocSetup.projectDetails && nocSetup.priceHeaders && nocSetup.period) {
      const data = nocSetup.projectDetails[0];
      const priceHeaders = nocSetup.priceHeaders.filter((v: priceHeaderSelect) => v.isselected === 1).map((v: priceHeaderSelect) => v.value);
      const obj: ThreshholdDataType = {
        minimumSPTolerance: data?.MinSellPriceTolerance ?? "",
        advancedPayment: data?.MinAdvancePayment ?? "",
        advancedPaymentTolerance: data?.MinAdvancePaymentTolerance ?? "",
        thresholdDate: data?.ThresholdDate ? dayjs(data.ThresholdDate).toDate() : undefined,
        thresholdType: data?.Thresholdtype ?? "",
        nocPriceHeaders: priceHeaders,
        avgPriceCalc: data?.AvgPriceCalculateOn ?? "",
        period: data.AvgPriceCalculatePeriod
          ? ["1", "3", "6", "12"].includes(String(data.AvgPriceCalculatePeriod))
            ? String(data.AvgPriceCalculatePeriod)
            : "-1"
          : undefined,
        enablePrefence: data?.ISEnableprefence === 1 ?? false,
        periodInput: data?.AvgPriceCalculatePeriod ?? "",
      };
      setThresholdDetails(obj);
    }
  }, [nocSetup.projectDetails, nocSetup.priceHeaders, nocSetup.period]);
  const callBack = (success: boolean) => {
    if (success) {
      successNotification("Project setup successfully");
      dispatch(getNOCSetupWorkFlowAction());
      setActive(0);
      setThresholdDetails(undefined);
      setAccountDetails(undefined);
      dispatch(setupNocProjectFailedAction(undefined));
      if (project) {
        dispatch(getProjectPriceHeadersAction(project.NocProjectId, project.REAssetId));
        dispatch(getAccountDetailsAction(project.NocProjectId));
        dispatch(NOCProjectDetailsRequestAction(project.NocProjectId));
      }
    }
  };
  const convertDataToJson = {

  }

  return (
    <>
      {nocSetup.loaders.viewUserDetails && <SpinnerComponent />}
      <div className='p-3'>
        <Stepper size='xs' active={active} onStepClick={setActive}>
          <Stepper.Step color='truboard-primary.0' label='Add Entity'>
            <EntityDetails
              entities={entities}
              setEntities={setEntities}
              user={user}
              setUsers={setUsers}
            >
            </EntityDetails>
          </Stepper.Step>
          <Stepper.Step color='truboard-primary.0' label='Manage Workflow'>
            <ManageWorkFlow
              workflowDetails={workflowDetails}
              setWorkflowDetails={setWorkflowDetails}
              entityUser={user}
            />
          </Stepper.Step>
          <Stepper.Step color='truboard-primary.0' label='Details'>
            {/* {location.state && thresholdDetails && ( */}
            <Details
              accountDetails={accountDetails}
              setAccountDetails={setAccountDetails}
              thresholdDetails={thresholdDetails}
              setThresholdDetails={setThresholdDetails}
              setThresHoldError={setThresHoldError}
            />
            {/* )}  */}
          </Stepper.Step>
          <Stepper.Step color='truboard-primary.0' label='Review'>
            <Review
              entities={entities}
              setEntities={setEntities}
              user={user}
              setUsers={setUsers}
              workflowDetails={workflowDetails}
              setWorkflowDetails={setWorkflowDetails}
              accountDetails={accountDetails}
              setAccountDetails={setAccountDetails}
              thresholdDetails={thresholdDetails}
              setThresholdDetails={setThresholdDetails}
            />
          </Stepper.Step>
        </Stepper>
        <Group className='float-end mb-2  ' mt='xl'>
          {active !== 0 && (
            <Button variant='default' onClick={prevStep}>
              {/* <IconChevronLeft size='1.2rem' stroke={2} cursor='pointer' /> */}
              <img src={LeftArrowIcon} style={{ width: "1rem", height: "1rem", marginRight: "1rem" }} />
              Previous
            </Button>
          )}
          {active !== 3 && (
            <Button disabled={active === 3} color='truboard-primary.0' onClick={nextStep}>
              Next
             
              <img src={RightArrowIcon} className='filter-white' style={{ width: "1rem", height: "1rem", marginLeft: "1rem" }} />
              {/* <IconChevronRight size='1.2rem' stroke={2} cursor='pointer' /> */}
            </Button>
          )}
          {active === 3 && (
            <Button
              loading={loader?.setupNocProject}
              color='green'
              onClick={() => {
                let jsonData = {
                  "accounts": accountDetails
                    ? accountDetails?.map(v => ({
                      accounttype: v.Accounttype,
                      accountnumber: String(v.AccountNumber),
                      bankname: v.BankName,
                      brnachaddress: v.BrnachAddress,
                      towers: v.Towers,
                      startDate: v?.Startdate ? dayjs(v.Startdate).format("YYYY-MM-DD") : undefined,
                      endDate: v?.Enddate ? dayjs(v.Enddate).format("YYYY-MM-DD") : undefined,
                      rerano: v.RERANumber,
                    }))
                    : [],//accounts,
                  "nocentity": entities ? entities?.map(v => ({
                    noCentityId: v.NoCEntityId,
                    entityid: v.EntityId,
                    entityname: v.EntityName,
                    priority: v.Priority,
                    entityrole: v.EntityRole,
                  }))
                    : [],//nocentities,
                  "nocentities": user
                    ? user?.map(v => ({
                      entityrole: v.EntityRole,
                      entityname: v.EntityName,
                      entityaddress: v.EntityAddress,
                      emailid: v.EmailId,
                      authsignatory: v.SignatoryName,
                      priority: v.Priority,
                      entityid: v.EntityId,
                      parentid: v.ParentEntityId,
                      parentname: v.parentname,
                      designation: v.Designation
                    })) : [],//nocentity,
                  "workflowdata": workflowDetails
                    ? workflowDetails?.map(v => ({
                      Id: v.Id,
                      Priority: v.Priority,
                      EntityId: v.EntityId,
                      EntityName: v.EntityName,
                      EntityRole: v.EntityRole,
                      UserName: v.EntityId,
                      UserEmail: v.EmailId,
                      IsByPass: v.isBypass,
                      Signature: v.Signature ?? 1,
                      TypeOfStep: v.StepType ? v.StepType : "NA",
                    })) : [],//workflowData,
                  "priceheader": thresholdDetails?.nocPriceHeaders
                    ? thresholdDetails.nocPriceHeaders.map(nocPriceHeader => ({
                      REPriceHeaderId: nocPriceHeader ?? "",
                      HeaderValue: nocSetup.priceHeaders.filter((v: priceHeaderSelect) => v.value === nocPriceHeader)[0].label ?? "",
                    }))
                    : [],
                }
                const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
                let payload = {
                  nocProjectId: project?.NocProjectId ?? 0,
                  minimumSPTolerance: thresholdDetails?.minimumSPTolerance ? Number(thresholdDetails.minimumSPTolerance) : undefined,
                  advancedPayment: thresholdDetails?.advancedPayment ? Number(thresholdDetails.advancedPayment) : undefined,
                  advancedPaymentTolerance: thresholdDetails?.advancedPaymentTolerance ? Number(thresholdDetails.advancedPaymentTolerance) : undefined,
                  thresholdDate: thresholdDetails?.thresholdDate?.toISOString() ?? "",
                  thresholdType: thresholdDetails?.thresholdType ?? "",
                  avgPriceCalc: thresholdDetails?.avgPriceCalc ?? "",
                  userEmail: userDetails?.EmailId ?? "",
                  FlowType: 0,
                  period: thresholdDetails?.period == -1 ? thresholdDetails?.periodInput : thresholdDetails?.period,
                  enableprefence: thresholdDetails?.enablePrefence ? 1 : 0,
                  file: blob,
                };
                dispatch(
                  NocSetupUpdateRequestAction(payload, callBack)
                );
              }}>
              Done
            </Button>
          )}
        </Group>
      </div>
    </>
  );
};

export default NOCSetupUpdate;
