import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/actionReducer/user";
import cookie from "react-cookies";
import { Box, MenuItem } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    // flexGrow: 1,
    color: "white",
  },
  flex_start: {
    // color: 'white',
    // flexGrow: 100,
  },
}));

export default function Admin() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    cookie.remove("access_token");
    dispatch(logoutUser());
  };
  const handleThongke = () => {
    navigate("thong-ke");
  };
  const handleStore = () => {
    navigate("add-store");
  };
  const handleMenu = () => {
    navigate("add-menu");
  };

  const handleDish = () => {
    navigate("add-dish");
  };

  const handleAccount = () => {
    navigate("add-user")
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Typography variant="h6" color="inherit">
            SikiFood
            </Typography>
            <MenuItem style={{ marginLeft: 50 }}>
              <Typography onClick={handleThongke} color="inherit">
                Thống Kê
              </Typography>
            </MenuItem>
            <MenuItem style={{ marginLeft: 50 }}>
              <Typography onClick={handleStore} color="inherit">
                Quản lí cửa hàng
              </Typography>
            </MenuItem>
            <MenuItem style={{ marginLeft: 50 }}>
              <Typography onClick={handleMenu} color="inherit">
                Quản lí Menu
              </Typography>
            </MenuItem>
            <MenuItem style={{ marginLeft: 50 }}>
              <Typography onClick={handleAccount} color="inherit">
                Quản lí tài khoản
              </Typography>
            </MenuItem>
            <MenuItem style={{ marginLeft: 50 }}>
              <Typography onClick={handleDish} color="inherit">
                Quản lí món ăn
              </Typography>
            </MenuItem>
          </Box>
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
