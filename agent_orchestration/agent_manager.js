import 'dotenv/config';
import { Agent, run, tool } from "@openai/agents"; 
import { z } from "zod";
import readline from 'readline';


const fetchAvailablePlans = tool({
    name: 'fetch-available-plans',
    description: 'Fetch the list of available subscription plans of internet for a user.',
    parameters: z.object({}),
    execute: async function() {
        return [
            {
                plan_id: 1,
                price_inr: 399,
                speed: '300 Mbps',
                validity_days: 30
            },
            {
                plan_id: 2,
                price_inr: 699,
                speed: '500 Mbps',
                validity_days: 30
            },
            {
                plan_id: 3,
                price_inr: 999,
                speed: '1 Gbps',
                validity_days: 30
            }
        ]
    }
})

const processRefund = tool({
    name: 'process-refund',
    description: 'Process a refund for a user subscription plan.',
    parameters: z.object({
        customer_id: z.string().describe('The ID of the customer requesting the refund.'),
        plan_id: z.number().describe('The ID of the plan to refund.'),
        reason: z.string().describe('The reason for the refund request.'),
    }),
    execute: async function({customer_id, plan_id, reason}) {
        // Mock refund processing logic
        console.log(`Processing refund for customer ID: ${customer_id}, plan ID: ${plan_id}`);
        console.log(`Reason: ${reason}`);

        return `Refund for plan ID ${plan_id} has been processed successfully.`;
    }
});

const refundAgent = new Agent({
    name: 'Internet Service Provider Refund Agent',
    description: 'An agent that helps users process refunds for their internet subscription plans.',
    instructions: 'You are a helpful refund agent for an internet service provider. Assist users in processing refunds for their subscriptions and provide clear instructions on the refund process.',
    tools: [processRefund],
});


const salesAgent = new Agent({
    name: 'Internet Service Provider Sales Agent',
    description: 'An agent that helps users choose the best internet subscription plan based on their needs and budget.',
    instructions: 'You are a helpful sales agent for an internet service provider. Use the fetch-available-plans tool to get the list of available plans and recommend the best one to the user based on their requirements.',
    tools: [fetchAvailablePlans, refundAgent.asTool({
        name: 'process-refund',
        description: 'Process a refund for a user subscription plan.',
        toolDescription: 'Use this tool to process refund requests for users.',
        toolName: 'refund-agent',
    })],

})

async function runAgent(userQuery) {
    const response = await run(salesAgent, userQuery);
    console.log('Agent Response:', response.finalOutput);
    return response.finalOutput;
}

// runAgent('I need a fast internet plan for my home office with a budget of around 800 INR per month. What do you suggest?')

//runAgent('Tell me all the available internet plans you have.')

// runAgent('I need a refund, I am not happy with my internet speed. my customer ID is CUST123 and I am subscribed to plan ID 2. Please process my refund.')


// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to get user input from console
function getUserInput(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
}

async function main() {
    console.log('Welcome to the Internet Service Provider Agent!');
    console.log('Type your question or type "exit" to quit.\n');
    
    while(true){
        const userQuery = await getUserInput('You: ');
        
        if (userQuery.toLowerCase() === 'exit') {
            console.log('Goodbye!');
            rl.close();
            break;
        }
        
        if (!userQuery.trim()) {
            console.log('Please enter a valid question.\n');
            continue;
        }
        
        await runAgent(userQuery);
        console.log('\n');
    }
}

main();