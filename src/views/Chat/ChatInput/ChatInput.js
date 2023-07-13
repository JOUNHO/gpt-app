import { Button, TextField } from "@mui/material";

function ChatInput(props) {
    const {question, setQuestion, setAnswer, setChatList, chatList} = props;
    const handleChangeQuestion = (e) => {
        setQuestion(e.target.value);
    }
    const  handleOnKeyUp = (e) =>{
        if(e.key == "Enter") {
            if (e.nativeEvent.isComposing) return;
            handleOnQuestion();
        }
    }
    const handleOnQuestion = (e) => {
        if(question){
            const newData = {
                sender : "user",
                content : question,
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
                setAnswer(data.message.text);
                const newData = {
                    sender : "chat",
                    content : data.message.text,
                }
                setChatList((chatList) => {
                    return ([
                            ...chatList,
                            newData
                    ])
                })
            })
        }
    }
    return (
        <>
            <TextField 
                fullWidth label="How do I use a LLM Chain?"  
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
                >
                전송
            </Button>
        </>
    )
};

export default ChatInput;