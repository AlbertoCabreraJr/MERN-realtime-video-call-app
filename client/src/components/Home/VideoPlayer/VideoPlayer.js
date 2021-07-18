import { Grid, Typography, Paper } from "@material-ui/core";

import useStyles from "./videoplayerStyles";

import { Context } from "../../../context/Context";
import { useContext, useEffect } from "react";

const VideoPlayer = () => {
  const classes = useStyles();
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    call,
    setStream,
    socket,
    setMe,

    setCall,
  } = useContext(Context);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  return (
    <div className={callAccepted ? classes.videoGridTwo : classes.videoGridOne}>
      {stream && (
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          className={classes.video}
        />
      )}
      {callAccepted && (
        <video playsInline ref={userVideo} autoPlay className={classes.video} />
      )}
    </div>
  );
};

export default VideoPlayer;
