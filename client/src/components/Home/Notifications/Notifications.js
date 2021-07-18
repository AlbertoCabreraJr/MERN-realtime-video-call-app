import { Button } from "@material-ui/core";

import { Context } from "../../../context/Context";
import { useContext } from "react";

import useStyles from "./notificationsStyles";

const Notifications = () => {
  const classes = useStyles();
  const { answerCall, call, callAccepted } = useContext(Context);
  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div className={classes.container}>
          <div className={classes.text}>{call.name} is calling:</div>
          <Button
            variant="contained"
            color="primary"
            onClick={answerCall}
            className={classes.button}
          >
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
