import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Apihandlerget } from '../../Apihandler';
import { useEffect,useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MediaCover() {
    const videoRef = useRef(null);
    const navigate = useNavigate()
    const [videos,setVideo] = useState()
    const [play,setPlay] = useState(false)

useEffect(()=>{
    getVideo()
},[])
    const getVideo = async()=>{
        const response = await Apihandlerget("/video/allvideos")
        setVideo(response)

    }
    const handleMouseEnter = () => {
        setPlay(true);
        console.log("play")
       
      };
    
      const handleMouseLeave = () => {
        setPlay(false);
        console.log("stop")
      };
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
            autoPlay
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
            {video.title}
          </Typography>
          <Typography
            level="body-lg"
            textColor="#fff"
            sx={{ fontWeight: 'lg',fontSize:"0.7rem"}}
          >
            {video.createdAt.split("T")[0]}
          </Typography>
        </CardContent>
      </Card>
)}
    </Box>
  );
}