

export interface ISubscription {
    plan: 'monthly' | 'six-monthly' | 'yearly'
    startDate: Date
    endDate: Date
    isActive: boolean
    userId: string
    userName: string
    userPhoneNumber: string
}