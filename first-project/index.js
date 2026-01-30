// 1

import 'dotenv/config'
import {Agent, run} from '@openai/agents'

const helloAgent = new Agent({
    name: 'hello-agent',
    // description: 'An agent that greets the user',
    // tools: [],
    // promptTemplate: 'Greet the user with a friendly message.',
    instructions: 'You are a friendly agent that greets the user warmly.',
})

// run(helloAgent, 'Hey you ! I am Anurag. How are you doing today?').then(response => {
//     console.log('Agent Response:', response.finalOutput)
// }).catch(error => {
//     console.error('Error running agent:', error)
// })  