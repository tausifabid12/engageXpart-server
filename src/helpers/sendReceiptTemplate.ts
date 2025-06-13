interface Address {
    street_1: string;
    street_2?: string;
    city: string;
    postal_code: string;
    state: string;
    country: string;
}

interface Summary {
    subtotal: number;
    shipping_cost: number;
    total_tax: number;
    total_cost: number;
}

interface Adjustment {
    name: string;
    amount: number;
}

interface Element {
    title: string;
    subtitle?: string;
    quantity: number;
    price: number;
    currency: string;
    image_url: string;
}

interface ReceiptPayload {
    psid: string;
    accessToken: string;
    customerName: string;
    orderNumber: string;
    currency: string;
    paymentMethod: string;
    orderUrl: string;
    timestamp: string;
    address: Address;
    summary: Summary;
    adjustments?: Adjustment[];
    elements: Element[];
}

export async function sendReceiptTemplate({
    psid,
    accessToken,
    customerName,
    orderNumber,
    currency,
    paymentMethod,
    orderUrl,
    timestamp,
    address,
    summary,
    adjustments = [],
    elements
}: ReceiptPayload): Promise<void> {
    const url = `https://graph.facebook.com/v23.0/me/messages?access_token=${accessToken}`;

    const body = {
        recipient: {
            id: psid
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "receipt",
                    recipient_name: customerName,
                    order_number: orderNumber,
                    currency: currency,
                    payment_method: paymentMethod,
                    order_url: orderUrl,
                    timestamp: timestamp,
                    address: {
                        ...address
                    },
                    summary: {
                        ...summary
                    },
                    adjustments: adjustments,
                    elements: elements
                }
            }
        }
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Facebook API Error:", data);
            throw new Error(`Failed to send receipt: ${data.error?.message}`);
        }

        console.log("Receipt sent:", data);
    } catch (error) {
        console.error("Send Receipt Error:", error);
        throw error;
    }
}




// sendReceiptTemplate({
//     psid: "<PSID>",
//     accessToken: "<PAGE_ACCESS_TOKEN>",
//     customerName: "Stephane Crozatier",
//     orderNumber: "12345678902",
//     currency: "USD",
//     paymentMethod: "Visa 2345",
//     orderUrl: "http://originalcoastclothing.com/order?order_id=123456",
//     timestamp: "1428444852",
//     address: {
//         street_1: "1 Hacker Way",
//         city: "Menlo Park",
//         postal_code: "94025",
//         state: "CA",
//         country: "US"
//     },
//     summary: {
//         subtotal: 75.00,
//         shipping_cost: 4.95,
//         total_tax: 6.19,
//         total_cost: 56.14
//     },
//     adjustments: [
//         { name: "New Customer Discount", amount: 20 },
//         { name: "$10 Off Coupon", amount: 10 }
//     ],
//     elements: [
//         {
//             title: "Classic White T-Shirt",
//             subtitle: "100% Soft and Luxurious Cotton",
//             quantity: 2,
//             price: 50,
//             currency: "USD",
//             image_url: "http://originalcoastclothing.com/img/whiteshirt.png"
//         },
//         {
//             title: "Classic Gray T-Shirt",
//             subtitle: "100% Soft and Luxurious Cotton",
//             quantity: 1,
//             price: 25,
//             currency: "USD",
//             image_url: "http://originalcoastclothing.com/img/grayshirt.png"
//         }
//     ]
// });