import React, { useEffect, useState } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/actionReducer/user";
import cookie from "react-cookies";
import ListCategory from "./ListCategory";

const useStyles = makeStyles((theme) => ({
  appbarwhite: {
    color: "#020303",
    backgroundColor: "#fff",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    cursor: "pointer",
  },
  titlea: {
    position: "relative",
    textDecoration: "none",
    color: "#020303",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "80%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar({}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const { isLogin, user } = useSelector((state) => state.userReducer);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [isHovering, setIsHovering] = useState(false);
  const [scrolled, setScrolled] = useState(document.documentElement.scrollTop);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shoppingCard = useSelector((state) => state.shoppingCart);

  // console.log(anchorEl)
  function handleCount() {
    const _count = shoppingCard.products.length;
    return _count;
  }

  const handleMouseOver = () => {
    if (scrolled > 300) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
    setScrolled(document.documentElement.scrollTop);
    console.log(isHovering);
    console.log(document.documentElement.scrollTop);
  };

  const handleMouseOut = () => {
    setTimeout(() => {
      setIsHovering(false);
    }, 500);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    navigate("/login");
  };
  const handleLogoutMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    // navigate('/login')
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const search = (event) => {
    event.preventDefault();
    // navigate(`menu/?q=${q}`);
  };

  const HandleShoppingCard = () => {
    navigate("/shopping-card");
  };
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    dispatch(logoutUser());
    handleMenuClose();
  };

  const handleSikiFood = () => {
    navigate("/");
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
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} overlap="rectangular" color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>ShoppingCartIcon</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge overlap="rectangular" badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const data = user;
  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appbarwhite}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onMouseOver={handleMouseOver}
          >
            <MenuIcon className="show-menu" />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <a className={classes.titlea} onClick={handleSikiFood}>
              SikiFood
            </a>
          </Typography>
          <Form className="d-flex" onSubmit={search}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onSubmit={search}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={q}
                onChange={(event) => setQ(event.target.value)}
                type="search"
              />
            </div>
          </Form>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              onClick={HandleShoppingCard}
            >
              <Badge
                badgeContent={handleCount()}
                overlap="rectangular"
                color="secondary"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {!isLogin ? (
              <IconButton onClick={handleProfileMenuOpen} color="inherit">
                <AccountCircle />
              </IconButton>
            ) : (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleLogoutMenuOpen}
                color="inherit"
              >
                <div>{data.username}</div>
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      {isHovering && (
        <div style={{ marginLeft: 120 }} onMouseLeave={handleMouseOut}>
          <ListCategory />
        </div>
      )}
    </div>
  );
}
