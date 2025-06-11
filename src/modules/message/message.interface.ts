

export interface IMessage {
    userId: string
    userName: string
    contactName: string
    contactProfileUrl: string
    contactProfileId: string
    messageText: string
    imageUrl: string
    videoUrl: string
    docuemntUrl: string
    type: 'text' | 'image' | "template" | 'video' | 'docuemnt'
    templateData: string
    messageId: string
    isSeen: boolean
    time: string
    echo: boolean
}