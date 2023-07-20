import './App.css';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button/index.js';
import Chat from './views/Chat/Chat.js';
import Header from './views/Template/Header/index';
import imgA from './img/로그인화면5.jpg';


function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [answer, setAnswer] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // useEffect(() => {
  //   handleSetting();
  // },[]);
  const handleSetting = (e) => {
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
    <div className='App' style={{width:"100%", height:"100%", position:"fixed"}}>
      <div>
        <Header setIsChatOpen={setIsChatOpen} handleSetting={handleSetting}></Header>
      </div>
      <div>
        <Chat isChatOpen={isChatOpen}
              setIsChatOpen={setIsChatOpen}
        ></Chat>
      </div>
        <img src={imgA} style={{width:"100%", height:"95%"}}/>
    </div>
  );
}

export default App;
