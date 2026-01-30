// Tool call with agent to perfrom actions like fetching weather data from API

// Agent is brain and tools are its hands which perform specific tasks.

// Structure outputs with Zod schemas for better reliability and validation.

import 'dotenv/config'
import { Agent, run, tool } from "@openai/agents"; 
import { z } from "zod"
// import axios from 'axios';
// import { de } from 'zod/v4/locales';


const GetWeatherResultSchema = z.object({
    city: z.string().describe('The city for which the weather is fetched.'),
    degreeCelsius: z.number().describe('The temperature in degree Celsius.'),
    condition: z.string().describe('The weather condition description.'),
});

const getWeatherTool = tool({
    name: 'get-weather',
    description: 'Get the current weather for a given location.',
    parameters: z.object({
        city: z.string().describe('The city to get the weather for.'),
    }),
    execute: async function({city}) {

        console.log(`Fetching weather for city: ${city}`);

        // Uncomment below code to make actual API call
        // const url = `https://wttr.in/${city.toLowerCase()}?format=%C+%t`;

        // const response = await axios.get(url, {
        //     responseType: 'text'
        // });

        // return `The current weather in ${city} is: ${response.data}`;

        return `The current weather in ${city} is: Sunny, 25°C`; // Mocked response
    },
})


const sendEmailTool = tool({
    name: 'send-email',
    description: 'Send an email to a specified recipient.',
    parameters: z.object({
        to: z.string().describe('The email address of the recipient.'),
        subject: z.string().describe('The subject of the email.'),
        body: z.string().describe('The body content of the email.'),
    }),
    execute: async function({to, subject, body}) {
        // Mock email sending logic
        console.log(`Sending email to: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body: ${body}`);

        return `Email sent to ${to} with subject "${subject}".`;
    }
})

const agent = new Agent({
    name: 'Weather Agent',
    description: 'An agent that provides weather information for a given location.',
    instructions: 'You are a helpful agent that provides accurate and concise weather information based on user queries.',
    tools: [getWeatherTool, sendEmailTool],
    outputType: GetWeatherResultSchema // comment this out for plain text output
})


async function main(query = ''){
    const result = await run (agent, query)

    console.log('Agent Response:', result.finalOutput)

}

// main('What is the weather like in Delhi, Bangalore and Patna today?');


main('What is the weather like in Jalandhar, Indore and Kolkata today? Also send me the weathe report via email at anurag.prakash@gmail.com');
