import React from 'react'

export const Header = () => {
    return (
        <header className="shrink-0 p-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
                <span className="text-zinc-100 text-lg">HR POC</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400">Beta</span>
            </div>
        </header>
    )
}
