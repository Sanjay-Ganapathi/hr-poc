"use client"

import { useChat } from "ai/react";
import { AnimatePresence } from "framer-motion";


import { InitialInput } from "@/components/initial-input";
import { Messages } from "@/components/messages";




export const Chat = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        maxSteps: 5
    });


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
                    <InitialInput
                        input={input}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />

                ) : (

                    <Messages
                        messages={messages}
                        input={input}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}

                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chat;