import { black, brightRed } from "../../../../assets/colorConstants";


export const comonStyles = {
  constructionActivityBtn: {
    padding: ".7em 3em",
    border: "1px black solid",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export const customStyle = {
  physicalProgressSubheader: {
    color: brightRed,
    fontWeight: 700,
    marginLeft: "1rem",
  },
  physicalProgressDetailTableHead: {
    color: "#fff",
    backgroundColor: black,
  },
  physicalProgressDetailTable: {
    color: "#000",
    backgroundColor: "#F1F0F0",
    fontWeight: "700",
  },
  physicalProgressDetailOtherHead: {
    color: "#D06F26",
    backgroundColor: "#F1F0F0",
    fontWeight: "700",
  },
  physicalProgressDetailOther: {
    color: "#000",
    backgroundColor: "#C4C4C4",
  },
  constructionActivityBtn: {
    backgroundColor: "#fff",
    color: "#e52f22",
    ...comonStyles.constructionActivityBtn,
  },
  constructionActivityBtnActive: {
    backgroundColor: "#000",
    color: "#fff",
    ...comonStyles.constructionActivityBtn,
  },
  summarySubHeader: {
    backgroundColor: "#000",
    color: "#fff",
    border: "#ffffff 2px solid",
  },
  constructionSubheader: {
    marginLeft: "1.4em",
    fontWeight: "700",
    color: brightRed,
  },
};