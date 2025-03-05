import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Skeleton from '@mui/joy/Skeleton';
import Avatar from '@mui/material/Avatar';
import { Button, Stack } from '@mui/material';
import { Apihandlerget,Apihandlerpost } from '../../Apihandler';
import { useNavigate, useParams } from 'react-router-dom';
import { Share } from '@mui/icons-material';
import { useAlert } from "../UI/Alertui";

export default function Videopage() {
const {showAlert } = useAlert()
const params = useParams()
const navigate = useNavigate()
const videoId = params.id || null
const [videoData,setVideoData] = React.useState()
const [loading,setLoading] = React.useState(false)
const [localData,setLocalData] = React.useState(true)
const [subDisabled,setSubDisabled] = React.useState(false)

  React.useEffect(()=>{
    setLocalData(JSON.parse(localStorage.getItem("user")))
    getData()
  },[subDisabled])

  const getData = async ()=>{
    setLoading(true)
    const response = await Apihandlerget(`/video/watch/${videoId}`,true)
    setVideoData(response)
    setLoading(false)
   
  }

  const subsFn = async ()=>{
    setSubDisabled(true)

    const sub = await Apihandlerget(videoData?.subscribed? `/channel/unsubscribe/${videoData?.ownerdetails?._id}` :
      `/channel/subscribe/${videoData?.ownerdetails?._id}`,true)

    if(sub){  
      setSubDisabled(false)
    showAlert(videoData?.subscribed? "Channel Unsubscribed" :"Channel Subscribed",videoData?.subscribed? "error" :"success")
  }
  }
  return (
    <Box component="ul">
    <Box
      component="ul"
      sx={{ display: 'flex',  gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}

    >
      <Card   sx={{ maxWidth:{ xs: "100%", sm: "70%" },minHeight:470, flexGrow: 1 }}>

        <CardCover sx={{zIndex:"10"}}>
        {/* <Skeleton sx={{width:"100%",height:"100%"}} loading={false} /> */}
          <video
            
            controlsList='nodownload'
            controls
            muted
        
            poster={videoData?.thumbnail}
            src = {videoData?.videoFile}
            type="video/mp4"
             autoPlay
          >
          </video> 
        </CardCover>
        
        <CardContent>
        <Typography>
                <Skeleton  loading={false} >
                {videoData?.title}
                </Skeleton>
            </Typography>
        </CardContent>
      </Card>
      

      <Card variant="outlined" sx={{ width: 343, display: 'flex', gap: 2 }}>
      <AspectRatio ratio="21/9">
        <Skeleton variant="overlay">
          <img
            alt=""
            src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
          />
        </Skeleton>
      </AspectRatio>
      <Typography>
        <Skeleton>
          Lorem ipsum is placeholder text commonly used in the graphic, print, and
          publishing industries.
        </Skeleton>
      </Typography>
    </Card>
    
   

    </Box>
    <Card variant="outlined" sx={{ width:"70%", mt:2, gap: 2, }}>
          <Stack direction="row" spacing={2} sx={{
              alignItems:"center",
            
          }}>
            <Avatar
            sx={{
              cursor:"pointer"
            }}
            onClick= {()=>navigate(`/channel/${videoData?.ownerdetails?.username}`)}
             alt= "hello"  
             src= { loading? "": videoData?.ownerdetails?.avatar} >
            <Skeleton loading={loading} />
            </Avatar>
            <Stack direction="column">
            <Typography variant='h3' sx={{
              mb:"0px",
              color:"black"
            }}>
                <Skeleton  loading={loading} >
                @{videoData?.ownerdetails?.username}
                </Skeleton>
            </Typography>

            <Typography variant='h3' sx={{
              fontSize:"0.7rem",
              mt:"-5px"
          
            }}>
                <Skeleton  loading={loading} >
                {videoData?.subscriber} subscribers
                </Skeleton>
            </Typography>
            </Stack>
           
           <Button
           loading={subDisabled}
           loadingPosition='end'
           disabled={subDisabled || videoData?.ownerdetails?._id === localData?._id }
           onClick={()=>subsFn()}
           sx={{
            borderRadius:"50px",
            bgcolor: videoData?.subscribed || videoData?.ownerdetails?._id === localData?._id? "":"#CD201F",
            color:  videoData?.subscribed? "gray":"white",
            maxHeight:"35px",
          
          
           }}
           variant='outlined'
           >
          { videoData?.subscribed? "Unsubscribe" :"subscribe"}
           </Button>
             <Stack direction="column" sx={ {
             float:"right"
             } }>
            <Button startIcon={<Share/>} sx={{
            borderRadius:"50px",
            color:"gray"
            }}>
            Share
            </Button>
            </Stack>
            </Stack>
          
         </Card>
    </Box>
  );
}