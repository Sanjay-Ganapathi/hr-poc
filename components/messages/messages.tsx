import React, { useEffect, useRef } from 'react'
import { motion } from "framer-motion";

import { AIInput } from "@/components/ui/ai-input";
import { MessageContainer } from '@/components/messages/message-container';


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
            className="flex-1 flex flex-col overflow-hidden px-2 sm:px-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >

            <div className="flex-1 overflow-y-auto scrollbar-hide ">
                <div className="max-w-4xl mx-auto">
                    {messages.map((message, index) => (
                        <MessageContainer key={index} message={message} index={index} />
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
