"use client";

import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { ChangeEvent, FormEvent } from "react";

const MIN_HEIGHT = 132;
const MAX_HEIGHT = 264;

interface AIInputProps {
    input: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: () => void;
    placeholder?: string;
    className?: string;
}

export const AIInput = ({
    input,
    handleInputChange,
    handleSubmit,
    placeholder = "Understand the universe.."
}: AIInputProps) => {
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: MIN_HEIGHT,
        maxHeight: MAX_HEIGHT,
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleSubmit();
        adjustHeight(true);
    };

    return (
        <div className="w-full py-4">
            <div className="relative max-w-xl w-full mx-auto">
                <form onSubmit={onSubmit} className="relative flex flex-col">
                    <div
                        className="overflow-y-auto"
                        style={{ maxHeight: `${MAX_HEIGHT}px` }}
                    >
                        <Textarea
                            value={input}
                            placeholder={placeholder}
                            className="w-full rounded-xl px-4 py-3 bg-white/5 border-none text-white placeholder:text-white/70 resize-none focus-visible:ring-0 leading-[1.2]"
                            ref={textareaRef}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit();
                                    adjustHeight(true);
                                }
                            }}
                            onChange={(e) => {
                                handleInputChange(e);
                                adjustHeight();
                            }}
                        />
                    </div>

                    <div className="absolute right-3 bottom-3">
                        <button
                            type="submit"
                            className={cn(
                                "rounded-lg p-2 transition-colors",
                                input
                                    ? "bg-sky-500/15 text-sky-500"
                                    : "bg-white/5 text-white/40 hover:text-white"
                            )}
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}