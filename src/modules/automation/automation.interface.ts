

export interface IAutomation {
    userId: string
    pageId: string;
    postId: string;
    postUrl: string;
    postContent: string;
    postImageUrl: string;
    keywords: string[];
    commentReplies: string[];
    outOfStockReplies: string[];
    automationType: "Product_automation" | "content_automation"
    productsIds: string[]


}