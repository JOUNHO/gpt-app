import express from 'express';
import { OpenAI } from "langchain/llms/openai";
import {TextLoader} from 'langchain/document_loaders/fs/text';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ChatOpenAI } from "langchain/chat_models/openai";
import { getEncoding } from 'js-tiktoken';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from 'langchain/document';
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { loadQAStuffChain } from "langchain/chains";

const app = express();
const port = 3001;
let vectorDB;

const OPEN_AI_API_KEY = "";
const openAI = new ChatOpenAI({
    openAIApiKey : OPEN_AI_API_KEY,
    temperature:0.5,
    modelName :'gpt-3.5-turbo',
})

app.use(bodyParser.json());
app.use(cors());
app.post('/', async (req, res) => {
    // const { message } = req.body
    // const response = await openAI.createChatCompletion({
    //     model: "gpt-3.5-turbo",
    //     messages: [{role:"user",content: message}],
    //     temperature: 0.5,
    //     max_tokens:512
    // });
    // console.log(response.data)
    // if (response.data) {
    //     if (response.data.choices) {
    //         res.json({
    //             message: response.data.choices[0].message.content
    //         })
    //     }
    // }
})

app.post('/setting',async (req, res) => {
    console.log("setting 실행");
    //1.TextLoader
    const loader = new TextLoader("src/document_loders/test/chatgpt_welfare_utf8.txt");
    
    const docs = await loader.load();
    //console.log(docs);
    const pageContent = docs[0].pageContent;
    //2.create count tokens - countTokens();
   
    //3.split (청크화)
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize:512,
        chunkOverlap:24,
        //length_function :countTokens,
    })

    const chunks = await splitter.splitDocuments([
        new Document({pageContent: pageContent})
    ]);
    //console.log(chunks);

    //4.Embedding and vectorStore

    const embeddings = new OpenAIEmbeddings({
        timeout: 10000,
        openAIApiKey: OPEN_AI_API_KEY,
    });

    // const res2 = await embeddings.embedQuery("Hello world");
    // console.log(res2);
    vectorDB = await FaissStore.fromDocuments(
        chunks,
        embeddings
      );
    //console.log(vectorDB);
    console.log('vectorDB');

    (chunks && vectorDB) ? res.json({message:"success"}) : res.json({message:"fail"});
});


app.post('/question', async (req, res) => {
    console.log('question 실행');
    const { question } = req.body;
    const similarDocs = await vectorDB.similaritySearch(question);
    console.log(similarDocs);
    //const res = await embeddings.embedQuery();
    //5.QA답
    const qaChain = loadQAStuffChain(openAI);
    const answer = await qaChain.call({
        input_documents: similarDocs,
        question : question,
    });

    console.log(answer);

    if(answer) {
        res.json({
            message: answer
        })
    }
})

const countTokens = (text) => {
    const enc = getEncoding("gpt2");
    const textEncoded = enc.encode(text);
    return textEncoded.length;
}

app.listen(port, () => {
    console.log('Example app port: ' + port);
})