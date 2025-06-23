import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { NavLink, useNavigate } from "react-router";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LockIcon from "@mui/icons-material/Lock";
import { auth } from "~/root";

import { signOut } from "firebase/auth";

export default function Header() {
  let navigate = useNavigate();
  const user = auth.currentUser;

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        return navigate("/signin");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const drawerList_SignedIn = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem key="admin" disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/admin");
            }}
          >
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItemButton>
        </ListItem>
        <ListItem key="profile" disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/profile");
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem key="settings" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const drawerList_SignedOut = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem key="signin" disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/signin");
            }}
          >
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText>Sign in</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

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
              onClick={() => {
                setDrawerOpen(true);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerList_SignedIn}
            </Drawer>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <NavLink to="/">Race Strategy App</NavLink>
            </Typography>
            <Box>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="small"
                  onClick={handleSignOut}
                >
                  <Typography fontSize="small">Sign out</Typography>
                </Button>
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
              onClick={() => {
                setDrawerOpen(true);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerList_SignedOut}
            </Drawer>
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
