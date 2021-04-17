import React, { useState, useCallback, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";

const useSnackbar = (props) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState(null);

  const handleSnackbarDismiss = useCallback(() => {
    setSnackbarVisible(false);
    setSnackbarContent(null);
  }, []);

  useEffect(() => {
    if (snackbarContent) {
      setSnackbarVisible(true);
    }
  }, [snackbarContent]);

  const renderSnackbar = useCallback(
    (overrideProps) => (
      <Snackbar
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        autoHideDuration={6000}
        {...props}
        {...overrideProps}
        open={snackbarVisible}
        message={snackbarContent}
        onClose={handleSnackbarDismiss}
      />
    ),
    [props, snackbarVisible, handleSnackbarDismiss, snackbarContent]
  );

  return {
    Snackbar: renderSnackbar,
    showSnackbar: setSnackbarContent,
  };
};

export default useSnackbar;
