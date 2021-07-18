import Authentication from "./components/Authentication/Authentication";
import Home from "./components/Home/Home";

import { useContext } from "react";
import { Context } from "./context/Context";
import { BrowserRouter, Route } from "react-router-dom";

const App = () => {
  const { user } = useContext(Context);

  return (
    <BrowserRouter>
      <Route path="/" exact component={user ? Home : Authentication} />
    </BrowserRouter>
  );
};

export default App;
