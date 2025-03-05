import { Box, Grid2, Input, useScrollTrigger } from "@mui/material";
import Grid from '@mui/material/Grid2';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";
import { ApihandlerUpload } from "../../Apihandler";
import { Auth } from "../../auth";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { useAlert } from "../UI/Alertui";


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Upload = ()=>{
    const {showAlert } = useAlert()
  const [localUser,setLocalUser] = React.useState({})
  const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const [opens, setOpen] = React.useState(false);
    const [openD, setOpenD] = React.useState(false);
    const [alert,setAlert] = React.useState(false);
    const [img,setImg] = useState([])

    const [errorMsg, setErrorMsg] = React.useState("");
    useEffect(()=>{
      setLocalUser( JSON.parse(localStorage.getItem("user")) )
        if(!Auth()){
            setOpen(true)
        }
    },[])
  

    const submit = async (e)=>{
            e.preventDefault();
            setLoading(true)
            try {
              const formData = new FormData(e.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const data = await ApihandlerUpload(formData)
              console.log(data)
              if(data) {
                showAlert("Video uploaded successfully!","success")
                setLoading(false)
              }else{
                setLoading(false)
                 showAlert(data.message,"error")
              }
        
              setErrorMsg(data.message)
            } catch (error) {
           console.log(error)
            }
              setOpenD(false)
            if(Auth()){
                setOpen(false)
                setOpenD(false)
            }
          
              
            handleClose();
    }

   
    const handleClickOpen = () => {
        setOpenD(true);
    };
    const handleCancel = () => {
      setOpenD(false);
    };
   
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
      }),
    }));
    return <Grid2>
      <Button 
          sx={{color:"white",borderRadius:"60px"}} 
          variant="outlined" 
          onClick={handleClickOpen}
          startIcon={<AddIcon />}
          >
            Create
          </Button>
      <Dialog
        open={openD}
        onClose={handleCancel}
        slotProps={{ paper: {
                component: 'form',
                onSubmit: (e)=> submit(e)
              },
         
        }}
      >
        <DialogTitle>Upload</DialogTitle>
        <DialogContent>
          <from>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            onChange={()=>setErrorMsg("")}
            type="text"
            fullWidth
            variant="standard"
          />
             <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="description"
            label="Description"
            onChange={()=>setErrorMsg("")}
            type="text"
            fullWidth
            variant="standard"
          />
          <Grid2 container spacing={2}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
           
            startIcon={<CloudUploadIcon />}
          >
           {img.length>0? img[0]?.name : "Video File" } 
            <VisuallyHiddenInput
              type="file"
              name="video"
              onChange={(event) =>{ 
                setImg((prev)=>[...prev,img[0] = event.target.files[0]])
                console.log(img)
              }}
            
            />
          </Button>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
           
            startIcon={<CloudUploadIcon />}
          >
           {img.length>1? img[1]?.name : "Thumbnail" } 
            <VisuallyHiddenInput
              type="file"
              name="thumbnail"
              onChange={(event) =>{ 
                console.log(img)
                setImg((prev)=>[...prev,img[1] = event.target.files[0]])}}
            />
          </Button>
          </Grid2>
                    </from>
        </DialogContent>    
 
        <div style={{
            marginTop:"0px",
            marginLeft:"10px",
            color:"red"
        }}>
        <span >{errorMsg}</span>
        </div>
      
        <DialogActions>
          <Button
        
           onClick={handleCancel}
           >Cancel</Button>
          <Button 
          type="submit"
          loading={loading}
          disabled={loading}
          loadingPosition="end"
          > Upload </Button>
        
        </DialogActions>
      </Dialog>
    </Grid2>
}
export default Upload