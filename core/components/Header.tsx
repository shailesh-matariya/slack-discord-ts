import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginRight: theme.spacing(2),
  // marginLeft: 0,
  width: "100%",
  color: "lightgray",
  // [theme.breakpoints.up("sm")]: {
  marginLeft: "20px",
  // width: 'auto',
  // },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#9ca6b4",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const navItems = ["Home", "Docs"];

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Home</MenuItem>
      <MenuItem onClick={handleMenuClose}>Docs</MenuItem>
      <MenuItem onClick={handleMenuClose}>Join Slack</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Home</MenuItem>
      <MenuItem onClick={handleMenuClose}>Docs</MenuItem>
      <MenuItem onClick={handleMenuClose}>Join Slack</MenuItem>
    </Menu>
  );

  console.log('HEADR');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#1e1e43", boxShadow: "none" }}
      >
        <Toolbar sx={{ Height: 75, padding: 2 }}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: "inline-flex", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton> */}

          <img
            alt="complex"
            src="/assets/images/fleetdm-logo.png"
            height={30}
          />

          {/* <div sx={{ position: "relative" }}> */}
          <Search sx={{ display: { xs: "none", md: "inline-block" } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search messages"
              inputProps={{ "aria-label": "search" }}
              sx={{ color: "#090707", fontSize: "medium" }}
            />
          </Search>

          {/* </div> */}
          <div style={{ marginLeft: "auto", display: "inline-flex" }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "medium",
                  display: { xs: "none", sm: "inline-flex" },
                  ml: 2,
                }}
              >
                {item}
              </Button>
            ))}
          </div>

          <Box sx={{ display: { xs: "none", sm: "inline-flex" }, ml: 2 }}>
            <Button
              spacing={2}
              style={{ display: "inline-flex", backgroundColor: "white" }}
            >
              <img alt="complex" src="/assets/images/slack.png" height={15} />
              <Typography
                sx={{
                  textTransform: "none",
                  ml: 1,
                  fontWeight: "bold",
                  color: "blue",
                  fontSize: "small",
                }}
                noWrap
              >
                Join the conversation
              </Typography>
            </Button>
          </Box>

          <Box
            sx={{
              display: { xs: "inline-flex", sm: "none" },
              ml: { xs: "auto", sm: 2 },
            }}
          >
            <Button
              spacing={2}
              style={{ display: "inline-flex", backgroundColor: "white" }}
            >
              <img alt="complex" src="/assets/images/slack.png" height={15} />
              <Typography
                sx={{
                  textTransform: "none",
                  ml: 1,
                  fontWeight: "bold",
                  color: "blue",
                  fontSize: "small",
                }}
                noWrap
              >
                Join Slack
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
