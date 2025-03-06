

export interface IMessage {
    userId: string
    userName: string
    receiverAccountId: string
    senderAccountId: string
    senderName: string
    messageText: string
    imageUrl: string
    videoUrl: string
    type: 'text' | 'image' | "template"
}