import { azure } from '@/lib/aoi';
import { streamText, tool } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {


    const { messages } = await req.json();

    const result = streamText({
        model: azure(process.env.AZURE_OPENAI_DEPLOYMENT_NAME!),
        messages,
        tools: {
            getWeather: tool({
                description: "Get the weather for a location",
                parameters: z.object({
                    latitude: z.number().optional(),
                    longitude: z.number().optional(),
                    city: z.string(),
                }),
                execute: async ({ latitude, longitude, city }) => {
                    const response = await fetch("http://api.weatherapi.com/v1/current.json", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ key: process.env.WEATHER_API_KEY, q: city })
                    })

                    const data = await response.json();
                    console.log(data)

                    return {
                        temperature: data.current.temp_c,
                        condition: data.current.condition.text,
                        humidity: data.current.humidity,
                        city
                    }
                }
            }),
        },
        // maxSteps: 5,

    });



    return result.toDataStreamResponse()

}