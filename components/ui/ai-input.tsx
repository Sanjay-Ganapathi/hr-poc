"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

const MIN_HEIGHT = 132;
const MAX_HEIGHT = 264;

export default function AIInput() {
    const [value, setValue] = useState("");
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: MIN_HEIGHT,
        maxHeight: MAX_HEIGHT,
    });

    const handleSubmit = () => {
        setValue("");
        adjustHeight(true);
    };

    return (
        <div className="w-full py-4">
            <div className="relative max-w-xl w-full mx-auto">
                <div className="relative flex flex-col">
                    <div
                        className="overflow-y-auto"
                        style={{ maxHeight: `${MAX_HEIGHT}px` }}
                    >
                        <Textarea

                            value={value}
                            placeholder="Understand the universe.."
                            className="w-full rounded-xl px-4 py-3 bg-white/5 border-none text-white  placeholder:text-white/70 resize-none focus-visible:ring-0 leading-[1.2]"
                            ref={textareaRef}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                        />
                    </div>


                    <div className="absolute right-3 bottom-3">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className={cn(
                                "rounded-lg p-2 transition-colors",
                                value
                                    ? "bg-sky-500/15 text-sky-500"
                                    : " bg-white/5 text-white/40 hover:text-white"
                            )}
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}
