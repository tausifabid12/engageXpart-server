import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const ALGORITHM = "aes-256-cbc";
const SECRET_KEY = process.env.SECRET_KEY || "your-32-character-secret-key";
const IV = process.env.IV || "your-16-char-iv123"; // 16 characters for AES

if (SECRET_KEY.length !== 32 || IV.length !== 16) {
    throw new Error("SECRET_KEY must be 32 characters and IV must be 16 characters long.");
}

/**
 * Encrypts data using AES-256-CBC.
 * @param text The text to encrypt.
 * @returns Encrypted string in base64 format.
 */
export function encryptData(text: string): string {
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), IV);
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
}

/**
 * Decrypts data using AES-256-CBC.
 * @param encryptedText The encrypted string in base64 format.
 * @returns Decrypted string.
 */
export function decryptData(encryptedText: string): string {
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), IV);
    let decrypted = decipher.update(encryptedText, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
