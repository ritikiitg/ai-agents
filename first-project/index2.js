// 2 Dynamic Agent instruction example and tools


// Agent is brain and tools are its hands which perform specific tasks.

import 'dotenv/config'
import {Agent, run} from '@openai/agents'

const location = 'India'

const helloAgent = new Agent({
    name: 'hello-agent',
    // description: 'An agent that greets the user',
    // tools: [],
    // promptTemplate: 'Greet the user with a friendly message.',
    instructions: function(){
        if(location === 'India'){
            return 'You are a friendly agent that greets the user warmly in HindLish style.'
        } else {
            return 'You are a friendly agent that greets the user warmly.'
        }
    }
})

run(helloAgent, 'Hey you ! I am Anurag. How are you doing today?').then(response => {
    console.log('Agent Response:', response.finalOutput)
}).catch(error => {
    console.error('Error running agent:', error)
})  