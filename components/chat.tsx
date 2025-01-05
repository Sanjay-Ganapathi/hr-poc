"use client"

import { useChat } from "ai/react";
import { AnimatePresence } from "framer-motion";


import { InitialInput } from "@/components/initial-input";
import { Messages } from "@/components/messages/messages";
import { Header } from "@/components/header";




export const Chat = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        maxSteps: 5
    });


    return (
        <div className="h-screen bg-gradient-to-b from-black via-neutral-900 to-neutral-800 flex flex-col overflow-hidden ">

            <Header />

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