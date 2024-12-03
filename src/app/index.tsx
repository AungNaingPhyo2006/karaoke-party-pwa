import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Routing from "./routing/Routing";
import Menu from "./routing/Menu";
import Theme from "./theme/Theme";
import { AppProvider } from "./state/Context";

const App: React.FC = () => (
  <AppProvider>
    <Theme>
    <Menu/>
    <Routing/>
    </Theme>
  </AppProvider>
);
export default App;
