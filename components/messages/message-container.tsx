import React from 'react'
import { motion, HTMLMotionProps } from "framer-motion";

import { cn } from '@/lib/utils';
import { Message } from '@/components/messages/message';


interface MessageContainerProps extends HTMLMotionProps<"div"> {
    message: any;
    index: number;


}

export const MessageContainer = ({ message, index }: MessageContainerProps) => {
    return (

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
                <Message message={message} />


            </div>





        </motion.div>
    )
}
