import React from 'react'
import WeatherCard from '@/components/tools/weather';
import { LeaveDashboard } from '../tools/leaves';
import WeeklyAttendanceCalendar from '../tools/attendance';

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

                    return <LeaveDashboard key={toolCallId} isLoading={state !== "result"} data={state === "result" ? tool.result : null} />
                }

                if (toolName === "getAttendance") {
                    return <WeeklyAttendanceCalendar key={toolCallId} isLoading={state !== "result"} data={state === "result" ? tool.result : null} />
                }


            })}


        </>
    )
}
