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
import { Apihandlerpost,Apihandlerlogout } from "../../Apihandler";
import { Auth } from "../../auth";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import Upload from "../Pages/Upload"
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

const Login = ()=>{
  const {showAlert } = useAlert()
  const [localUser,setLocalUser] = React.useState({})
  const [show,setShow] = useState(false)
    const navigate = useNavigate()
    const [opens, setOpen] = React.useState(false);
    const [openD, setOpenD] = React.useState(false);
    const [disabled,setDisabled] = React.useState(false);
    const [img,setImg] = useState([])

    const [errorMsg, setErrorMsg] = React.useState("");
    useEffect(()=>{
   
      setLocalUser( JSON.parse(localStorage.getItem("user")) )
        if(!Auth()){
            setOpen(true)
        }
    },[openD,show])
    const alerts = (message,varient)=>{
      return 
    }
    const submit = async (e)=>{
            e.preventDefault();
            setDisabled(true)
            let formData = new FormData(e.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
          
           
            if(!show){
              const data = await Apihandlerpost(formJson,"/login")
              setErrorMsg(data.message)
              if(data?.user) {
                showAlert("Welcome back!","success")
                setDisabled(false)
              }else{
                setDisabled(false)
                 showAlert(data.message,"error")
              }
               
            
            }else{
              const data = await Apihandlerpost(formData,"/register")
              console.log(data)
              setErrorMsg(data.message)
              setShow(false)
              setDisabled(false)
              if(data?.username) {
                showAlert("Account created successfully! Welcome aboard!","success")
                setDisabled(false)
                formData={}
              }else{
                showAlert(data.message,"error")              
              }
             
            }
           
            alerts("Account Created",'success')
            if(Auth()){
                setOpen(false)
                setOpenD(false)
                setDisabled(false)
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

    const logout = async()=>{
       const res =  await Apihandlerlogout()
       if(res){
        setOpen(true)
        showAlert("You've successfully logged out! See you next time.","success")
       }
    }
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
      {alerts}
       { opens && <Button sx={{color:"white"}} variant="text" onClick={handleClickOpen}>
        Login
      </Button>}
      <Dialog
        open={openD}
        onClose={handleCancel}
        slotProps={{ paper: {
                component: 'form',
                onSubmit: (e)=> submit(e)
              },
         
        }}
      >
    <Box sx={{ flexGrow: 1 }} margin={5} mb={0}>
      <Grid container sx={{
        boxShadow:"0px 0px 3px 0.50px gray",
        borderRadius:"10px",
        overflow:"hidden",
        bgcolor:"black"
        

      }}>
        <Grid sx={{overflow:"hidden"}} size={6}>
         
          <Button 
           style={{
            background: show? "black" : "  linear-gradient(to right, #0099f7, #f11712)",
            borderRadius:"10px",
              width:"100%",
              color:"white",
              height:"50px"
          }}
          onClick={()=>setShow(false)}
          >
              Login
            </Button>
     
        </Grid>
        <Grid  sx={{overflow:"hidden"}} size={6}>
         
            <Button 
             style={{
              borderRadius:"10px",
              background: show?"  linear-gradient(to right, #0099f7, #f11712)" : "black",
              width:"100%",
              color:"white",
            
              height:"50px"
            }}
            onClick={()=>setShow(true)}
            >
              SignUp
            </Button>
    
        </Grid>
      </Grid>
    </Box>
    { !show && <>   <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            label="Username"
            onChange={()=>setErrorMsg("")}
            type="text"
            fullWidth
            variant="standard"
          />
             <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label= "Password"
            onChange={()=>setErrorMsg("")}
            type="password"
            fullWidth
            variant="standard"
          />
         
        </DialogContent> </>}
        { show && <> <DialogTitle>Signup</DialogTitle>
        <DialogContent>
          <from>
          <TextField
            autoFocus
            required
            margin="dense"
            id="fullName"
            name="fullName"
            label="Full Name"
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
            name="email"
            label="Email"
            onChange={()=>setErrorMsg("")}
            type="email"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            label="Username"
            onChange={()=>setErrorMsg("")}
            type="text"
            fullWidth
            variant="standard"
          />
             <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label= "Password"
            onChange={()=>setErrorMsg("")}
            type="password"
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
           {img.length>0? img[0]?.name : "Upload Avatar" } 
            <VisuallyHiddenInput
              type="file"
              name="avatar"
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
           {img.length>1? img[1]?.name : "Upload Cover Img" } 
            <VisuallyHiddenInput
              type="file"
              name="coverImage"
              onChange={(event) =>{ 
                console.log(img)
                setImg((prev)=>[...prev,img[1] = event.target.files[0]])}}
            />
          </Button>
          </Grid2>
          {/* <label>Cover Image</label>
          <Input
          autoFocus
          required
          type="file"
          margin="dense"
          id="coverImage"
          name="coverImage"
          label= "Cover Image"
          onChange={()=>setErrorMsg("")}
          fullWidth
          variant="standard"
          />  */}
                    </from>
        </DialogContent>        </>}
 
        <div style={{
            marginTop:"0px",
            marginLeft:"10px",
            color:"red"
        }}>
        {/* <span >{errorMsg}</span> */}
        </div>
      
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
          disabled={disabled}
          loading = {disabled}
          loadingPosition="end"
           type="submit"
           > {show? "Signup" :"Login"} 
           </Button>
        
        </DialogActions>
      </Dialog>

      { !opens &&  <div style={{
        display:"flex",
        gap:"10px",
        float:"right",
        alignItems:"center"
      }}>
      <Upload/>
        <Avatar 
        sx={{cursor:"pointer",boxShadow:"1px 0px 2px 0.90px white"}} 
        onClick={handleClick} 
        alt={localUser?.fullName}
        src={localUser?.avatar}
        />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{
          navigate("/myaccount")
          handleClose()
        }}>Profile</MenuItem>
        <MenuItem
         onClick={()=>navigate(`/channel/${localUser?.username}`)}
         >View Your Channel</MenuItem>
        <MenuItem onClick={ ()=>{
          navigate("/")
          logout()
        }} >Logout</MenuItem>
      </Menu></div>}
    </Grid2>
}
export default Login