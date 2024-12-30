import { azure } from '@/lib/aoi';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {


    const { messages } = await req.json();

    const result = streamText({
        model: azure(process.env.AZURE_OPENAI_DEPLOYMENT_NAME!),
        messages,
    });



    return result.toDataStreamResponse()

}