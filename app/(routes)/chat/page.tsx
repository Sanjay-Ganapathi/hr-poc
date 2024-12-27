import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import AIInput from "@/components/ui/ai-input";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });


const getGreeting = (): string => {
    const hour = new Date().getHours();


    if (hour >= 4 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 16) return 'Good Afternoon';
    if (hour >= 16 && hour < 23) return 'Good Evening';
    return 'Good Night';
};


const ChatPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-neutral-800 flex flex-col">

            <header className="p-4">
                <div className="flex items-center gap-2">
                    <span className="text-zinc-100 text-lg">HR POC</span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400">Beta</span>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center">
                <div className="max-w-xl w-full mx-auto space-y-4 ">
                    <div className="space-y-2 text-start mb-8 px-6">
                        <h1 className={cn("text-2xl  text-zinc-100", poppins.className)}>{getGreeting()}, Microlander. 👋</h1>
                        <p className="text-zinc-400">How can I help you today?</p>
                    </div>

                    <AIInput />
                </div>
            </main>

        </div>
    )
}

export default ChatPage