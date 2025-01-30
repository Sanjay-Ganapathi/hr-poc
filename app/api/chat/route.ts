import { streamText, smoothStream } from 'ai';
import { azure } from '@/lib/aoi';
import { tools } from '@/lib/tools';

export const maxDuration = 30;

export async function POST(req: Request) {


    const { messages } = await req.json();

    const result = streamText({
        model: azure(process.env.AZURE_OPENAI_DEPLOYMENT_NAME!),
        messages,
        tools,
        system: "You are an helpful assistant that answers questions for the users . You also have tools which you can use to provide answers to the users . But remember to summarize the result of tool in less than 10 words if any tool is called . No need for big explanation in case of tool call.My emp id is 123",
        // experimental_transform: smoothStream({ chunking: 'line' })

    })

    return result.toDataStreamResponse({
        getErrorMessage: (error: any) => error.message,
    })

}