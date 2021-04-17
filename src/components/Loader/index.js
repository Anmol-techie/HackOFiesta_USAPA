import React from "react";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";

const Loader = ({ minHeight = "100vh", className }) => {
  return (
    <Box
      display="flex"
      flex={1}
      minHeight={minHeight}
      justifyContent="center"
      alignItems="center"
      className={className}
    >
      <CircularProgress />
    </Box>
  );
};

Loader.propTypes = {
  minHeight: PropTypes.number,
  className: PropTypes.string,
};

export default Loader;
