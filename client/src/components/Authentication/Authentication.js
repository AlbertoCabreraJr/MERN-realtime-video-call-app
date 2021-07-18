import "./authentication.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Authentication = () => {
  const {
    isRegister,
    authForm,
    handleToggleAuth,
    handleAuthFormOnChange,
    handleAuth,
  } = useContext(Context);
  return (
    <div className="container">
      <form className="auth-form" autoComplete="off" onSubmit={handleAuth}>
        <p>{isRegister ? "Register" : "Login"}</p>
        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            name="nameRegister"
            value={authForm.nameRegister}
            onChange={handleAuthFormOnChange}
            required
          />
        )}
        <br />
        <input
          type="email"
          placeholder="Email"
          name={isRegister ? "emailRegister" : "emailLogin"}
          value={isRegister ? authForm.emailRegister : authForm.emailLogin}
          onChange={handleAuthFormOnChange}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name={isRegister ? "passwordRegister" : "passwordLogin"}
          value={
            isRegister ? authForm.passwordRegister : authForm.passwordLogin
          }
          onChange={handleAuthFormOnChange}
          required
        />
        <br />
        <input type="submit" value="Go" />
        <br />

        <button className="toggle-button" onClick={handleToggleAuth}>
          {isRegister ? "Already have an account?  Login" : "Create Account"}
        </button>
      </form>

      <div className="drops">
        <div className="drop drop-1"></div>
        <div className="drop drop-3"></div>
      </div>
    </div>
  );
};

export default Authentication;
