import { Box, Chip, CircularProgress, Divider, LinearProgress, Typography } from "@mui/material";
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useEffect, useState } from "react";
function ChatList(props) {
    const { answer, chatList, isSpinner } = props;
    const [urlList,setUrlList] = useState([]);

    const handleOnSendUrl  = (url) => {
        console.log(url);
        window.open(url);
    }
    return (
        <>
            {chatList.map((chatItem) => {
                return (
                    <>
                        <Divider sx={{marginBottom:"15px"}}><Chip sx={{fontSize:"12px"}} label={chatItem.insertTime}></Chip></Divider>
                        <Box sx={{display : 'flex',flexWrap: "wrap", whiteSpace : 'pre-line',}} 
                        >
                            {chatItem.sender === "user" ? 
                                <PersonOutlineSharpIcon 
                                    color="black"
                                    variant="contained"
                                    sx={{border:'solid 1.8px', borderRadius:'7px',padding:'2px'}}
                                />
                                :
                                <AutoAwesomeIcon 
                                    color="#91a7ff"
                                    variant="contained"
                                    sx={{border:'solid 1.8px', borderRadius:'7px',padding:'2px', color:'#edf2ff', backgroundColor:'#228be6', boxShadow:'5'}}
                                />
                            }   
                                <Typography sx={{fontSize : '15px', fontFamily: "'VT323', monospace", fontWeight:'500', marginLeft:'10px', width:"95%"}}>{chatItem.content}</Typography>
                                    {chatItem.urlList.length > 0 ?
                                        <>
                                        <Typography sx ={{width:"100%" ,marginTop : "20px"}}>참고자료</Typography>
                                        {chatItem.urlList.map((url) => {
                                            return <Box
                                                        component="span"
                                                        sx={{
                                                            backgroundColor: '#e9ecef',
                                                            fontSize :"13px",
                                                            marginLeft:"4px",
                                                            marginTop:"20px",
                                                            padding:"7px",
                                                            borderRadius: 2,
                                                            '&:hover': {
                                                            backgroundColor: '#ced4da',
                                                            opacity: [0.9, 0.8, 0.7],
                                                            cursor: "pointer"
                                                            },
                                                            
                                                        }}
                                                        onClick ={() => {handleOnSendUrl(url)}}
                                                    >
                                                        {url}
                                                    </Box>
                                        })}
                                        </>
                                        :
                                        null
                                        }
                        </Box>
                        
                        <br/>
                    </>
                )
            })}
            {
                isSpinner &&
                <Box sx={{textAlign:"center"}}>
                    <CircularProgress />
                    <Typography sx={{fontSize : '12px'}}>Searching documentation. this may take a seond!</Typography>
                </Box>
            }
            
        </>
    )
}

export default ChatList;