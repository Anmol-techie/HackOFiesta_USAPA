import React, { useCallback } from "react";
import Box from "@material-ui/core/Box";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { useAuth } from "../context/AuthContext";

import useInput from "../hooks/useInput";
import useSnackbar from "../hooks/useSnackbar";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    backgroundColor: theme.palette.background.paper,
  },
}));

const Login = () => {
  const styles = useStyles();
  const theme = useTheme();
  const loginWithEmail = useAuth((state) => state.loginWithEmail);
  const loginAdmin = useAuth((state) => state.loginAdmin);
  const email = useInput("");
  const password = useInput("");
  const { Snackbar, showSnackbar } = useSnackbar();

  const handleLogin = useCallback(() => {
    if (email.value === "admin") {
      loginAdmin(password.value);
    } else {
      loginWithEmail({
        email: email.value,
        password: password.value,
      }).catch((e) => {
        showSnackbar(e.message);
      });
    }
  }, [email.value, loginAdmin, loginWithEmail, password.value, showSnackbar]);

  return (
    <Box
      display="flex"
      flex={1}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={2}
      className={styles.container}
    >
      <Typography variant="h4">
        Welcome to{" "}
        <span style={{ color: theme.palette.primary.main, fontWeight: 700 }}>
          {" "}
          Stock-
          <span style={{ color: theme.palette.secondary.main }}>it</span>
        </span>
      </Typography>
      <Box width={360}>
        <TextField
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          placeholder="Enter your email address"
          style={{ margin: "16px 0px" }}
          {...email.bind}
        />
        <TextField
          name="password"
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          placeholder="Enter your password"
          style={{ marginBottom: 16 }}
          {...password.bind}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ height: 44 }}
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
      <Snackbar />
    </Box>
  );
};

export default Login;
