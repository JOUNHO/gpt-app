import { Box, CircularProgress, LinearProgress, Typography } from "@mui/material";
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
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
                                    color="primary"
                                    variant="contained"
                                />
                                :
                                <SmartToyTwoToneIcon 
                                    color="error"
                                    variant="contained"
                                />
                            }         
                                <Typography sx={{fontSize : '18px', fontFamily: "'VT323', monospace", fontWeight:'500', marginLeft:'5px'}}>{chatItem.content}</Typography>
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