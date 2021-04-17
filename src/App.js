import React, { Suspense } from "react";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Router from "./routes";
import { NAVBAR_WIDTH } from "./components/Navbar";

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Nunito"', '"Helvetica"', '"Arial"', "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#5D64BC",
    },
    secondary: {
      main: "#FA5514",
    },
    error: {
      main: "#EA0B43",
    },
    text: {
      primary: "#2D2E2E",
      secondary: "#747575",
    },
    background: {
      default: "#FDFDFD",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

const useStyles = makeStyles((theme) => ({
  Container: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
  },
  Content: {
    display: "flex",
    flexDirection: "column",
  },
}));

const App = () => {
  const styles = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box classes={{ root: styles.Container }}>
          <Suspense fallback={<div />}>
            <Box classes={{ root: styles.Content }}>
              <AnimatePresence>
                <Router />
              </AnimatePresence>
            </Box>
          </Suspense>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
