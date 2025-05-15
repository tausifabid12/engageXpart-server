

export interface ILead {
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
    source: 'facebook' | 'instagram'

}
