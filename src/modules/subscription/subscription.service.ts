

import { ISubscription } from "./subscription.interface";
import Subscription from "./subscription.model";

// Create a new Subscription
export const createSubscriptionInDb = async (
    userId: string,
    userName: string,
    userPhoneNumber: string,
    plan: string
) => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 10); // adds 10 days

    const data = {
        userId,
        userName,
        userPhoneNumber,
        plan,
        startDate,
        endDate,
        isActive: true,
    };

    return await Subscription.create(data);
};

// Get all Subscriptions
export const getSubscriptionsFromDb = async (
    ids?: string[],
    id?: string[],
    userName?: string,
    userPhoneNumber?: string,
    categoryId?: string,
    userId?: string,
    skip: number = 0,
    limit: number = 10
) => {
    const filter: any = {};

    if (userName) filter.userName = { $regex: userName, $options: "i" };
    if (userId) filter.userId = userId;
    if (id) filter._id = id;
    if (ids && ids.length > 0) filter._id = { $in: ids }; // 👈 array of Subscription IDs
    if (userPhoneNumber) filter.userPhoneNumber = { $regex: userPhoneNumber, $options: "i" };
    if (categoryId?.length && categoryId?.length > 2) filter.categoryId = categoryId;

    const total = await Subscription.countDocuments(filter);
    const Subscriptions = await Subscription.find(filter).skip(skip).limit(limit);

    return { Subscriptions, total };
}

// Get a single Subscription by ID
export const getSubscriptionByIdFromDb = async (id: string) => {
    return await Subscription.findById(id);
};

// Update a Subscription by ID
export const updateSubscriptionInDb = async (id: string, data: Partial<ISubscription>) => {
    return await Subscription.findByIdAndUpdate(id, data, { new: true });
};

// Delete a Subscription by ID
export const deleteSubscriptionFromDb = async (id: string) => {
    return await Subscription.findByIdAndDelete(id);
};
