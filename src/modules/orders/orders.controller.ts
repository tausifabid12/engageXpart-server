import { Request, Response } from "express";
import { createOrderInDb, deleteOrderFromDb, getOrderByIdFromDb, getOrdersFromDb, updateOrderInDb } from "./orders.service";
import Lead from "../leads/leads.model";


// Create a new Order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {

        const order = await createOrderInDb(req.body);
        const customer = order.customerDetails;
        const profileId = customer.profileId;

        if (profileId) {
            const existingLead = await Lead.findOne({ profileId });

            if (existingLead) {
                // Update lead
                existingLead.name = customer.name;
                existingLead.email = customer.email;
                existingLead.phone = customer.phone;
                existingLead.city = customer.city;
                existingLead.state = customer.state;
                existingLead.address = customer.address;
                existingLead.isCustomer = true;
                existingLead.orderCount += 1;
                existingLead.orderIds.push(order._id.toString());

                await existingLead.save();
            } else {
                // Create new lead
                await Lead.create({
                    name: customer.name,
                    email: customer.email,
                    phone: customer.phone,
                    city: customer.city,
                    state: customer.state,
                    address: customer.address,
                    profileId: customer.profileId,
                    isCustomer: true,
                    orderCount: 1,
                    orderIds: [order._id.toString()],
                });
            }
        }

        res.status(201).json({
            success: true,
            data: order,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(400).json({ message: 'Error creating order', error });
    }
};

// Get all Orders
export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const { orders, total } = await getOrdersFromDb(skip, limit);

        res.status(200).json({
            success: true,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            data: orders
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};


// Get a single Order by ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const Order = await getOrderByIdFromDb(req.params.id);
        if (!Order) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Order
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching ", error });
    }
};

// Update a Order by ID
export const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const Order = await updateOrderInDb(req.params.id, req.body);
        if (!Order) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Order
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
};

// Delete a Order by ID
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const Order = await deleteOrderFromDb(req.params.id);
        if (!Order) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
};
