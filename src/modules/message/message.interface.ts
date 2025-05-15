

export interface IMessage {
    userId: string
    userName: string
    receiverProfileId: string
    senderProfileId: string
    senderName: string
    messages: {
        messageText: string
        imageUrl: string
        videoUrl: string
        type: 'text' | 'image' | "template"
        messageId: string
        isSeen: boolean
        time: string
        echo: boolean
    }[]
}