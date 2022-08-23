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
import Image from "next/image";
import { deepOrange, grey, blue } from "@mui/material/colors";

const Search = styled(Box, {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "myProp",
})(({ theme, myProp }: any) => ({
  backgroundColor: myProp ? "aliceblue" : "white",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  color: grey[100],
  opacity: 0.5,
  "&:hover": {
    opacity: 0.4,
  },
  marginRight: theme.spacing(2),
  width: "100%",
  marginLeft: "20px",
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
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
  // color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("md")]: {
    //   width: "20ch",
    // },
  },
}));

const navItems = ["Home", "Docs"];

const ColorButton = styled(Button)(({ theme }) => ({
  color: blue[600],
  backgroundColor: "white",
  display: "inline-flex",
  width: 280,
  height: 38,
  "&:hover": {
    backgroundColor: grey[100],
  },
}));

const Header = ({ primaryColor }: any) => {
  console.log("color : ", primaryColor);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: primaryColor || grey[800], boxShadow: "none" }}
      >
        <Toolbar sx={{ Height: 75, padding: 2 }}>
          <Image
            alt="complex"
            src="/assets/images/fleetdm-logo.png"
            height={40}
            width={100}
          />

          <Search
            sx={{
              display: { xs: "none", md: "inline-block" },
              // backgroundColor: { primaryColor },
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search messages"
              inputProps={{ "aria-label": "search" }}
              sx={{ fontSize: "medium" }}
            />
          </Search>

          <Box sx={{ marginLeft: "auto", display: "inline-flex" }}>
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
          </Box>

          <ColorButton
            variant="contained"
            sx={{ display: { xs: "none", sm: "inline-flex" }, ml: 3 }}
          >
            <svg
              width="20"
              height="20"
              className="c-nav--footer__svgicon c-slackhash"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386"
                  fill="#097EFF"
                ></path>
                <path
                  d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387"
                  fill="#097EFF"
                ></path>
                <path
                  d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386"
                  fill="#ECB12F"
                ></path>
                <path
                  d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.25m14.336-.001v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.25a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387"
                  fill="#ECB12F"
                ></path>
              </g>
            </svg>
            <Typography
              sx={{
                textTransform: "none",
                ml: 1,
                fontWeight: "bold",
                fontSize: "15px",
              }}
              noWrap
            >
              Join the conversation
            </Typography>
          </ColorButton>

          <Box
            sx={{
              display: { xs: "inline-flex", sm: "none" },
              ml: { xs: "auto", sm: 3 },
            }}
          >
            <ColorButton
              variant="contained"
              sx={{
                display: { sm: "none", xs: "inline-flex" },
                ml: 3,
                width: "auto",
              }}
            >
              <svg
                width="20"
                height="20"
                className="c-nav--footer__svgicon c-slackhash"
                viewBox="0 0 54 54"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386"
                    fill="#097EFF"
                  ></path>
                  <path
                    d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387"
                    fill="#097EFF"
                  ></path>
                  <path
                    d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386"
                    fill="#ECB12F"
                  ></path>
                  <path
                    d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.25m14.336-.001v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.25a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387"
                    fill="#ECB12F"
                  ></path>
                </g>
              </svg>
              <Typography
                sx={{
                  textTransform: "none",
                  ml: 1,
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
                noWrap
              >
                Join Slack
              </Typography>
            </ColorButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
