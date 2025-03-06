import jwt from "jsonwebtoken";

/**
 * Generate JWT token
 * @param userId - The user's ID
 * @returns JWT token
 */
export const generateToken = (userId: string, email: string): string => {
    return jwt.sign(
        { id: userId, email }, // Storing both userId and email in the token
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
    );
};