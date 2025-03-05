import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Login from '../Pages/Login';
import { Grid2, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '../../Assests/x.png'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Auth } from '../../auth';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));


const Header = ({handleDrawerOpen,open})=>{
    const theme = useTheme();
    const iSmall = useMediaQuery(theme.breakpoints.down('md'));

 
    React.useEffect(()=>{
     
       

    },[])

    return   <AppBar 
    position="fixed"
    sx={{
      bgcolor: "black",
     width:  iSmall? "100%": "50%",
      borderRadius:!iSmall&&  "50px",
      transform: !iSmall&&  "translateX(-50%)",
      top: iSmall? 0: 5, // Adjust if needed
    }}  open={open}>
     <Toolbar
     >
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
       <Grid2 sx={{width:"100%",
         display:"grid",
         alignItems:"center",
         gridTemplateColumns: iSmall?"85% 15%":"75% 25%"}}>
           {   !iSmall &&  <Grid2>
          
            <TextField 
              id="outlined-basic" 
              placeholder= "Search"
              InputProps={{
                style: { color: 'white' } // Text color
              }}
           
              sx={{
              
                width:"95%",
                borderRadius:"100px",
                maxHeight:"50px",
                overflow:"none",
                justifyContent:"center",
                '& .MuiOutlinedInput-notchedOutline': { border: 'none', color:"white" }, 
                '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none', color:"white" },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none', color:"white" },

               
              }}
              />
            </Grid2>}
           {   iSmall && <img src={logo} width={30} alt='logo' />}
            
       {/* <Typography 
       variant="h6" 
       noWrap 
       component="div">
        <span style={{color:"red"}}>X</span>Tubeo
       </Typography> */}
       
       <div style={{
        width:"100%",
        justifyItems:"right"

      }}>  
         <Login/>
          </div>
       </Grid2>
     </Toolbar>
   </AppBar>
}
export default Header