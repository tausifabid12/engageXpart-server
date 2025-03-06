import crypto from "crypto";



export const decryptRequest = (body: any, privateKey: any) => {
    const { encrypted_aes_key, encrypted_flow_data, initial_vector } = body;

    const decryptedAesKey = crypto.privateDecrypt(
        {
            key: crypto.createPrivateKey({
                key: privateKey,
                passphrase: "g746fXi|!5b9<735", // Add passphrase here
            }),
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(encrypted_aes_key, "base64")
    );
    const flowDataBuffer = Buffer.from(encrypted_flow_data, "base64");
    const initialVectorBuffer = Buffer.from(initial_vector, "base64");

    const TAG_LENGTH = 16;
    const encryptedFlowBody = flowDataBuffer.subarray(0, -TAG_LENGTH);
    const encryptedFlowTag = flowDataBuffer.subarray(-TAG_LENGTH);

    const decipher = crypto.createDecipheriv(
        "aes-128-gcm",
        decryptedAesKey,
        initialVectorBuffer
    );
    decipher.setAuthTag(encryptedFlowTag);

    const decryptedJSONString = Buffer.concat([
        decipher.update(encryptedFlowBody),
        decipher.final(),
    ]).toString("utf-8");

    return {
        decryptedBody: JSON.parse(decryptedJSONString),
        aesKeyBuffer: decryptedAesKey,
        initialVectorBuffer,
    };
};

export const encryptResponse = (
    response: any,
    aesKeyBuffer: any,
    initialVectorBuffer: any
) => {
    const flippedIV = Buffer.from(initialVectorBuffer.map((byte: any) => ~byte));

    const cipher = crypto.createCipheriv("aes-128-gcm", aesKeyBuffer, flippedIV);
    const encryptedResponse = Buffer.concat([
        cipher.update(JSON.stringify(response), "utf-8"),
        cipher.final(),
    ]);

    return Buffer.concat([
        encryptedResponse,
        cipher.getAuthTag(),
    ]).toString("base64");
};



