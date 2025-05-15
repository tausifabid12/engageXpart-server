import { Router } from 'express';
import { handleWebhookData, verifyWebhook } from './endpoint.controller';





const router = Router();

// Route for webhook verification
router.get('/facebook-webhook', verifyWebhook);
// Route for handling webhook events
router.post('/facebook-webhook', handleWebhookData);




// // verification
// router.get('/messenger-webhook', verifyMessengerWebhook);
// //  events
// router.post('/messenger-webhook', handleMessengerWebhookdata);


export default router;