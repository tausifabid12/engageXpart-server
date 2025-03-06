

export interface IProduct {
    name: string
    description: string
    categoryName: string
    imageUrl: string[]
    stock: number
    originalPrice: string
    offerPrice: string
    videoUrl: string
    variantNames: {
        name: string
        imageUrl: string
    }
}