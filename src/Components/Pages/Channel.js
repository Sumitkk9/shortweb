import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Apihandlerget, Apihandlerpost } from '../../Apihandler';
import { useEffect,useState,useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { AspectRatio, Sheet } from '@mui/joy';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import VideoCard from '../UI/VideoCard';

export default function Channel() {

    const videoRef = useRef(null);
    const params = useParams()
    const [videos,setVideo] = useState()
    const [play,setPlay] = useState(false)
    const username = params.username || null
    const localData =  JSON.parse(localStorage.getItem("user"))

    useEffect(()=>{ 
        getVideo()
    },[username])
    const getVideo = async()=>{

        const response = await Apihandlerpost({},`/channel/${username}`,true)
        setVideo(response)
        

    }
    console.log(videos)
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <Box
   
      component="ul"
      sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0, cursor:"pointer" }}
    >
       
       <Card 
        component="li" sx={{ height: 250, flexGrow: 1 }}>
        <CardCover >
            <img src={videos?.coverImage} alt='coverimg'/>
        </CardCover>
        <CardContent>
        <Card
        orientation="horizontal"
        sx={{
          width: '40%',
         
         
          // make the card resizable for demo
        
          resize: 'horizontal',
          height:"100px"
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182,boxShadow:"0px 0px 5px 0.10px gray" }}>
          <img
            src={videos?.avatar}
            
            // loading="lazy"
            alt=""
          />
        </AspectRatio>
        <CardContent>
          <Typography sx={{ fontSize: 'xl', fontWeight: 'lg' }}>
           @{videos?.username}
          </Typography>
          <Typography
            level="body-sm"
            textColor="text.tertiary"
            sx={{ fontWeight: 'lg' }}
          >
            {videos?.createdAt.split("T")[0]}
          </Typography>
          <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                Videos
              </Typography>
              <Typography sx={{ fontWeight: 'lg' }}>{videos?.allvideos.length}</Typography>
            </div>
            <div>
              <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                Subscriber
              </Typography>
              <Typography sx={{ fontWeight: 'lg' }}>{videos?.subscribersCount}</Typography>
            </div>
            <div>
              <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                Subscribed
              </Typography>
              <Typography sx={{ fontWeight: 'lg' }}>{videos?.channelSubscribedTo}</Typography>
            </div>
          </Sheet>
          <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            <Button variant="contained" >
              subscribe
            </Button>
           
          </Box>
        </CardContent>
      </Card>
        </CardContent>
      </Card>
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Videos" value="1" />
            <Tab label="Posts" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {<VideoCard videos={videos?.allvideos} avatar={videos?.avatar} username={videos?.username}/>}
          </TabPanel>
        <TabPanel value="2">Coming soon</TabPanel>
      </TabContext>
    </Box>
    </Box>
  );
}