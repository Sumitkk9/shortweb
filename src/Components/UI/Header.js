import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Login from "../Pages/Login";
import { Grid2, TextField, Button, LinearProgress } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "../../Assests/x.png";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Auth } from "../../auth";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Header = ({ handleDrawerOpen, open, loading }) => {
  const theme = useTheme();
  const iSmall = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  React.useEffect(() => {}, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "black",
        width: iSmall ? "100%" : "50%",
        borderRadius: !iSmall && "50px",
        transform: !iSmall && "translateX(-50%)",
        top: iSmall ? 0 : 5, // Adjust if needed
      }}
      open={open}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Grid2
          sx={{
            width: "100%",
            display: "grid",
            alignItems: "center",
            gridTemplateColumns: iSmall ? "85% 15%" : "75% 25%",
          }}
        >
          {!iSmall && (
            <Grid2
              sx={{
                alignItems: "center",
              }}
            >
              <Grid2
                sx={{
                  alignItems: "center",
                }}
              >
                <TextField
                  id="outlined-basic"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  InputProps={{
                    style: { color: "white" }, // Text color
                  }}
                  sx={{
                    width: "80%",
                    borderRadius: "100px",
                    maxHeight: "50px",
                    overflow: "none",
                    justifyContent: "center",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                      color: "white",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                      color: "white",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                      color: "white",
                    },
                  }}
                />
                {searchText.length > 0 && (
                  <Button
                    sx={{
                      margin: "0px",
                      justifyContent: "center",
                      minWidth: "30px",
                      padding: "5px",
                      borderRadius: "100px",
                      color: "black",
                      marginTop: "8px",
                      bgcolor: "#f0f0f0",
                    }}
                    onClick={() => navigate(`/search/${searchText}`)}
                    style={{}}
                    variant="contained"
                    type="submit"
                  >
                    <SearchIcon />
                  </Button>
                )}
              </Grid2>
            </Grid2>
          )}
          {iSmall && <img src={logo} width={30} alt="logo" />}

          {/* <Typography 
       variant="h6" 
       noWrap 
       component="div">
        <span style={{color:"red"}}>X</span>Tubeo
       </Typography> */}

          <div
            style={{
              width: "100%",
              justifyItems: "right",
            }}
          >
            <Login />
          </div>
        </Grid2>
      </Toolbar>
      {loading && (
        <LinearProgress
          sx={{
            marginRight: "18px",
            marginLeft: "18px",
            borderBottomLeftRadius: "50px",
            borderBottomRightRadius: "50px",
          }}
        />
      )}
    </AppBar>
  );
};
export default Header;
