

export interface IMessage {
    userId: string
    pageId: string
    userName: string
    contactName: string
    contactProfileUrl: string
    contactProfileId: string
    messageText: string
    imageUrls: string[]
    videoUrl: string
    docuemntUrl: string
    type: 'text' | 'image' | "template" | 'video' | 'docuemnt' | "promotion"
    templateData: string
    messageId: string
    isSeen: boolean
    time: string
    echo: boolean
}