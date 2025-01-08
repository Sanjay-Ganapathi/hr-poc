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


                if (toolName === "getWeather") {
                    return <WeatherCard key={toolCallId} isLoading={state !== "result"} weatherData={state === "result" ? tool.result : null} />
                }

                if (toolName === "getLeaves") {
                    return <div key={toolCallId}>{JSON.stringify(tool.result, null, 2)}</div>
                }


            })}


        </>
    )
}
