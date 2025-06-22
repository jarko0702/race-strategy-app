import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { NavLink } from "react-router";
import { auth } from "../root";

const user = auth.currentUser;

export default function Header() {
  if (user !== null) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <NavLink to="/">Race Strategy App</NavLink>
            </Typography>
            <Box>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Typography>Profile</Typography>
              </Box>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Typography>Sign out</Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <NavLink to="/">Race Strategy App</NavLink>
            </Typography>
            <NavLink to="/signin">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Sign in
              </Typography>
            </NavLink>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
