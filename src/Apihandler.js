import axios from "axios";

export const Apihandlerpost = async(formdata,mainurl,head)=>{
    const token = localStorage.getItem("accessToken");
    try {
        const response = await axios.post('http://localhost:3000/api/v1/users'+mainurl,formdata,  { 
             headers: head && {
            Authorization:`Bearer ${token}`,
          },
        })
    const data =  response.data.data
   
    const errdata =  response
    if(data?.accessToken){
        localStorage.setItem("accessToken", data.accessToken)
        localStorage.setItem("user", JSON.stringify(data.user))
    }
    if(data?.user){
        console.log(data.user)
            localStorage.setItem("user", JSON.stringify(data.user))
    }
        return  data
    } catch (error) {
        console.log("error whole sending data",error)
        return error.response.data
    }
}

export const Apihandlerget = async(mainurl,head)=>{
    const token = localStorage.getItem("accessToken");

    try {
        const response = await axios.get('http://localhost:3000/api/v1' + mainurl, { 
            headers: head ? { Authorization: `Bearer ${token}` } : {},
        });
    const data =  response.data.data
     return  data
    } catch (error) {
        console.log("error whole sending data",error)
        return error.response.data
    }
}

export const Apihandlerlogout = async()=>{
    const token = localStorage.getItem("accessToken");
    try {
        const response = await axios.post('http://localhost:3000/api/v1/users/logout',{}, { 
        headers: {
        Authorization:`Bearer ${token}`,
      },
    })
    const data =  response.data.success
    if(data){
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user")
    }
  
    console.log(data)
        return  data
    } catch (error) {
        console.log("error whole sending data",error)
    }
}

export const ApihandlerUpload = async(formdata)=>{
    const token = localStorage.getItem("accessToken");
    try {
        const response = await axios.post('http://localhost:3000/api/v1/video/video-upload',formdata, { 
        headers: {
        Authorization:`Bearer ${token}`,
      },
    })
    const data =  response.data.success
        return  data
    } catch (error) {
        console.log("error whole sending data",error)
    }
}

