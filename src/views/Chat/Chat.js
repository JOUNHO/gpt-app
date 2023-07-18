import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef, useState } from 'react';
import ChatList from './ChatList/ChatList';
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';
import ChatInput from './ChatInput/ChatInput';


function Chat(props) {
  const {isChatOpen, setIsChatOpen} = props;

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chatList, setChatList] = useState([]);
  const [isSpinner, setIsSpinner] = useState(false);

  const  dialogContentRef = useRef();
  
  console.log(question);
  const handleChatClose = () => {
    setIsChatOpen((false));
  }
  const handleOnReset = () => {
    setChatList([]);
  }
  return(
    <Dialog
        open={isChatOpen}
        onClose={handleChatClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
        sx={{
          borderRadius:'100px'
        }}
      >
        <DialogTitle id="scroll-dialog-title">
        <Button sx={{backgroundColor: '#e9ecef', 
                    color: '#495057',
                    width: '12px',
                    height: '30px',
                    fontSize: '12px',
                    textTransform:'none',
                    '&:hover': {
                      backgroundColor: '#e9ecef',
                      opacity: [0.9, 0.8, 0.7],
                      },}} 
                      variant="contained"
                      startIcon={<RefreshIcon sx={{marginRight:'-6px', fontSize:'15px'}}/>}
                      onClick={handleOnReset}
                      
                      >Reset</Button >
        </DialogTitle>
        <DialogContent dividers={true}
                       ref={dialogContentRef}
                       sx={{borderTop:'none'}}
        >
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
            minWidth="800px"
            maxWidth="800px"
            minHeight="250px"
            maxHeight="500px"
          >
              <ChatList answer={answer}
                        chatList={chatList}
                        isSpinner={isSpinner}
              ></ChatList>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{'display':'block'}}>
          <ChatInput setQuestion={setQuestion}
                     question={question}
                     chatList={chatList}
                     setChatList={setChatList}
                     setAnswer={setAnswer}
                     setIsSpinner={setIsSpinner}
                     dialogContentRef={dialogContentRef}
                     >
          </ChatInput>
        </DialogActions>
      </Dialog>
  );
}
export default Chat;