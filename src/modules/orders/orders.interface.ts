

export interface IOrder {
    userId: string
    slug: string
    userName: string
    status: 'pending' | 'accepted' | 'confirmed' | 'packaging' | 'in-shipping' | 'delivered';
    date: Date
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
        variantName: string
        variantImageUrl: string
    }[]

    payment: {
        paymentOperatorName: string
        paymentAccountType: 'agent' | 'personal' | 'merchant',
        accountNumber: string
        customerAccountNumber: string
        transactionId: string
        totalAmount: number
        deliveryCharge: number
        tax: number
        discount: number
    }
}