import React from "react";
import { AppBar, Typography, Toolbar } from "@material-ui/core";

const CustomToolbar = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6">Projects Management</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomToolbar;
