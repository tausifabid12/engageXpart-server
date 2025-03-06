

export interface IOrder {
    userId: string
    userName: string
    customerDetails: {
        name: string
        email: string
        phone: string
        city: string
        state: string
        address: string
        profileId: string
    }
    products: {
        name: string
        description: string
        categoryName: string
        imageUrl: string
        price: number
        tax: number
        quantity: number
    }[]
}