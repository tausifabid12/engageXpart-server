import { Request, Response, NextFunction } from "express";
import Subscription from "../modules/subscription/subscription.model";


interface AuthRequest extends Request {
    user?: { id: string }; // Ensuring req.user contains an ID
}

// export const checkSubscription = async (req: AuthRequest, res: Response, next: NextFunction) => {
//     try {
//         if (!req.user || !req.user.id) {
//             return res.status(400).json({ success: false, message: "User authentication failed." });
//         }

//         const subscription = await Subscription.findOne({ userId: req.user.id });

//         if (!subscription) {
//             return res.status(404).json({ success: false, message: "No active subscription found." });
//         }

//         const currentDate = new Date();

//         if (subscription.endDate < currentDate) {
//             subscription.active = false;
//             await subscription.save();

//             return res.status(403).json({
//                 success: false,
//                 message: "Your subscription has expired. Please renew your plan."
//             });
//         }

//         next(); // Subscription is valid, proceed
//     } catch (error: any) {
//         return res.status(500).json({
//             success: false,
//             message: "Server error while checking subscription.",
//             error: error.message
//         });
//     }
// };





export const checkSubscription = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user || !req.user.id) {
            res.status(400).json({ success: false, message: "User authentication failed." });
            return;
        }


        console.log(req.user.id)
        const subscription = await Subscription.findOne({ userId: req.user.id });

        if (!subscription) {
            res.status(404).json({ success: false, message: "No active subscription found." });
            return;
        }

        const currentDate = new Date();

        if (subscription.endDate < currentDate) {
            subscription.active = false;
            await subscription.save();

            res.status(403).json({
                success: false,
                message: "Your subscription has expired. Please renew your plan."
            });
            return;
        }

        next(); // Subscription is valid, proceed
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Server error while checking subscription.",
            error: error.message
        });
    }
};
