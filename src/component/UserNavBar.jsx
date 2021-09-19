import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { toast } from "react-toastify";
import { NavLink, useLocation } from "react-router-dom";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  Tooltip,
  useMediaQuery,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import LockIcon from "@material-ui/icons/Lock";
import Drawer from "./Drawer";

const useStyles = makeStyles((theme) => ({
  icons: {
    // marginLeft: theme.spacing(1),
  },
  icon: {
    color: theme.palette.primary.paper,
    marginRight: theme.spacing(3),
  },
  purple: {
    backgroundColor: theme.palette.primary.main,
  },
  nav: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#6d1b7b",
  },
  auth_title: {
    marginLeft: theme.spacing(3),
    color: "#fff",
  },
  primary: {
    fontWeight: "400",
    marginLeft: theme.spacing(4),
  },
  indicator: {
    backgroundColor: "cyan",
    // marginLeft: theme.spacing(2.5),
    maxWidth: theme.spacing(0),
  },
  wrapper: {
    fontFamily: "Roboto",
    fontSize: theme.spacing(2.2),
    color: "#000",
    textTransform: "capitalize",
  },
  auth_link: {
    color: "#000",
  },
  menu: {
    color: "#000",
  },
  mobile_nav: {
    display: "flex",
  },
  mobile_auth_title: {
    marginLeft: theme.spacing(2),
  },
  mobile_icon: {
    marginRight: theme.spacing(1),
  },
  mobile_header1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mobile_header2: {
    padding: theme.spacing(0, 1),
  },
  mobile_indicator: {},
  mobile_menu: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  mobile_auth_link1: {
    maxWidth: theme.spacing(5),
  },
  mobile_wrapper: {
    fontFamily: "Roboto",
    fontSize: theme.spacing(2),
    color: "#fff",
    textTransform: "capitalize",
  },
  account_name: {
    fontWeight: "450",
    fontSize: theme.spacing(2.2),
  },
}));

export default function UserNavBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (location.pathname === "/") {
      setValue(0);
    } else if (location.pathname === "/employees") {
      setValue(1);
    } else if (location.pathname === "/designations") {
      setValue(2);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("loginUser");
    props.logout();
    window.location.href = "/login";
    toast.success("Logged out successfully!, Comeback later :)", {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
    });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <List className={classes.profile_container}>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.purple}>N</Avatar>
          </ListItemAvatar>
          <ListItemText
            classes={{ primary: classes.account_name }}
            primary="Nithin Raj"
            secondary="nithin@gmail.com"
          />
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem>
          <PersonIcon />
          <ListItemText
            classes={{ primary: classes.primary }}
            primary="My Account"
          ></ListItemText>
        </ListItem>
        <ListItem>
          <SettingsIcon />

          <ListItemText
            classes={{ primary: classes.primary }}
            primary="Settings"
          ></ListItemText>
        </ListItem>
        <ListItem onClick={handleLogout}>
          <LockIcon />
          <ListItemText
            classes={{ primary: classes.primary }}
            primary="Logout"
          ></ListItemText>
        </ListItem>
      </List>
    </Menu>
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const activeStyle = {
    backgroundColor: "#d1c4e9",
  };

  const isDesktop = useMediaQuery("(min-width:730px)");

  return (
    <>
      {isDesktop ? (
        <AppBar position="fixed" className={classes.nav}>
          <Typography variant="h6" className={classes.auth_title}>
            Admin Template
          </Typography>
          <Tabs
            classes={{ indicator: classes.indicator }}
            className={classes.menu}
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            centered
          >
            <Tab
              className={classes.auth_link}
              classes={{ wrapper: classes.wrapper }}
              component={NavLink}
              exact
              to="/"
              activeStyle={activeStyle}
              label="Home"
              disableRipple
            />
            <Tab
              className={classes.auth_link}
              classes={{ wrapper: classes.wrapper }}
              component={NavLink}
              exact
              to="/employees"
              activeStyle={activeStyle}
              label="Employees"
              disableRipple
            />
            <Tab
              className={classes.auth_link}
              classes={{ wrapper: classes.wrapper }}
              component={NavLink}
              exact
              to="/designations"
              activeStyle={activeStyle}
              label="Designations"
              disableRipple
            />
          </Tabs>
          <IconButton
            className={classes.icon}
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Tooltip title="Profile" interactive>
              <AccountCircle />
            </Tooltip>
          </IconButton>
        </AppBar>
      ) : (
        <Drawer />
      )}
      {renderMenu}
    </>
  );
}
