import { Button, Flex, Text } from "@mantine/core";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import rightArrow from "../../../../assets/logos/SVG/Check.svg";
import pendingIcon from "../../../../assets/logos/setup_pending_final.svg";
import { Project } from "../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../lib/services/HDFC/Project/selectors";
import { canCreateSetupRequested } from "../../../../lib/services/HDFC/ProjectSetupUpdate/action";
import { selectcanCreateSetup } from "../../../../lib/services/HDFC/ProjectSetupUpdate/selectors";
import { ROUTES } from "../../../../routeConstants";

const SetupUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector(selectSetProject) as Project;
  const canCreateSetup = useSelector(selectcanCreateSetup);

  const changeColor = (isCompleted: number, text: string): { color: string; text: string } => {
    switch (isCompleted) {
      case 0:
        return {
          color: "gray",
          text: `${text} setup pending`,
        };
      case 1:
        return {
          color: "red",
          text: text === "Project" ? "Pending for Approval" : `Configure ${text}`,
        };
      case 2:
        return { color: "green", text: "Approved" };
      default:
        return {
          color: "gray",
          text: "",
        };
    }
  };

  useEffect(() => {
    dispatch(canCreateSetupRequested(project?.REAssetId));
  }, []);
  const isCompleted = useMemo(() => canCreateSetup?.find(item => item?.title === "Project Setup")?.Iscompleted, [canCreateSetup]);
  const isCompletedNoc = useMemo(() => canCreateSetup?.find(item => item?.title === "NOC Setup")?.Iscompleted, [canCreateSetup]);
  const isCompletedConstruction = useMemo(() => canCreateSetup?.find(item => item?.title === "Construction Setup")?.Iscompleted, [canCreateSetup]);
  const isCompletedOpex = useMemo(() => canCreateSetup?.find(item => item?.title === "OPEX Setup")?.Iscompleted, [canCreateSetup]);
  const isCompletedSummary = useMemo(() => canCreateSetup?.find(item => item?.title === "Summary Setup")?.Iscompleted, [canCreateSetup]);
  const isCompletedCashflow = useMemo(() => canCreateSetup?.find(item => item?.title === "Cashflow Setup")?.Iscompleted, [canCreateSetup]);

  const setupButtons = useMemo(() => {
    return [
      {
        title: "Project Setup",
        onClick: () => navigate(ROUTES.PROJECT_SETUP_UPDATE),
        pending: isCompleted,
        src: isCompleted === 0 || isCompleted === 1 || isCompleted === undefined ? pendingIcon : rightArrow,
        color: changeColor(Number(isCompleted), "Project"),
      },
      {
        title: "NOC Setup",
        onClick: () => navigate(ROUTES.NOC_SETUP_UPDATE, { state: isCompletedNoc }),
        pending: isCompletedNoc,
        src: isCompletedNoc === 0 || isCompletedNoc === 1 || isCompletedNoc === undefined ? pendingIcon : rightArrow,
        color: changeColor(Number(isCompletedNoc), "NOC"),
      },
      {
        title: "Construction Setup",
        onClick: () => navigate(ROUTES.CONSTRUCTION_SETUP_UPDATE, { state: isCompletedConstruction }),
        pending: isCompletedConstruction,
        src:
          isCompletedConstruction === 0 || isCompletedConstruction === 1 || isCompletedConstruction === undefined || isCompletedConstruction === null
            ? pendingIcon
            : rightArrow,
        color: changeColor(Number(isCompletedConstruction), "Construction"),
      },
      {
        title: "Opex Setup",
        onClick: () => navigate(ROUTES.OPEX_SETUP_UPDATE),
        pending: isCompletedOpex,
        src: isCompletedOpex === 0 || isCompletedOpex === 1 || isCompletedOpex === undefined ? pendingIcon : rightArrow,
        color: changeColor(Number(isCompletedOpex), "Opex"),
      },
      {
        title: "Cashflow Setup",
        onClick: () => navigate(ROUTES.CASHFLOW_SETUP_UPDATE),
        pending: isCompletedCashflow,
        src: isCompletedCashflow === 0 || isCompletedCashflow === 1 || isCompletedCashflow === undefined ? pendingIcon : rightArrow,
        color: changeColor(Number(isCompletedCashflow), "Cashflow"),
      },
      {
        title: "Summary Setup",
        onClick: () => navigate(ROUTES.SUMMARY_SETUP_UPDATE),
        pending: isCompletedSummary,
        src: isCompletedSummary === 0 || isCompletedSummary === 1 || isCompletedSummary === undefined ? pendingIcon : rightArrow,
        color: changeColor(Number(isCompletedSummary), "Summary"),
      },
    ];
  }, [isCompleted, isCompletedNoc, isCompletedConstruction, isCompletedOpex, isCompletedSummary, isCompletedCashflow]);

  return (
    <Flex gap={10} justify={"space-evenly"} align={"center"}>
      <Flex w={"100%"} gap={"md"} justify={"center"} wrap='wrap'>
        {setupButtons.map(v => (
          <Button
            key={v.title}
            // onClick={v.pending ? v.onClick : undefined}
            onClick={v.onClick}
            // w={"25%"}
            rightIcon={
              <img
                src={v.src}
                style={{
                  width: "15px",
                  height: "15px",
                  filter: v.pending === 0 || v.pending === 1 || v.pending === undefined || v.pending === null ? "invert(1)" : "none",
                }}
              />
            }
            style={{ backgroundColor: v?.color?.color }}>
            <Text title={v?.color?.text}>{v.title}</Text>
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

export default SetupUpdate;
