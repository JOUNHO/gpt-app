import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button/index.js';
import Chat from './views/Chat/Chat.js';
import Header from './views/Template/Header/index';



function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [answer, setAnswer] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSetting = (e) => {
    e.preventDefault()
    fetch('http://localhost:3001/setting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({question})
    })
    .then((res) => res.json())
    .then((data) => {
      setResponse(data.message);
    })
  }

  const handleQuestion = async(e) => {
    // console.log("langchain실행");
    // const loader = new TextLoader("src/document_loaders/test/example.txt");
    // const docs = await loader.load();
    // console.log(docs);
    e.preventDefault()
    fetch('http://localhost:3001/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({question})
    })
    .then((res) => res.json())
    .then((data) => setAnswer(data.message.text))
  }

   const handleSummarization = (e) => {
    e.preventDefault()
    fetch('http://localhost:3001/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })
    .then((res) => res.json())
  }

  const handleChatOpen = (isOpen) => {
    setIsChatOpen(isOpen);
  }



   
  return (
    <div className='App'>
      <div>
        <Header setIsChatOpen={setIsChatOpen}></Header>
      </div>
      <div>
        <Chat isChatOpen={isChatOpen}
              setIsChatOpen={setIsChatOpen}
        ></Chat>
      </div>
        <Button variant="white" onClick={handleSetting}>setting</Button>
      <div>
        <div>{response}</div>
      {/* <Button variant="contained" onClick={openChatRoom} sx={{m: 4, p: 2}}>Modal
        <Chat 
          isChatOpen = {isChatOpen}
        >
        </Chat>
      </Button> */}
      </div>
      <div>
      
        <div>{answer}</div>
        <div>
          {/* <Button onClick={handleSummarization}>
            handleSummarization
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default App;
