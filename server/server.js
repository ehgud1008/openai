import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {Configuration, OpenAIApi} from 'openai';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY; // apiKey 변수에 저장

const configuration = new Configuration({
    apiKey: apiKey, // apiKey 변수를 설정에 전달
});

const openai = new OpenAIApi(configuration);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message : "hello",
    })
});

app.post('/', async(req, res) => {
    try{
        const prompt = req.body.prompt;
        const response = await openai.createChatCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 1,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        res.status(200).send({
            bot : response.data.choices[0].text
        })
    }catch(error){
        console.log(error);
        res.status(500).send({ error })
    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'))