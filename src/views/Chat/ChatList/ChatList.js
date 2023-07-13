import { Box, Typography } from "@mui/material";
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
function ChatList(props) {
    const { answer, chatList } = props;
    return (
        <>
            {chatList.map((chatItem) => {
                return (
                    <>
                        
                        <Box sx={{display : 'flex'}}
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
                                
                                <Typography ml->{chatItem.content}</Typography>
                        </Box>
                        <br/>
                    </>
                )
            })}
        </>
    )
}

export default ChatList;