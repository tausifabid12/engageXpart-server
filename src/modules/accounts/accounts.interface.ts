

export interface IAccount {
    userId: string
    profileId: string
    website: 'facebook' | 'instagram' | 'whatsapp'
    name: string
    email: string
    phone: string
    accessToken: string
    pages: {
        name: string
        id: string
        access_token: string

    }[]
}