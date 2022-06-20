import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;
  const [selected, setSelected] = useState("Profile");

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    window.alert(`You have successfully logged out`);
    navigate("/");
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          component={RouterLink}
          to="/"
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          Agrishop
        </ListItem>

        <Box key="Store" sx={{ bgcolor: "#004953" }}>
          {/* 2nd half */}
          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText sx={{ color: "#fff" }}>Account</ListItemText>
          </ListItem>

          {/* Settings */}
          <ListItem disablePadding key="Profile">
            <ListItemButton
              selected={"Profile" === selected}
              sx={item}
              onClick={(e) => {
                setSelected("Profile");
                navigate("profile");
              }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider sx={{ mt: 2 }} />

          <ListItem disablePadding key="Orders">
            <ListItemButton
              selected={"Orders" === selected}
              sx={item}
              onClick={(e) => {
                setSelected("Orders");
                navigate("orders");
              }}
            >
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText>Orders</ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider sx={{ mt: 2 }} />

          {/* Logout */}
          <ListItem disablePadding key="Logout">
            <ListItemButton selected={false} sx={item} onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider sx={{ mt: 2 }} />
        </Box>
      </List>
    </Drawer>
  );
}
