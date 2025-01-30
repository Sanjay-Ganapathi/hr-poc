import React from 'react'
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

import { AIInput } from "@/components/ui/ai-input";
import { cn } from '@/lib/utils';


interface InitialInputProps {
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: () => void;
}


const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });


const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 20
};

const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 16) return 'Good Afternoon';
    if (hour >= 16 && hour < 23) return 'Good Evening';
    return 'Good Night';
};

export const InitialInput = ({ input, handleInputChange, handleSubmit }: InitialInputProps) => {
    return (
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
                        {getGreeting()}, Human. 👋
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
    )
}
