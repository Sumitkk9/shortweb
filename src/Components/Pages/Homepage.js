"use client";
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../UI/Header';
import SideDrawer from '../UI/SideDrawer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../../utility/ProtectedRoute';
import Account from './Account';
import VideoCard from '../UI/VideoCard';
import { AlertProvider } from '../UI/Alertui';
import Videopage from './Videopage';
import Channel from './Channel';
import { Apihandlerget } from '../../Apihandler';
import SearchPage from './SearchPage';



const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Homepage() {
    const [videos,setVideo] = React.useState()

   const getVideo = async()=>{
          const response = await Apihandlerget("/video/allvideos")
          setVideo(response)
  
      }

      React.useEffect(()=>{
        getVideo()
      },[])
     
  const theme = useTheme();
  const iSmall = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen((prev)=>!prev);
  };


//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

  return (
    <AlertProvider>
    <Router>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
     <Header 
     handleDrawerOpen={handleDrawerOpen}
     open={open}
     />
    
     <SideDrawer
       open={open}
     />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
    {/* <Header/> */}
      <Routes>
        <Route path='/' element={<VideoCard videos={videos}/>}/>
        <Route path='/watch/:id' element={<Videopage/>}/>
        <Route path='/channel/:username' element={<Channel/>}/>
        <Route path='/search/:input' element={<SearchPage/>}/>
      
        {/* protected route */}
        <Route 
        path='/myaccount' 
        element={
          <ProtectedRoute>
             <Account/>
          </ProtectedRoute>
        }
        />
       </Routes>
  
      </Box>
   
    </Box>
    </Router>
    </AlertProvider>
  );
}