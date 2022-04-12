import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { arrNavLinks } from "../../constants";
import { NavLink } from "../common/NavLink";

export const Navigation = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        {arrNavLinks.map((objLink) => (
          <NavLink key={objLink.strId} href={objLink.strPathname}>
            {objLink.strName}
          </NavLink>
        ))}
      </Toolbar>
    </AppBar>
  </Box>
);
