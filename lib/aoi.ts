import { createAzure } from '@ai-sdk/azure';

export const azure = createAzure({
    resourceName: process.env.AZURE_OPENAI_ENDPOINT,
    apiKey: process.env.AZURE_OPENAI_API_KEY,

});
