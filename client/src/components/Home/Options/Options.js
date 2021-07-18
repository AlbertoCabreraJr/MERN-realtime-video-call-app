import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";

import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";
import { useState } from "react";
import { Context } from "../../../context/Context";
import { useContext } from "react";

import useStyles from "./optionsStyles";
import "./options.css";

const Options = ({ children }) => {
  const classes = useStyles();
  const { me, callAccepted, leaveCall, callUser, handleLogout } =
    useContext(Context);
  const [idToCall, setIdToCall] = useState("");

  return (
    <div className="home-container">
      <div className="home-items">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <form autoComplete="off">
          <input
            className="id-to-call"
            type="text"
            placeholder="ID to call"
            required
            minLength={24}
            maxLength={24}
            onChange={(e) => setIdToCall(e.target.value)}
          />
          <>
            {callAccepted ? (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<PhoneDisabled fontSize="large" />}
                fullWidth
                onClick={leaveCall}
                className={classes.margin}
              >
                Hang Up
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                startIcon={<Phone fontSize="large" />}
                fullWidth
                onClick={() => callUser(idToCall)}
                className={classes.margin}
              >
                Call
              </Button>
            )}
          </>
        </form>

        <button
          className="button copy-clip"
          onClick={() => navigator.clipboard.writeText(me)}
        >
          Copy your ID
        </button>

        {children}
      </div>
    </div>
  );
};

export default Options;
