import { getProductDetailsFromIds } from "../modules/endpoint/endpoint.helper";
import User from "../modules/user/user.model";

/**
 * Facebook Generic Template Element structure
 */
interface FacebookGenericElement {
    title: string;
    image_url?: string;
    subtitle?: string;
    default_action?: {
        type: 'web_url';
        url: string;
        webview_height_ratio?: 'compact' | 'tall' | 'full';
    };
    buttons?: Array<{
        type: 'web_url' | 'postback';
        url?: string;
        title: string;
        payload?: string;
    }>;
}

/**
 * Sends a generic template message via the Facebook Send API
 * @param pageId - The Facebook Page ID
 * @param pageAccessToken - The Page Access Token
 * @param recipientId - The recipient PSID (Page Scoped ID)
 * @param elements - Array of generic template elements
 * @returns The API response in JSON format
 */
export async function sendFacebookGenericTemplate(
    pageId: string,
    pageAccessToken: string,
    recipientId: string,
    productIds: string[],
    userId: string,
    messagingType: string = 'MESSAGE_TAG'
): Promise<any> {
    const url = `https://graph.facebook.com/v15.0/${pageId}/messages?access_token=${pageAccessToken}`;

    const products = await getProductDetailsFromIds(productIds)
    const user = await User.findOne({ userId })

    console.log(user?.slug)


    const payload = {
        "recipient": {
            "id": recipientId
        },
        "message": {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": products?.map(item => {
                        return {
                            "title": item?.name,
                            "image_url": item?.imageUrl[0],
                            "subtitle": `Price : ${item?.offerPrice}/-`,
                            "default_action": {
                                "type": "web_url",
                                "url": "https://www.google.com/",
                                "webview_height_ratio": "tall"
                            },
                            "buttons": [
                                {
                                    "type": "web_url",
                                    // @ts-ignore
                                    "url": `https://engagexpart.com/shop/${user?.slug}/product-details/${item?._id}?customerId=${recipientId}&otherProductIds=${products?.map(it => it?._id).join(',')}`,
                                    "title": "View Details"
                                },
                                {
                                    "type": "web_url",
                                    // @ts-ignore
                                    "url": `https://engagexpart.com/shop/${user?.slug}/product-details/${item?._id}?customerId=${recipientId}&otherProductIds=${products?.map(it => it?._id).join(',')}`,
                                    "title": "Buy Now"
                                }
                            ]
                        }
                    }

                    )

                }
            }
        },
        messaging_type: 'MESSAGE_TAG',
        tag: "ACCOUNT_UPDATE"
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const jsonResponse = await response.json(); // ← read once

        if (!response.ok) {
            console.error('❌ Error response from Facebook API:', jsonResponse);
            // throw new Error(`Error sending message: ${response.status} - ${jsonResponse.error?.message}`);
        }

        return jsonResponse;
    } catch (error) {
        console.error('❌ Error sending generic template:', error);
        throw error;
    }
}






// (async () => {
//     const pageId = 'YOUR_PAGE_ID';
//     const pageAccessToken = 'YOUR_PAGE_ACCESS_TOKEN';
//     const recipientId = 'PSID_OF_THE_USER';

//     const elements: FacebookGenericElement[] = [
//         {
//             title: 'Welcome!',
//             image_url:
//                 'https://raw.githubusercontent.com/fbsamples/original-coast-clothing/main/public/styles/male-work.jpg',
//             subtitle: 'We have the right hat for everyone.',
//             default_action: {
//                 type: 'web_url',
//                 url: 'https://www.originalcoastclothing.com/',
//                 webview_height_ratio: 'tall'
//             },
//             buttons: [
//                 {
//                     type: 'web_url',
//                     url: 'https://www.originalcoastclothing.com/',
//                     title: 'View Website'
//                 },
//                 {
//                     type: 'postback',
//                     title: 'Start Chatting',
//                     payload: 'DEVELOPER_DEFINED_PAYLOAD'
//                 }
//             ]
//         },
//         {
//             title: 'Another product!',
//             image_url: 'https://example.com/another.jpg',
//             subtitle: 'This is another amazing product.',
//             buttons: [
//                 {
//                     type: 'web_url',
//                     url: 'https://www.example.com/product',
//                     title: 'View Product'
//                 }
//             ]
//         }
//     ];

//     try {
//         const response = await sendFacebookGenericTemplate(
//             pageId,
//             pageAccessToken,
//             recipientId,
//             elements
//         );
//         console.log('✅ Generic template sent:', response);
//     } catch (error) {
//         console.error('❌ Error:', error);
//     }
// })();
