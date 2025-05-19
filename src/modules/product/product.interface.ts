

export interface IProduct {
    userId: string
    userSlug: string
    name: string
    description: string
    categoryName: string
    categoryId: string
    imageUrl: string[]
    stock: number
    originalPrice: string
    offerPrice: string
    videoUrl: string
    variantNames: {
        name: string
        imageUrl: string
    }[]
}