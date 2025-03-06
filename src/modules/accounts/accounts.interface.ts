

export interface IAccount {
    userId: string
    website: 'facebook' | 'instagram' | 'whatsapp'
    name: string
    email: string
    phone: string
    accessToken: string
}