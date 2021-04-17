import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const Empty = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex={1}
      padding={2}
    >
      <Typography variant="h4">Under Construction</Typography>
    </Box>
  );
};

export default Empty;
