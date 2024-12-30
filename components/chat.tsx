"use client"

import { useChat } from "ai/react";
import { Poppins } from "next/font/google";
import { cn } from '@/lib/utils';
import AIInput from "@/components/ui/ai-input";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    const { messages, input, handleInputChange, handleSubmit } = useChat();
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
        <div className="h-screen bg-gradient-to-b from-black via-neutral-900 to-neutral-800 flex flex-col overflow-hidden">
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
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
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
                        className="flex-1 flex flex-col overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >

                        <div className="flex-1 overflow-y-auto scrollbar-hide">
                            <div className="max-w-4xl mx-auto">
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 5, }}
                                        animate={{ opacity: 1, y: 0, }}
                                        transition={{ type: "spring", stiffness: 100 }}
                                        className={cn(
                                            "p-6 rounded-lg my-4",
                                            message.role === "user"
                                                ? "py-4 w-fit bg-zinc-800/50"
                                                : "shadow-inne bg-neutral-900/50"
                                        )}
                                    >
                                        <div className="max-w-4xl mx-auto">
                                            <div className="text-zinc-200 whitespace-pre-wrap">
                                                {message.content}
                                            </div>
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