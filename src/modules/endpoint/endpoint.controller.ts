import { Request, Response } from 'express';
import crypto from 'crypto';
import axios from 'axios';
import Automation from '../automation/automation.model';
import Account from '../accounts/accounts.model';
import { checkProductStock, containsKeyword, getPagesToken, replyToComment, sendProductDetailsMessage } from './endpoint.helper';
import { getRandomItem } from '../../helpers/getRandomItemFromArray';
import Lead from '../leads/leads.model';
import Message from '../message/message.model';
import { chownSync } from 'fs';

const VERIFY_TOKEN = "your_verify_token";

// Webhook Verification
export function verifyWebhook(req: Request, res: Response): any {
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
}

// // Handle Webhook Data (Page Events)
export async function handleWebhookData(req: Request, res: Response): Promise<any> {
    let body = req.body;

    console.log(req.body, 'body')
    if (body.object === "page") {
        console.log(body.object, 'page')


        let entry = body.entry[0]

        console.log(entry)

        // *********************************** Comment Automation Process start ***********************************************
        if (entry.changes && entry.changes?.length) {


            let webhookEvent = entry.changes[0];
            console.log(webhookEvent, 'page      ++++++++++++ entry')


            if (webhookEvent?.field == 'feed' && webhookEvent?.value?.item == 'comment') {

                let customerId = webhookEvent?.value?.from?.id
                let customerName = webhookEvent?.value?.from?.name
                let comment = webhookEvent?.value?.message
                let comment_id = webhookEvent?.value?.comment_id
                let post_id = webhookEvent?.value?.post_id

                //============= find automation

                const automation = await Automation.find({ postId: post_id })


                let userId = automation[0]?.userId
                let pageId = automation[0]?.pageId
                let replies = automation[0]?.commentReplies
                let outOfStockReplies = automation[0]?.outOfStockReplies
                let automationType = automation[0]?.automationType
                let productsIds = automation[0]?.productsIds
                let keywords = automation[0]?.keywords



                if (customerId == pageId) {
                    console.log('same page comment +++++++++++++++++++++++++++++++++++++++++++++++++++++++')
                    res.sendStatus(200);
                    return
                }

                //    ======================================= check if comment has any  keyword ===========================


                const isKeywordExists = containsKeyword(keywords, comment)
                console.log(isKeywordExists, keywords, comment, '||||||||||||| isKeywordExists ++++++++++++++++++ |||||||||||||||')



                if (isKeywordExists) {


                    let replyMessageArray = replies

                    if (automationType == 'Product_automation') {
                        let isStockAvailable = await checkProductStock(productsIds)

                        console.log(isStockAvailable, 'isStockAvailable ||||||||||')
                        if (!isStockAvailable) {
                            replyMessageArray = outOfStockReplies
                        }
                    }

                    // ========= find user account for access token======================================

                    let accountData = await Account.find({ userId });

                    console.log(accountData, "accountData |||||||||||||||")
                    let account_accessToken = accountData[0]?.accessToken

                    // ================ get all pages with page access token=============================
                    let pageData = accountData[0]?.pages?.find(item => item.id == pageId)
                    console.log(pageData, "pageData |||||||||||||||")
                    const pageAccessToken = pageData?.access_token



                    // const pageData = await getPagesToken(accessToken, pageId)
                    // const pageAccessToken = pageData?.access_token









                    // ============================== reply to comment===================================
                    let randomReplyMessage = getRandomItem(replyMessageArray)
                    const result = await replyToComment(pageAccessToken as string, comment_id, randomReplyMessage)
                    console.log(result, '||||||||||||| result ++++++++++++++++++ |||||||||||||||')



                    //=============================== send product details message =====================
                    const messageResult = await sendProductDetailsMessage(pageAccessToken as string, comment_id, productsIds)
                    console.log(messageResult, ' messageResult||||||||||||| ++++++++++++++++++ |||||||||||||||',)



                }








                // ==================== save commenter as a lead

                let leadsData = await Lead.find({ profileId: customerId });



                console.log(leadsData, '|||||||||||||||||||')

                if (leadsData && leadsData[0]?._id) {
                    let newLead = {
                        name: customerName,
                        profileId: customerId,
                        email: "",
                        phone: "",
                        profileUrl: "",
                        interestedPostIds: [...leadsData[0]?.interestedPostIds, post_id],
                        interestedProductId: [...leadsData[0]?.interestedProductId, ...productsIds],
                        isCustomer: false,
                        orderCount: 0,
                        orderIds: [],
                        address: "",
                        state: "",
                        city: "",
                        source: "facebook"
                    }

                    Lead.findByIdAndUpdate(leadsData[0]?._id, newLead, { new: true });

                } else {
                    let newLead = {
                        name: customerName || "",
                        profileId: customerId,
                        email: "",
                        phone: "",
                        profileUrl: "",
                        interestedPostIds: [post_id],
                        interestedProductId: productsIds,
                        isCustomer: false,
                        orderCount: 0,
                        orderIds: [],
                        address: "",
                        state: "",
                        city: "",
                        source: "facebook"
                    }
                    await Lead.create(newLead);
                }




            }
            res.sendStatus(200);
            return

        }



        // ***********************************  automation Process end ***********************************************


        // ================================== handle message ==========================================
        // if (entry.messaging && entry.messaging?.length) {
        //     let messagingData = req.body?.entry[0]?.messaging[0]
        //     const time = messagingData?.time
        //     const senderId = messagingData?.sender?.id
        //     const recipientId = messagingData?.recipient?.id
        //     const messageId = messagingData?.message?.mid
        //     const message = messagingData?.message?.text

        //     let accountData = await Account.find({ profileId: recipientId });
        //     const userId = accountData[0]?.userId
        //     const username = accountData[0]?.name

        //     //============= check if user is a lead ======================
        //     let leadsData = await Lead.find({ profileId: senderId });
        //     let leadName = leadsData[0]?.name

        //     if (leadName) {

        //         //============== check for previous messages
        //         let oldMessageData = await Message.find({ senderProfileId: senderId });
        //         let messageData
        //         if (oldMessageData[0]?._id) {
        //             let oldMessages = oldMessageData[0]?.messages
        //             messageData = {
        //                 "userId": userId,
        //                 "userName": username,
        //                 "receiverProfileId": recipientId,
        //                 "senderProfileId": senderId,
        //                 "senderName": "Alice Smith",
        //                 messages: [...oldMessages,
        //                 {
        //                     messageText: message,
        //                     imageUrl: "",
        //                     videoUrl: "",
        //                     type: "text",
        //                     messageId: messageId,
        //                     isSeen: false,
        //                     time: time,
        //                     echo: false
        //                 }]
        //             }


        //             await Message.findByIdAndUpdate(oldMessageData[0]?._id, messageData, { new: true });
        //         } else {
        //             messageData = {
        //                 "userId": userId,
        //                 "userName": username,
        //                 "receiverProfileId": recipientId,
        //                 "senderProfileId": senderId,
        //                 "senderName": "Alice Smith",
        //                 messages: [
        //                     {
        //                         messageText: message,
        //                         imageUrl: "",
        //                         videoUrl: "",
        //                         type: "text",
        //                         messageId: messageId,
        //                         isSeen: false,
        //                         time: time,
        //                         echo: false
        //                     }
        //                 ]
        //             }
        //             await Message.create(messageData);
        //         }


        //     }





        // }








    } else {
    }


    res.sendStatus(200);
}










































