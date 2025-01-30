import React from 'react'

import { ToolInvocations } from '@/components/messages/tool-invocations'
import { Markdown } from '@/components/ui/markdown'

interface MessageProps {
    message: any,

}



export const Message = ({ message }: MessageProps) => {
    if (message.role === "user") {
        return <div className="whitespace-pre-wrap">
            {message.content}
        </div>
    }



    if (message.toolInvocations) {
        return <ToolInvocations toolInvocations={message.toolInvocations} />
    }



    return <Markdown content={message.content} />

}
