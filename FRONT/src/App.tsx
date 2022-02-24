import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider } from "styled-components";

import buildRoutes from "Routes";

import GlobalStyles from "styles/global";
import theme from "styles/theme";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {buildRoutes()}
      </ThemeProvider>
    </Router>
  );
}

export default App;
