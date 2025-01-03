import { streamText } from 'ai';
import { azure } from '@/lib/aoi';
import { tools } from '@/lib/tools';

export const maxDuration = 30;

export async function POST(req: Request) {


    const { messages } = await req.json();

    const result = streamText({
        model: azure(process.env.AZURE_OPENAI_DEPLOYMENT_NAME!),
        messages,
        tools

    })

    return result.toDataStreamResponse({
        getErrorMessage: (error: any) => error.message,
    })

}