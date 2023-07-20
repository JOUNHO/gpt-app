const express = require("express");
const TextLoader = require("langchain/document_loaders/fs/text").TextLoader;
const bodyParser = require("body-parser");
const cors = require("cors");
const ChatOpenAI = require("langchain/chat_models/openai").ChatOpenAI;
const getEncoding = require("js-tiktoken").getEncoding;
const RecursiveCharacterTextSplitter = require("langchain/text_splitter").RecursiveCharacterTextSplitter;
const Document = require("langchain/document").Document;
const OpenAIEmbeddings = require("langchain/embeddings/openai").OpenAIEmbeddings;
const FaissStore = require("langchain/vectorstores/faiss").FaissStore;
const loadQAStuffChain = require("langchain/chains").loadQAStuffChain;

const PuppeterrWebBaseLoader = require("langchain/document_loaders/web/puppeteer").PuppeteerWebBaseLoader;

const app = express();
const port = 3001;
let vectorDB;

const OPEN_AI_API_KEY = "";
const openAI = new ChatOpenAI({
    openAIApiKey : OPEN_AI_API_KEY,
    temperature:0,
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

    const urlList = [
        "https://uno-gaebal.tistory.com/56",
        "https://uno-gaebal.tistory.com/57",
        "https://uno-gaebal.tistory.com/58",
        "https://uno-gaebal.tistory.com/59",
        "https://uno-gaebal.tistory.com/60",
        "https://uno-gaebal.tistory.com/61",
        "https://uno-gaebal.tistory.com/62",
    ];

    //3.청크화때 사용
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize:1000,
        chunkOverlap:100,
        //length_function :countTokens,
    })
    let chunks = [];

    for(const url of urlList){
        //1.TextLoader
        const loader = new PuppeterrWebBaseLoader(url);
        const docs = await loader.load();

        const pageContent = docs[0].pageContent;
        const pageMetaData = docs[0].metadata;

        //3.split(청크화)
        const tempChunks = await splitter.splitDocuments([
            new Document({
                pageContent: pageContent,
                metadata : pageMetaData,
            })
        ]);
        chunks = chunks.concat(tempChunks);
    }
    //1.TextLoader
    // const loader = new PuppeterrWebBaseLoader("https://uno-gaebal.tistory.com/57");
    // const loader2 = new PuppeterrWebBaseLoader("https://uno-gaebal.tistory.com/56");
    //const loader = new TextLoader("src/document_loders/test/chatgpt_welfare_utf8.txt");
    
    // const docs = await loader.load();
    // const docs2 = await loader2.load();

    //console.log(docs);
    // const pageContent = docs[0].pageContent;
    // const pageMetaData = docs[0].metadata;

    // const pageContent2 = docs2[0].pageContent;
    // const pageMetaData2 = docs2[0].metadata;
    //2.create count tokens - countTokens();
    //console.log(pageMetaData.source);
    //3.split (청크화)
    // let chunks = await splitter.splitDocuments([
    //     new Document({
    //         pageContent: pageContent,
    //         metadata : pageMetaData,
    //     })
    // ]);

    // const chunks2 = await splitter.splitDocuments([
    //     new Document({
    //         pageContent: pageContent2,
    //         metadata : pageMetaData2,
    //     })
    // ]);

    console.log(chunks);

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
    //console.log('vectorDB');
    console.log("success");
    (chunks && vectorDB) ? res.json({message:"success"}) : res.json({message:"fail"});
});


app.post('/question', async (req, res) => {
    console.log('question 실행');
    let { question } = req.body;
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
            message: {
                answer : answer.text,
                similarDocs : similarDocs,
            }
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