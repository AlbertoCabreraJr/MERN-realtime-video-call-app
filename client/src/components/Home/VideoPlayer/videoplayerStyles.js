import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  video: {
    height: "500px",
    width: "700px",
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },

  videoGridOne: {
    display: "grid",
    marginTop: "-2%",
    gap: "2px",
    marginLeft: "10%",
    marginRight: "10%",
    gridAutoRows: "700px",
    justifyContent: "center",
  },

  videoGridTwo: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    marginTop: "-2%",
    gap: "2px",
    marginLeft: "10%",
    marginRight: "10%",
    gridAutoRows: "700px",
    justifyContent: "center",
  },
}));

export default useStyles;
