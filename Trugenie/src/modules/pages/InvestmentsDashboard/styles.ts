
export const styles = {
  headingIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginRight: "20px",
  },
  card: {
    width: "400px",
    borderRadius: "20px",
    paddingTop: "10px",
    background: "white",
  },
  largeCard: {
    borderRadius: "20px",
    padding: "10px 20px",
    zIndex: 1000,
    background: "white",
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
  },
  cardTitle: {
    width: "90%",
    borderTopRightRadius: "100px",
    borderBottomRightRadius: "100px",
    borderTopLeftRadius: "20px",
    fontWeight: "bold",
    padding: "0px !important",
    height: "24px",
    verticalAlign: "middle",
    paddingLeft: "16px",
    // fontSize:"12px"
  },
  latestIndicator: {
    height: "20px",
    width: "40px",
    background: "lightpink",
  },
  backgroundColor : {
    height: "100%", overflowY: "auto", backgroundColor: "white"
  }
};

export const centerContent =
  "d-flex justify-content-between align-items-center";
