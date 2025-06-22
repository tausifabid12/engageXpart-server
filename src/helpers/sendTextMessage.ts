

interface Recipient {
    id: string;
}

interface Message {
    text: string;
}

interface SendMessagePayload {
    recipient: Recipient;
    messaging_type: 'RESPONSE' | 'UPDATE' | 'MESSAGE_TAG';
    message: Message;
    tag?: 'ACCOUNT_UPDATE' | 'CONFIRMED_EVENT_UPDATE' | 'CUSTOMER_FEEDBACK' | 'HUMAN_AGENT' | 'POST_PURCHASE_UPDATE';
}

interface SendMessageResponse {
    recipient_id: string;
    message_id: string;
}



export async function sendTextMessage(PAGE_ID: string, PSID: string, PAGE_ACCESS_TOKEN: string, message: string) {
    try {

        const payload: SendMessagePayload = {
            recipient: { id: PSID },
            messaging_type: 'RESPONSE',
            message: {
                text: message,
            },
        };

        const response = await fetch(`https://graph.facebook.com/v23.0/${PAGE_ID}/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            // throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: SendMessageResponse = await response.json();
        console.log('✅ Message sent successfully:');
    } catch (error) {
        console.error('❌ Error sending message: ===============================', error);
    }
}


