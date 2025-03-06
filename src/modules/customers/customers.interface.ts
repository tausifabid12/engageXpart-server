

export interface ICustomers {
    userId: string
    userName: string
    customerProfile: {
        name: string
        email: string
        phone: string
        profileId: string
    }
    customerLocation: {
        city: string
        state: string
        address: string
    }
    orderStats: {
        totalOrders: number
        totalSpent: number
    }
    productIds: string[]
}