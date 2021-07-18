import React, { createContext, useState, useRef } from "react";

import * as api from "../context/apiCalls";

import io from "socket.io-client";
import Peer from "simple-peer";
import { URL } from "./apiCalls";

export const Context = createContext();
const socket = io(URL);

export const ContextProvider = ({ children }) => {
  // For Authentication
  const authFormInitialState = {
    emailLogin: "",
    passwordLogin: "",
    nameRegister: "",
    emailRegister: "",
    passwordRegister: "",
  };
  const [isRegister, setIsRegister] = useState(false);
  const [authForm, setAuthForm] = useState(authFormInitialState);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleToggleAuth = (e) => {
    e.preventDefault();
    setIsRegister(!isRegister);
  };

  const handleAuthFormOnChange = (e) => {
    e.preventDefault();
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  const handleAuth = (e) => {
    e.preventDefault();

    if (isRegister) {
      api
        .register({
          name: authForm.nameRegister,
          email: authForm.emailRegister,
          password: authForm.passwordRegister,
        })
        .then(() => alert("You are now registered"))
        .catch((err) => alert(err.response.data.message));
    } else {
      api
        .signin({
          email: authForm.emailLogin,
          password: authForm.passwordLogin,
        })
        .then(({ data: { result } }) => {
          setUser(result);
          localStorage.setItem("user", JSON.stringify(result));
        })
        .catch((err) => alert(err.response.data.message));
    }
  };

  const handleLogout = (e) => {
    setUser(null);
    localStorage.clear();
  };

  // For Video Chat

  const [callAccepted, setCallAccepted] = useState(false);
  const [stream, setStream] = useState();
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: user.name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <Context.Provider
      value={{
        // For Authentication
        isRegister,
        authForm,
        handleToggleAuth,
        handleAuthFormOnChange,
        handleAuth,
        handleLogout,
        user,

        // For Video Chat
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        me,
        callUser,
        leaveCall,
        answerCall,

        setStream,
        setCall,
        setMe,
        socket,
      }}
    >
      {children}
    </Context.Provider>
  );
};
