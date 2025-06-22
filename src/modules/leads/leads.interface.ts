

export interface ILead {
    userId: string
    name: string
    email: string;
    phone: string;
    profileUrl: string
    interestedPostIds: string[]
    interestedProductId: string[]
    isCustomer: boolean
    orderCount: number
    orderIds: string[]
    address: string
    state: string
    city: string
    profileId: string
    pageId: string
    source: 'facebook' | 'instagram'
    lastOrderDate: Date
    lastMessageTime: Date
    lastMessageText: string
    unseenMessageCount: number

}
