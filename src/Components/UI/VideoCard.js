import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Apihandlerget } from '../../Apihandler';
import { useEffect,useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Stack } from '@mui/material';

export default function MediaCover({videos,avatar,username}) {
    const videoRef = useRef(null);
    const navigate = useNavigate()

    const [play,setPlay] = useState(false)
  
  return (
    <Box
   
      component="ul"
      sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0, cursor:"pointer" }}
    >
       
        {videos && videos.map((video)=> <Card 
       onClick={()=>navigate(`/watch/${video?._id}`)}
        key={video._id}
        component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardCover >
      
          <video
          ref={videoRef}
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
            autoPlay={username? false:true}
            playsInline
            loop
            muted
            poster={video.thumbnail}
          > 
          <source
            src={video.videoFile}
            type="video/mp4"
          />
          </video>
        </CardCover>
        <CardContent>
          
          <Typography
            level="body-lg"
            textColor="#fff"
            sx={{ fontWeight: 'lg', mt: { xs: 12, sm: 18 } }}
          >
            {(video?.title).slice(0,40)}{video?.title.length>40 &&"..."}
          </Typography>
          
        
          <Stack direction={"row"} sx={{alignItems:"center",zIndex:10}} spacing={2}>
          <Avatar 
          onClick={(e)=>{
            e.stopPropagation();
            navigate(`/channel/${video?.ownerdetails.username}`)
          }} 
          alt='hello' 
          src={video?.ownerdetails?.avatar || avatar} />
          <Stack direction={"column"}>
          <Typography
           onClick={(e)=>{
            e.stopPropagation();
            navigate(`/channel/${video?.ownerdetails.username}`)
          }} 
            level="body-lg"
            textColor="#fff"
            sx={{ fontWeight: 'lg',fontSize:"0.8rem"}}
          >
            @{video?.ownerdetails?.username || username}
          </Typography>
          <Typography
            level="body-lg"
            textColor="#fff"
            sx={{ fontWeight: 'lg',fontSize:"0.6rem"}}
          >
            {video.createdAt.split("T")[0]} · {video?.views} Views
          </Typography>
          </Stack>
         
          </Stack>
        
        </CardContent>
      </Card>
)}
    </Box>
  );
}