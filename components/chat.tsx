"use client"

import { useChat } from "ai/react";
import { Poppins } from "next/font/google";
import { cn } from '@/lib/utils';
import AIInput from "@/components/ui/ai-input";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Markdown } from "@/components/ui/markdown";
import WeatherCard from "./tools/weather";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 16) return 'Good Afternoon';
    if (hour >= 16 && hour < 23) return 'Good Evening';
    return 'Good Night';
};

const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 20
};

export const Chat = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        maxSteps: 5
    });
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
        <div className="h-screen bg-gradient-to-b from-black via-neutral-900 to-neutral-800 flex flex-col overflow-hidden ">
            <header className="shrink-0 p-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                    <span className="text-zinc-100 text-lg">HR POC</span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400">Beta</span>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {messages.length === 0 ? (

                    <motion.main
                        key="initial"
                        className="flex-1 flex flex-col items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                        transition={springTransition}
                    >
                        <div className="max-w-xl w-full space-y-8 px-4">
                            <motion.div
                                className="text-center space-y-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, ...springTransition }}
                            >
                                <h1 className={cn("text-2xl text-zinc-100", poppins.className)}>
                                    {getGreeting()}, Microlander. 👋
                                </h1>
                                <p className="text-zinc-400">How can I help you today?</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, ...springTransition }}
                            >
                                <AIInput
                                    input={input}
                                    handleInputChange={handleInputChange}
                                    handleSubmit={() => handleSubmit()}
                                />
                            </motion.div>
                        </div>
                    </motion.main>
                ) : (

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
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chat;