import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import ChatList from './ChatList/ChatList';
import SendIcon from '@mui/icons-material/Send';
import ChatInput from './ChatInput/ChatInput';


function Chat(props) {
  const {isChatOpen, setIsChatOpen} = props;

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chatList, setChatList] = useState([]);
  
  console.log(question);
  const handleChatClose = () =>{
    setIsChatOpen((false));
  }
  return(
    <Dialog
        open={isChatOpen}
        onClose={handleChatClose}
        scroll="paper"
        aria-labelledby="scroll-dialo
        g-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="scroll-dialog-title">
        <Button variant="outlined" disabled startIcon={<SendIcon />}>back</Button >
        </DialogTitle>
        <DialogContent dividers={true}>
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
              ></ChatList>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ChatInput setQuestion={setQuestion}
                     question={question}
                     chatList={chatList}
                     setChatList={setChatList}
                     setAnswer={setAnswer}>
          </ChatInput>
        </DialogActions>
      </Dialog>
  );
}
export default Chat;