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

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Facebook Send API error: ${errorData.error?.message || 'Unknown error'}`
            );
        }

        const data: SendAPIResponse = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error sending Facebook message:', error.message);
        throw error;
    }
}
