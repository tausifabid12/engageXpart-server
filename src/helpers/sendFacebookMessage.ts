type Recipient = {
    id?: string;
    user_ref?: string;
    comment_id?: string;
    post_id?: string;
};

type MessagePayload = {
    text?: string;
    attachment?: {
        type: 'audio' | 'file' | 'image' | 'template' | 'video';
        payload: {
            url?: string;
            is_reusable?: boolean;
            template_type?: string;
            elements?: any[]; // Adjust based on your template usage
            [key: string]: any;
        };
    };
    attachments?: {
        type: 'audio' | 'file' | 'image' | 'template' | 'video';
        payload: {
            url?: string;
            is_reusable?: boolean;
            template_type?: string;
            elements?: any[]; // Adjust based on your template usage
            [key: string]: any;
        };
    }[]
    quick_replies?: any[]; // Adjust as needed
    metadata?: string;
};

type SendAPIPayload = {
    recipient: Recipient;
    message?: MessagePayload;
    messaging_type: 'RESPONSE' | 'UPDATE' | 'MESSAGE_TAG';
    notification_type?: 'REGULAR' | 'SILENT_PUSH' | 'NO_PUSH';
    tag?: string;
    sender_action?: 'typing_on' | 'typing_off' | 'mark_seen';
};

type SendAPIResponse = {
    recipient_id: string;
    message_id: string;
};

export async function sendFacebookMessage(
    pageId: string,
    pageAccessToken: string,
    payload: SendAPIPayload
): Promise<SendAPIResponse> {
    const url = `https://graph.facebook.com/v23.0/${pageId}/messages`;

    console.log(JSON.stringify(payload), "[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[");

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...payload,
                access_token: pageAccessToken
            })
        });

        const responseBody = await response.json(); // Read **once**!

        if (!response.ok) {
            // Log the actual error from Facebook
            console.error("Facebook Send API error:", responseBody);
            // throw new Error(
            //     `Facebook Send API error: ${responseBody.error?.message || 'Unknown error'}`
            // );
        }

        // responseBody is your SendAPIResponse type
        return responseBody as SendAPIResponse;
    } catch (error: any) {
        console.error('Error sending Facebook message:', error.message);
        throw error;
    }
}












// example response
// (async () => {
//     // 1️⃣ Simple Text Message
//     try {
//         const response = await sendFacebookMessage(
//             'YOUR_PAGE_ID',
//             'YOUR_PAGE_ACCESS_TOKEN',
//             {
//                 recipient: { id: 'PSID' },
//                 message: { text: 'Hello, world!' },
//                 messaging_type: 'RESPONSE'
//             }
//         );
//         console.log('✅ Text Message sent:', response);
//     } catch (error) {
//         console.error('❌ Text Message error:', error);
//     }

//     // 2️⃣ Attachment Message (Image)
//     try {
//         const response = await sendFacebookMessage(
//             'YOUR_PAGE_ID',
//             'YOUR_PAGE_ACCESS_TOKEN',
//             {
//                 recipient: { id: 'PSID' },
//                 message: {
//                     attachment: {
//                         type: 'image',
//                         payload: {
//                             url: 'https://example.com/image.jpg',
//                             is_reusable: true
//                         }
//                     }
//                 },
//                 messaging_type: 'RESPONSE'
//             }
//         );
//         console.log('✅ Attachment Message sent:', response);
//     } catch (error) {
//         console.error('❌ Attachment Message error:', error);
//     }

//     // 3️⃣ Quick Replies
//     try {
//         const response = await sendFacebookMessage(
//             'YOUR_PAGE_ID',
//             'YOUR_PAGE_ACCESS_TOKEN',
//             {
//                 recipient: { id: 'PSID' },
//                 message: {
//                     text: 'Choose an option:',
//                     quick_replies: [
//                         {
//                             content_type: 'text',
//                             title: 'Option 1',
//                             payload: 'OPTION_1'
//                         },
//                         {
//                             content_type: 'text',
//                             title: 'Option 2',
//                             payload: 'OPTION_2'
//                         }
//                     ]
//                 },
//                 messaging_type: 'RESPONSE'
//             }
//         );
//         console.log('✅ Quick Replies sent:', response);
//     } catch (error) {
//         console.error('❌ Quick Replies error:', error);
//     }

//     // 4️⃣ Sender Action (Typing On)
//     try {
//         const response = await sendFacebookMessage(
//             'YOUR_PAGE_ID',
//             'YOUR_PAGE_ACCESS_TOKEN',
//             {
//                 recipient: { id: 'PSID' },
//                 sender_action: 'typing_on',
//                 messaging_type: 'RESPONSE'
//             }
//         );
//         console.log('✅ Sender Action (typing_on) sent:', response);
//     } catch (error) {
//         console.error('❌ Sender Action error:', error);
//     }

//     // 5️⃣ Message with Tag (outside 24-hour window)
//     try {
//         const response = await sendFacebookMessage(
//             'YOUR_PAGE_ID',
//             'YOUR_PAGE_ACCESS_TOKEN',
//             {
//                 recipient: { id: 'PSID' },
//                 message: { text: 'Here is your account update.' },
//                 messaging_type: 'MESSAGE_TAG',
//                 tag: 'ACCOUNT_UPDATE'
//             }
//         );
//         console.log('✅ Message with Tag sent:', response);
//     } catch (error) {
//         console.error('❌ Message with Tag error:', error);
//     }
// })();
