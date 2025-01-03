import { tool } from 'ai';
import { z } from 'zod';

const getWeather = tool({
    description: "Get the weather for a location",
    parameters: z.object({
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        city: z.string().describe("The city to get the weather for")
    }),
    execute: async ({ latitude, longitude, city }) => {
        try {
            if (!process.env.WEATHER_API_KEY) {
                throw new Error("Missing WEATHER_API_KEY")
            }

            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },

            })

            if (!response.ok) {
                throw new Error(`Failed to get weather for ${city} , Error Code: ${response.status} , Error Message: ${JSON.stringify(await response.json())}`)
            }

            const data = await response.json();
            console.log(data)

            return data;
        }

        catch (e: any) {

            console.error(e);

            return { "Error": e.message }


        }
    }


})

export const tools = {
    getWeather
}
