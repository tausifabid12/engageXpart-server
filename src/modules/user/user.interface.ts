export interface IUser {
    userId: string
    name: string;
    email: string;
    phone: string
    password: string;
    businessName?: string
    businessDescription?: string;
    logoUrl?: string
    coverImageUrl?: string
    businessContactNumber?: string
    supportNumber?: string
    businessEmail?: string
    facebookUrl?: string
    linkedInUrl?: string
    instagramUrl?: string
    youtubeUrl?: string
    websiteUrl?: string
    businessType?: ''
    openingTime?: string
    closingTime?: string
    isARetailer?: boolean,
    userType: 'admin' | 'superAdmin' | 'agent' | 'support' | 'consumer'
    isFacebookConnected: boolean
}
