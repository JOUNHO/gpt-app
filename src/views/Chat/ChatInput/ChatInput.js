import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function ChatInput(props) {
    const {question, setQuestion, setAnswer, setChatList, chatList, setIsSpinner, dialogContentRef} = props;
    const [defaultChatList,setDefaultChatList] = useState([
        "근속하면 뭐가 좋아?",
        "안녕 반가워",
        "본인이 결혼하면 혜택이 뭐야?"
    ]);
    const [isSend,setIsSend] = useState(false);

    useEffect(() => {
        console.log(dialogContentRef);
        if(isSend && question) {
            setIsSpinner(true);
            const newData = {
                sender : "user",
                content : question,
                insertTime : new Date().toLocaleString(),
                urlList : [],
            };
            setChatList((chatList) => {
                return ([
                ...chatList,
                newData,
            ])});
            setQuestion("");
            fetch('http://localhost:3001/question', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({question})
            })
            .then((res) => res.json())
            .then((data) => {
                const {answer,similarDocs} = data.message;
                setAnswer(answer);

                const allUrlList = similarDocs.map(doc => doc.metadata.source);
                const urlList =  allUrlList.filter((url,i) => { return (allUrlList.indexOf(url) === i)});

                const newData = {
                    sender : "chat",
                    content : data.message.answer,
                    insertTime : new Date().toLocaleString(),
                    urlList : urlList,
                }
                setChatList((chatList) => {
                    return ([
                            ...chatList,
                            newData
                    ])
                })
                setIsSpinner(false);
                dialogContentRef.current.scrollTop = dialogContentRef.current.scrollHeight
            })
        }
        setIsSend(false);
    },[isSend])

    const handleChangeQuestion = (e) => {
        setQuestion(e.target.value);
    }
    const  handleOnKeyUp = (e) =>{
        if(e.key == "Enter") {
            if (e.nativeEvent.isComposing) return;
            handleOnQuestion();
        }
    }
    const handleOnDefaultQuestion = (e, index, value) => {
        const question = e.target.innerText;
        setQuestion(question);
        setIsSend(true);
    }
    const handleOnQuestion = (e) => {
        setIsSend(true);
    }
    return (
        <>
            {
                chatList.length == 0 &&
                defaultChatList.map((defaultChatItem) => {
                    return (
                        <Box
                            component="span"
                            sx={{
                                backgroundColor: '#e9ecef',
                                fontSize :"13px",
                                marginLeft:"8px",
                                marginTop:"5px",
                                padding:"7px",
                                borderRadius: 2,
                                '&:hover': {
                                backgroundColor: '#ced4da',
                                opacity: [0.9, 0.8, 0.7],
                                },
                                
                            }}
                            onClick = {handleOnDefaultQuestion}
                        >
                            {defaultChatItem}
                        </Box>
                    )
                })
            }
            <Box sx={{display: "flex"}}>
            <TextField 
                fullWidth label="복리후생 관련해서 물어봐주세요."  
                id="fullWidth"
                margin="normal"
                maxHeight='25px'
                minHeight='10px'
                onChange={handleChangeQuestion}
                onKeyDown={handleOnKeyUp}
                value={question}
                />
            <Button
                onClick={handleOnQuestion}
                sx={{marginLeft : '5px',marginTop:'20px', height:"50px"}}
                variant="contained"
                >
                Ask
            </Button>
            </Box>
        </>
    )
};

export default ChatInput;