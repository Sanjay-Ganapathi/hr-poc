import React, { useEffect, useRef } from 'react'
import { motion } from "framer-motion";

import { AIInput } from "@/components/ui/ai-input";
import { cn } from '@/lib/utils';
import { Markdown } from "@/components/ui/markdown";
import WeatherCard from "./tools/weather";


interface MessagesProps {
    messages: any[];
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: () => void;

}

export const Messages = ({ messages, input, handleInputChange, handleSubmit }: MessagesProps) => {

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages]);


    return (
        <motion.main
            key="chat"
            className="flex-1 flex flex-col overflow-hidden px-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >

            <div className="flex-1 overflow-y-auto scrollbar-hide ">
                <div className="max-w-4xl mx-auto">
                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 5, }}
                            animate={{ opacity: 1, y: 0, }}
                            transition={{ type: "spring", stiffness: 100 }}

                            className={cn(
                                "p-6 my-4",
                                message.role === "user"
                                    ? "rounded-lg py-4 w-fit bg-gradient-to-bl from-purple-900/90 to-purple-800/90 border border-purple-700/50 "
                                    : "rounded-xl bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 border border-neutral-700/50 transform hover:-translate-y-1 transition-all duration-300 ease-out before:bg-gradient-to-br before:from-neutral-500/5 before:to-neutral-800/5 before:transition-all before:duration-300 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_14px_28px_-5px_rgba(0,0,0,0.4)] "
                            )}
                        >
                            <div className="max-w-4xl mx-auto text-zinc-200 ">
                                {message.role === "assistant" ? (


                                    message.toolInvocations ? (

                                        message.toolInvocations.map((tool: any) => {

                                            const { toolName, toolCallId, state } = tool

                                            if (state === "result") {
                                                if (toolName === "getWeather") {
                                                    return <WeatherCard key={toolCallId} isLoading={false} weatherData={tool.result} />
                                                    // return <div key={toolCallId}>{JSON.stringify(tool.result)}</div>
                                                } else {
                                                    if (toolName === "getWeather") { return <WeatherCard key={toolCallId} isLoading={true} weatherData={null} /> }

                                                }
                                            }


                                        })

                                    ) : (<Markdown content={message?.content} />)



                                )
                                    : (
                                        <div className="whitespace-pre-wrap">
                                            {message.content}
                                        </div>
                                    )}

                            </div>
                        </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>


            <div className="shrink-0">
                <AIInput
                    input={input}
                    handleInputChange={handleInputChange}
                    handleSubmit={() => handleSubmit()}
                />
            </div>
        </motion.main>

    )
}
