const Cashfree = require('cashfree-sdk');

// Initialize Cashfree
const cashfree = new Cashfree({
  apiKey: process.env.CASHFREE_API_KEY,
  apiSecret: process.env.CASHFREE_API_SECRET,
  environment: 'PRODUCTION', // or "SANDBOX"
});

// Create a checkout session
export async function createCheckoutSession(orderDetails) {
  try {
    const response = await cashfree.payments.createOrder({
      order_id: orderDetails.orderId,
      order_amount: orderDetails.amount,
      order_currency: 'INR',
      customer_details: {
        customer_id: orderDetails.customerId,
        customer_email: orderDetails.email,
        customer_phone: orderDetails.phone,
      },
      order_meta: {
        notify_url: `${process.env.BASE_URL}/api/cashfree/webhook`,
        return_url: `${process.env.BASE_URL}/payment-success`,
      },
    });

    return response;
  } catch (error) {
    console.error('Cashfree checkout error:', error);
    throw error;
  }
}

module.exports = { createCheckoutSession };
