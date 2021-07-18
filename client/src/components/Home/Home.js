import { Typography, AppBar } from "@material-ui/core";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import Options from "./Options/Options";
import Notifications from "./Notifications/Notifications";

import useStyles from "./homeStyles";

import { Context } from "../../context/Context";
import { useContext } from "react";

const Home = () => {
  const { stream } = useContext(Context);
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <VideoPlayer />
      {stream && (
        <Options>
          <Notifications />
        </Options>
      )}
    </div>
  );
};

export default Home;
