

import { ISubscription } from "./subscription.interface";
import Subscription from "./subscription.model";

// Create a new Subscription
export const createSubscriptionInDb = async (data: ISubscription) => {
    return await Subscription.create(data);
};

// Get all Subscriptions
export const getSubscriptionsFromDb = async () => {
    return await Subscription.find();
};

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
