import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import MediaCover from "../UI/VideoCard";
import { Apihandlerget } from "../../Apihandler";
const SearchPage = ()=>{
    const params = useParams()
    const searchTearms = params.input
    const [searchData,setSearchData] = useState([])
    const fetchVideo = async()=>{
        const response = await Apihandlerget(`/video/s/${searchTearms}`)
        setSearchData(response)
    }
    useEffect(()=>{
        fetchVideo()
       
    },[searchTearms])
    return <> 
    {searchData &&  
    <MediaCover
    videos={searchData}
    />
    }
  
    </>
}
export default SearchPage