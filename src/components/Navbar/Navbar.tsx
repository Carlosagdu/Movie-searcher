import * as React from "react";
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
import TvIcon from "@mui/icons-material/Tv";
import TheatersIcon from '@mui/icons-material/Theaters';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const drawerWidth = "240px";

interface PrimaryNavBarProps {
  children: React.ReactNode;
}

const PermanentDrawerLeft: React.FC<PrimaryNavBarProps> = ({ children }) => {
  const returnIcon = (text: string) => {
    switch(text){
      case "Home":
        return <DashboardIcon/>
      case "Movies": 
      return <TheatersIcon />
      case "TV Series":
        return <TvIcon />
      case "Bookmarks":
        return <BookmarkIcon/>
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Movie app
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Home", "Movies", "TV Series", "Bookmarks"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{returnIcon(text)}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ p: 3, maxWidth: `calc(100vw - ${drawerWidth})` }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default PermanentDrawerLeft;
