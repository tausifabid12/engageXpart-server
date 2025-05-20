import { IProducts } from "../../types/product.interface";
import { IProduct } from "../product/product.interface";
import Product from "../product/product.model";
import User from "../user/user.model";

interface Category {
    id: string;
    name: string;
}

interface FacebookPage {
    access_token: string;
    category: string;
    category_list: Category[];
    name: string;
    id: string;
    tasks: string[];
}

export async function getPages(accessToken: string): Promise<FacebookPage[]> {
    const res = await fetch(`https://graph.facebook.com/v9.0/me/accounts?access_token=${accessToken}`);

    if (!res.ok) {
        throw new Error(`Error fetching pages: ${res.statusText}`);
    }

    const result = await res.json();

    if (!result.data || !Array.isArray(result.data)) {
        throw new Error("Invalid response format");
    }

    return result.data.map((page: any) => ({
        access_token: page.access_token || "",
        category: page.category || "",
        category_list: page.category_list || [],
        name: page.name || "",
        id: page.id || "",
        tasks: page.tasks || []
    }));
}




// ====================================




interface IPageTokenData {
    access_token: string
    id: string
}

export async function getPagesToken(accessToken: string, pageId: string): Promise<IPageTokenData> {
    const res = await fetch(`https://graph.facebook.com/${pageId}?fields=access_token&access_token=${accessToken}`);

    if (!res.ok) {
        throw new Error(`Error fetching pages: ${res.statusText}`);
    }

    const result = await res.json();

    if (!result) {
        throw new Error("Invalid response format");
    }

    return {
        access_token: result.access_token || "",
        id: result.id || "",
    }
}











// ====================== reply to comment ==================================


interface replyCommentRes {
    id: string
}

export async function replyToComment(
    pageAccessToken: string,
    commentId: string,
    message: string
): Promise<replyCommentRes> {
    const res = await fetch(`https://graph.facebook.com/v22.0/${commentId}/comments?access_token=${pageAccessToken}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message
        })
    });



    const result = await res.json();

    console.log(result, '|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')

    if (!result || !result.id) {
        throw new Error("Invalid response format");
    }

    return { id: result.id };
}






// ============================= check product stock ========================================================



export async function checkProductStock(productIds: string[]): Promise<boolean> {
    const product = await Product.findOne({
        _id: { $in: productIds },
        stock: { $gt: 0 }
    });
    return product !== null;
}



const getProductDetailsFromIds = async (productIds: string[]): Promise<IProduct[]> => {
    try {
        const products = await Product.find({ _id: { $in: productIds } });
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};


// ========================================== send product details message ====================================



interface replyMessage {
    message_id: string
    recipient_id: string
}


export async function sendProductDetailsMessage(
    pageAccessToken: string,
    comment_id: string,
    productIds: string[],
    userId: string,
    customerId: string,

): Promise<replyMessage> {



    const products = await getProductDetailsFromIds(productIds)
    const user = await User.findOne({ userId })

    console.log(user?.slug)


    const payload = {
        "recipient": {
            "comment_id": comment_id
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
                                    "url": `https://engagexpart.com/shop/product-details/${item?._id}?customerId=${customerId}?otherProductIds=${JSON.stringify(products?.map(it => it?._id))}`,
                                    "title": "View Details"
                                },
                                {
                                    "type": "web_url",
                                    "url": `https://engagexpart.com/shop/product-details/${item?._id}?customerId=${customerId}?otherProductIds=${JSON.stringify(products?.map(it => it?._id))}`,
                                    "title": "Buy Now"
                                }
                            ]
                        }
                    }

                    )

                }
            }
        }
    }

    const res = await fetch(`https://graph.facebook.com/v15.0/me/messages?access_token=${pageAccessToken}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();
    if (!result || !result.id) {
        throw new Error("Invalid response format");
    }

    return {
        recipient_id: result.recipient_id,
        message_id: result.message_id,
    };
}




// ============= check keyword
export function containsKeyword(keywords: string[], text: string): boolean {
    return keywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()));
}