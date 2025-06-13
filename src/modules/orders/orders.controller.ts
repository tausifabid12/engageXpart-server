import { Request, Response } from "express";
import { createOrderInDb, deleteOrderFromDb, getOrderByIdFromDb, getOrdersFromDb, updateOrderInDb } from "./orders.service";
import Lead from "../leads/leads.model";
import { sendReceiptTemplate } from "../../helpers/sendReceiptTemplate";
import { AuthRequest } from "../../types/AuthRequest";


// Create a new Order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {

        const order = await createOrderInDb(req.body);
        const customer = order.customerDetails;
        const profileId = customer.profileId;


        // ====================== update lead data ============================
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
                    lastOrderDate: new Date().toISOString()
                });
            }
        }

        // ==================== send order placed message to user ==============


        sendReceiptTemplate({
            psid: profileId,
            accessToken: "<PAGE_ACCESS_TOKEN>",
            customerName: "Stephane Crozatier",
            orderNumber: "12345678902",
            currency: "USD",
            paymentMethod: "Visa 2345",
            orderUrl: "http://originalcoastclothing.com/order?order_id=123456",
            timestamp: "1428444852",
            address: {
                street_1: "1 Hacker Way",
                city: "Menlo Park",
                postal_code: "94025",
                state: "CA",
                country: "US"
            },
            summary: {
                subtotal: 75.00,
                shipping_cost: 4.95,
                total_tax: 6.19,
                total_cost: 56.14
            },
            adjustments: [
                { name: "New Customer Discount", amount: 20 },
                { name: "$10 Off Coupon", amount: 10 }
            ],
            elements: [
                {
                    title: "Classic White T-Shirt",
                    subtitle: "100% Soft and Luxurious Cotton",
                    quantity: 2,
                    price: 50,
                    currency: "USD",
                    image_url: "http://originalcoastclothing.com/img/whiteshirt.png"
                },
                {
                    title: "Classic Gray T-Shirt",
                    subtitle: "100% Soft and Luxurious Cotton",
                    quantity: 1,
                    price: 25,
                    currency: "USD",
                    image_url: "http://originalcoastclothing.com/img/grayshirt.png"
                }
            ]
        });

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
export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Destructure filters and pagination params
        const {
            profileId,
            startDate,
            endDate,
            page = '1',
            limit = '10',
        }: any = req.query;

        const userId = req?.user?.id;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        // Build filter object dynamically
        const filter: any = {};

        if (profileId) {
            filter["customerDetails.profileId"] = profileId;
        }

        if (userId) {
            filter["userId"] = userId;
        }

        // Date filter on createdAt field (you can change to updatedAt if needed)
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) {
                filter.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                filter.createdAt.$lte = new Date(endDate);
            }
        }

        const { orders, total } = await getOrdersFromDb(filter, skip, limitNum);

        res.status(200).json({
            success: true,
            total,
            currentPage: pageNum,
            totalPages: Math.ceil(total / limitNum),
            data: orders,
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
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
