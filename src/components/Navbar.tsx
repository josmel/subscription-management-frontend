import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  CssBaseline,
  Typography,
  Box,
  IconButton,
  Divider,
  Tooltip,
  Switch,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MenuIcon from "@mui/icons-material/Menu";
import BarChartIcon from "@mui/icons-material/BarChart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";

const drawerWidth = 240;
const collapsedWidth = 70;

const Sidebar: React.FC = () => {
  const { toggleTheme, isDarkMode } = useThemeContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Subscribers", icon: <PeopleIcon />, path: "/subscribers" },
    { text: "Plans", icon: <BarChartIcon />, path: "/plans" },
    { text: "Reports", icon: <ReceiptIcon />, path: "/reports" },
    { text: "Transactions", icon: <BarChartIcon />, path: "/transactions" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  const handleLogout = () => {
    // Clear authentication tokens or context
    localStorage.removeItem("authToken");
    // Redirect to login page
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: isDarkMode ? "primary.dark" : "primary.main",
          transition: "width 0.3s",
        }}
      >
        <Toolbar>
          {/* Sidebar Collapse Button */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setCollapsed(!collapsed)}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Subscription Manager
          </Typography>

          {/* Dark/Light Theme Switch */}
          <Box
            sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
          >
            <Typography variant="body2" sx={{ marginRight: 1 }}>
              {isDarkMode ? "Dark" : "Light"}
            </Typography>
            <Switch checked={isDarkMode} onChange={toggleTheme} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: collapsed ? collapsedWidth : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: collapsed ? collapsedWidth : drawerWidth,
            transition: "width 0.3s",
            overflowX: "hidden",
            boxSizing: "border-box",
            bgcolor: isDarkMode ? "background.paper" : "background.default",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={NavLink}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                "&.active": {
                  backgroundColor: isDarkMode
                    ? "primary.light"
                    : "primary.main",
                  color: "white",
                  "& .MuiListItemIcon-root": { color: "white" },
                },
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              <Tooltip
                title={collapsed ? item.text : ""}
                placement="right"
                arrow
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === item.path
                        ? "white"
                        : "text.secondary",
                    minWidth: collapsed ? 0 : 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              </Tooltip>
              {!collapsed && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
        <Divider />

        {/* Logout Button */}
        <List>
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              justifyContent: collapsed ? "center" : "flex-start",
            }}
          >
            <Tooltip title={collapsed ? "Logout" : ""} placement="right" arrow>
              <ListItemIcon
                sx={{
                  color: "text.secondary",
                  minWidth: collapsed ? 0 : 40,
                }}
              >
                <ExitToAppIcon />
              </ListItemIcon>
            </Tooltip>
            {!collapsed && <ListItemText primary="Logout" />}
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          color: "text.primary",
          p: 3,
          ml: collapsed ? collapsedWidth : drawerWidth,
          transition: "margin-left 0.3s",
        }}
      >
        <Toolbar />
        {/* Your main content will be rendered here */}
      </Box>
    </Box>
  );
};

export default Sidebar;
