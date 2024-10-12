import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import TvIcon from "@mui/icons-material/Tv";
import TheatersIcon from "@mui/icons-material/Theaters";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";

const drawerWidth = "240px";

interface PrimaryNavBarProps {
  children: React.ReactNode;
}
const menuOptions = [
  {
    title: "Home",
    endpoint: "/",
  },
  { title: "Movies", endpoint: "/movies" },
  { title: "TV Series", endpoint: "/tv-series" },
  { title: "Bookmarks", endpoint: "/bookmarks" },
];

const PermanentDrawerLeft: React.FC<PrimaryNavBarProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const returnIcon = (text: string) => {
    switch (text) {
      case "Home":
        return <DashboardIcon />;
      case "Movies":
        return <TheatersIcon />;
      case "TV Series":
        return <TvIcon />;
      case "Bookmarks":
        return <BookmarkIcon />;
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  width: "fit-content",
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Michiflix 🐱{" "}
              <Typography variant="body1" noWrap component="span">
                - Movie searcher built using react.js
              </Typography>
            </Typography>
          </Box>

          <Typography pt={"5px"} ml={1} variant="body2">
            ~ For my loved one Marianela 💝
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
          },
        }}
        onClose={toggleDrawer(false)}
        open={open}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }} onClick={toggleDrawer(false)}>
          <List>
            {menuOptions.map((menu, index) => (
              <Link
                key={index}
                style={{ textDecoration: "none", color: "inherit" }}
                to={menu.endpoint}
              >
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{returnIcon(menu.title)}</ListItemIcon>
                    <ListItemText primary={menu.title} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ p: 3, width: `100%` }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default PermanentDrawerLeft;
