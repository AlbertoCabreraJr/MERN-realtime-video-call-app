import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid white",
  },
  text: {
    fontSize: "16px",
    color: "white",
    fontWeight: "600",
  },

  button: {
    height: "30px",
    marginLeft: "10px",
  },
}));

export default useStyles;
