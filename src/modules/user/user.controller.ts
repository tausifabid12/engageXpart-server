import { Request, Response } from "express";
import { createUser, deleteUserFromDb, findUserByEmail, findUserByPhone, getUserFromDb, updateUserInDb } from "./user.service";
import { generateToken } from "../../utils/jwt";
import User from "./user.model";
import { IUser } from "./user.interface";
import bcrypt from "bcryptjs";
import Order from "../orders/orders.model";
import Lead from "../leads/leads.model";

/**
 * Register a new user
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, phone, password, businessName, businessDescription, isARetailer } = req.body;

        // Check if email already exists
        const existingEmailUser = await findUserByEmail(email);
        if (existingEmailUser) {
            res.status(400).json({ message: "Email is already registered" });
            return;
        }

        // Check if phone number already exists
        const existingPhoneUser = await findUserByPhone(phone);
        if (existingPhoneUser[0]?.userId) {
            res.status(400).json({ message: "Phone number is already registered" });
            return;
        }

        // Ensure all required fields are present
        if (!name || !email || !phone || !password) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create user
        const user: IUser = await createUser({
            ...req.body,
            userId: `EX${phone}`,
            slug: `EX${phone}-${businessName?.toLowerCase()?.replace(/[^a-zA-Z0-9]/g, '-')}`,
            password: hashedPassword
        })

        // Generate JWT token
        const token = generateToken(user.userId, user?.email);

        res.status(201).json({
            success: true,
            data: user,
            token
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { identifier, password } = req.body; // identifier can be email or phone


        console.log(identifier, password, "{{{{{{{{{{{{{{{{{{{{{{{{{{")

        // Check if the user exists (by email or phone)
        // @ts-ignore\
        const user: IUser[] | null = identifier.includes("@")
            ? await findUserByEmail(identifier)
            : await findUserByPhone(identifier);

        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user[0].password);

        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        //Generate JWT token
        const token = generateToken(user[0].userId, user[0]?.email);

        console.log(token)

        res.status(200).json({
            success: true,
            data: user,
            token: token
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    // try {




    try {
        const { id, userId, businessName, slug, name, phone, userType, page = '1', limit = '10' }: any = req.query;

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        const { users, total } = await getUserFromDb(id, userId, businessName, slug, name, phone, userType, skip, limitNum);

        res.status(200).json({
            success: true,
            total,
            currentPage: pageNum,
            totalPages: Math.ceil(total / limitNum),
            data: users
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }







    //     // Extract query parameters
    //     const {
    //         name,
    //         email,
    //         phone,
    //         businessName,
    //         isARetailer,
    //         sortBy = "createdAt",
    //         sortOrder = "desc",
    //         page = "1",
    //         limit = "10",
    //         search,
    //         hidePassword = "false" // Default: false (password is included)
    //     } = req.query;

    //     // Build filter object
    //     const filter: any = {};

    //     if (name) filter.name = new RegExp(name as string, "i"); // Case-insensitive search
    //     if (email) filter.email = new RegExp(email as string, "i");
    //     if (phone) filter.phone = phone;
    //     if (businessName) filter.businessName = new RegExp(businessName as string, "i");
    //     if (isARetailer !== undefined) filter.isARetailer = isARetailer === "true"; // Convert to boolean

    //     // Search across multiple fields
    //     if (search) {
    //         const searchRegex = new RegExp(search as string, "i");
    //         filter.$or = [
    //             { name: searchRegex },
    //             { email: searchRegex },
    //             { phone: searchRegex },
    //             { businessName: searchRegex }
    //         ];
    //     }

    //     // Pagination setup
    //     const pageNumber = parseInt(page as string, 10) || 1;
    //     const pageSize = parseInt(limit as string, 10) || 10;
    //     const skip = (pageNumber - 1) * pageSize;

    //     // Define the fields to be selected
    //     const fieldsToSelect = hidePassword === "true" ? "-password" : ""; // Exclude password if true

    //     // Fetch users with filtering, sorting, and pagination
    //     const users: IUser[] = await User.find(filter)
    //         .select(fieldsToSelect) // Exclude password if requested
    //         .sort({ [sortBy as string]: sortOrder === "desc" ? -1 : 1 })
    //         .skip(skip)
    //         .limit(pageSize);

    //     // Get total count for pagination
    //     const totalUsers = await User.countDocuments(filter);

    //     res.status(200).json({
    //         success: true,
    //         data: users,
    //         meta: {
    //             totalData: totalUsers,
    //             currentPage: pageNumber,
    //             totalPages: Math.ceil(totalUsers / pageSize),
    //         }
    //     });
    // } catch (error: any) {
    //     res.status(500).json({ message: error.message });
    // }
};

// Update a User by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const User = await updateUserInDb(req.params.userId, req.body);
        if (!User) {
            res.status(404).json({ message: "User  not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: User
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
};

// Delete a User by ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const User = await deleteUserFromDb(req.params.id);
        if (!User) {
            res.status(404).json({ message: "User  not found" });
            return;
        }
        res.json({ message: " deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
};



// ========= user statistics

interface BreakdownItem {
    _id: string;
    count: number;
}

const extractSingleCount = (facetResult: any, key: string): number =>
    facetResult[key]?.[0]?.count || 0;

const extractSingleSum = (facetResult: any, key: string): number =>
    facetResult[key]?.[0]?.total || 0;

const convertArrayToMap = (array: BreakdownItem[]): Record<string, number> =>
    array.reduce((acc, { _id, count }) => {
        if (_id) acc[_id] = count;
        return acc;
    }, {} as Record<string, number>);

export const getStatistics = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.query.userId as string;

        const [orderResult] = await Order.aggregate([
            { $match: { userId } },
            {
                $facet: {
                    totalOrders: [{ $count: 'count' }],
                    totalSellAmount: [{ $group: { _id: null, total: { $sum: '$payment.totalAmount' } } }],
                    statusBreakdown: [{ $group: { _id: '$status', count: { $sum: 1 } } }]
                }
            },
            {
                $project: {
                    totalOrders: { $arrayElemAt: ['$totalOrders.count', 0] },
                    totalSellAmount: { $arrayElemAt: ['$totalSellAmount.total', 0] },
                    statusBreakdown: 1
                }
            }
        ]) || {};

        const orderStatistics = {
            totalOrders: orderResult.totalOrders || 0,
            totalSellAmount: orderResult.totalSellAmount || 0,
            statusCount: convertArrayToMap(orderResult.statusBreakdown || [])
        };

        const [leadResult] = await Lead.aggregate([
            { $match: { userId } },
            {
                $facet: {
                    totalLeads: [{ $count: 'count' }],
                    totalCustomers: [
                        { $match: { isCustomer: true } },
                        { $count: 'count' }
                    ],
                    customersByCity: [
                        { $match: { isCustomer: true } },
                        { $group: { _id: '$city', count: { $sum: 1 } } }
                    ],
                    customersByState: [
                        { $match: { isCustomer: true } },
                        { $group: { _id: '$state', count: { $sum: 1 } } }
                    ]
                }
            },
            {
                $project: {
                    totalLeads: { $arrayElemAt: ['$totalLeads.count', 0] },
                    totalCustomers: { $arrayElemAt: ['$totalCustomers.count', 0] },
                    customersByCity: 1,
                    customersByState: 1
                }
            }
        ]) || {};

        const leadStatistics = {
            totalLeads: leadResult.totalLeads || 0,
            totalCustomers: leadResult.totalCustomers || 0,
            customersByCity: convertArrayToMap(leadResult.customersByCity || []),
            customersByState: convertArrayToMap(leadResult.customersByState || [])
        };

        res.status(200).json({
            success: true,
            data: {
                orderStatistics,
                leadStatistics
            }
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics'
        });
    }
};