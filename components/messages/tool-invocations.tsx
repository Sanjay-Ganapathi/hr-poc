import React from 'react'
import WeatherCard from '@/components/tools/weather';

interface ToolInvocationsProps {

    toolInvocations: any[];

}


export const ToolInvocations = ({ toolInvocations }: ToolInvocationsProps) => {
    return (

        <>

            {toolInvocations.map((tool: any) => {

                const { toolName, toolCallId, state } = tool


                if (toolName === "weather") {
                    return <WeatherCard key={toolCallId} isLoading={state !== "result"} weatherData={state === "result" ? tool.result : null} />
                }


            })}


        </>
    )
}
