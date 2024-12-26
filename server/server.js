import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold  } from '@google/generative-ai';
import OpenAI from 'openai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const safetySettings4 = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];

let generationConfig4 = {
        temperature: 0.3,
        topK: 1,
        topP: 1,
        maxOutputTokens: 8192,
    };

const model4 = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest",
    systemInstruction: "you are a super kind assistant", generationConfig4, safetySettings4 });
const chat = model4.startChat();

// 10. Run the main async function
(async () => {
      //hi
    })();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
    message: 'Hello from my OpenAI and Gemini app!!!!'
    })
})

app.post('/', async (req, res) => {
    try {

        const task = req.body.task;
        const tempe = Number(req.body.tempe);
        const systemInstruction = req.body.systemInstruction;
        console.log('tempe'+req.body.tempe);
        switch (task) {
            case 1:

                const prompt3 = req.body.prompt;

                const responseOpen1 = await openai.chat.completions.create({
                    messages: [{ role: 'user', content: 'Say this is a test' }],
                    model: 'gpt-4o',
                  });

                /*const responseOpen1 = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: `${prompt3}`,
                    temperature: 0, // Higher values means the model will take more risks.
                    max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
                    top_p: 1, // alternative to sampling with temperature, called nucleus sampling
                    frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
                    presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
                    });*/
            
                    res.status(200).send({
                        bot: responseOpen1.data.choices[0].text
                    });
                break;
            case 2:
                const safetySettings2 = [
                    {
                        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                ];

                let generationConfig2 = {
                        temperature: `${tempe}`,
                        topK: 1,
                        topP: 1,
                        maxOutputTokens: 8192,
                    };

                const model2 = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest",
                    systemInstruction: `${systemInstruction}`, generationConfig2, safetySettings2 });
                
                const prompt2 = req.body.prompt;
        
                /*const result2 = await model2.generateContent (
                    prompt2
                );*/
                const result2 = await model2.generateContent({
                    contents: [
                      {
                        role: 'user',
                        parts: [
                          {
                            text: prompt2,
                          }
                        ],
                      }
                    ],
                    generationConfig: {
                      temperature: `${tempe}`,
                      topK: 1,
                      topP: 1,
                      maxOutputTokens: 1000,
                  },
                  });
                const response2 = result2.response;
                const text2 = response2.text();
                //console.log(text);
                console.log('params x the answer'+"task"+task+"temperature"+tempe);
                console.log('the answer'+response2.text());
                res.status(200).send({
                    bot: response2.text()
                });
                break;

            case 3:
                const safetySettings = [
                    {
                        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                ];

                let generationConfig = {
                        temperature: `${tempe}`,
                        topK: 1,
                        topP: 1,
                        maxOutputTokens: 8192,
                        responseMimeType: "application/json",
                    };

                const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest",
                    systemInstruction: `${systemInstruction}`, generationConfig, safetySettings });
                
                const prompt = req.body.prompt;
        
                /*const result = await model.generateContent (
                    prompt
                );*/
                const result = await model.generateContent({
                    contents: [
                      {
                        role: 'user',
                        parts: [
                          {
                            text: prompt,
                          }
                        ],
                      }
                    ],
                    generationConfig: {
                      temperature: `${tempe}`,
                      topK: 1,
                      topP: 1,
                      maxOutputTokens: 1000,
                      responseMimeType: "application/json",
                    },
                  });
                const response = result.response;
                const text = response.text();
                //console.log(text);
                console.log('params x the answer'+"task"+task+"temperature"+tempe);
                console.log('the answer'+response.text());
                res.status(200).send({
                    bot: response.text()
                });
                break;




            case 4:
                /*const safetySettings4 = [
                    {
                        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                ];

                let generationConfig4 = {
                        temperature: `${tempe}`,
                        topK: 1,
                        topP: 1,
                        maxOutputTokens: 8192,
                    };

                const model4 = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest",
                    systemInstruction: `${systemInstruction}`, generationConfig4, safetySettings4 });
                const chat = model4.startChat();*/
                const prompt4 = req.body.prompt;
                let result4 = await chat.sendMessage(prompt4);
                res.status(200).send({
                    bot: result4.response.text()
                });
                break;

            default:

                res.status(200).send({
                    bot: "nothing to do"
                });

        }


    } catch (error) {
        console.error(error)
        res.status(500).send(error || 'Something went wrong');
    }
})
    
app.listen(5000, () => console.log('AI server started on http://localhost:5000'))