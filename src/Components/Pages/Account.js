
import { Button, Grid2, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Apihandlerget, Apihandlerpost } from "../../Apihandler";
import { useAlert } from "../UI/Alertui";

const Account = ()=>{
    const user = JSON.parse(localStorage.getItem("user"))
      const {showAlert } = useAlert()
      const [loading,setLoading] = useState(false)
    
    const [formData,setFormdata] = useState({
        fullName: "",
        email: "",
    })
    useEffect(()=>{
        setFormdata({...formData, 
            fullName : user.fullName,
            email:  user.email

        })
        
    },[setFormdata])

    
    const handleChange  = (e)=>{
        setFormdata({...formData,[e.target.name]:e.target.value})
    }
    const onUpdate = async (e)=>{
        setLoading(true)
        e.preventDefault()
        const response = await Apihandlerpost(formData,"/update-user",true)
       console.log(response)
        if(response?.user){
            showAlert("Updated successfully!","success")
            setLoading(false)
        }else{
            showAlert(response?.message,"error")
            setLoading(false)
        }
    }

    return <Grid2>
       <Typography variant="h2" >
        Profile
       </Typography>
 
       <form >
       <Grid2 
       sx={{display:"grid",
        width:"40%",
        gap:"10px"
       }}
       >
       <TextField
        type="text"
        variant="outlined"
        label="Full Name"
        name="fullName"
        defaultValue={formData.fullName}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
        />
        <TextField
        type="text"
        variant="outlined"
        defaultValue={formData.email}
        label="Email"
        name="email"
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        

        required
        />
          <Button
          sx={{
            maxWidth:"100px",
            float:"right"
          }}
           type="submit"
           variant="contained"
           loading={loading}
           disabled={loading}
           loadingPosition="end"
           onClick={(e)=>onUpdate(e)}
           > Update </Button>

       </Grid2>
      
       </form>
    </Grid2>
}

export default Account