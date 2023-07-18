import { Box, Chip, CircularProgress, Divider, LinearProgress, Typography } from "@mui/material";
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
function ChatList(props) {
    const { answer, chatList, isSpinner } = props;
    return (
        <>
            {chatList.map((chatItem) => {
                return (
                    <>
                        <Box sx={{display : 'flex', whiteSpace : 'pre-line',}} 
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
                                <Typography sx={{fontSize : '15px', fontFamily: "'VT323', monospace", fontWeight:'500', marginLeft:'10px'}}>{chatItem.content}</Typography>
                        </Box>
                        <Divider sx={{marginTop:"15px"}}><Chip sx={{fontSize:"12px"}} label={chatItem.insertTime}></Chip></Divider>
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