

import { IProductCarousel } from "./productCarousel.interface";
import ProductCarousel from "./productCarousel.model";

// Create a new ProductCarousel
export const createProductCarouselInDb = async (data: IProductCarousel) => {
    return await ProductCarousel.create(data);
};

// Get all ProductCarousels
export const getProductCarouselsFromDb = async () => {
    return await ProductCarousel.find();
};

// Get a single ProductCarousel by ID
export const getProductCarouselByIdFromDb = async (id: string) => {
    return await ProductCarousel.findById(id);
};

// Update a ProductCarousel by ID
export const updateProductCarouselInDb = async (id: string, data: Partial<IProductCarousel>) => {
    return await ProductCarousel.findByIdAndUpdate(id, data, { new: true });
};

// Delete a ProductCarousel by ID
export const deleteProductCarouselFromDb = async (id: string) => {
    return await ProductCarousel.findByIdAndDelete(id);
};
