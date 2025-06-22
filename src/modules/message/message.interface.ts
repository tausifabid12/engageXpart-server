

export interface IMessage {
    userId: string
    pageId: string
    userName: string
    contactName: string
    contactProfileUrl: string
    contactProfileId: string
    messageText: string
    imageUrl: string
    videoUrl: string
    type: 'text' | 'image' | "template"
    templateData: string
    messageId: string
    isSeen: boolean
    time: string
    echo: boolean
}