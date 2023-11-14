import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51Mp9HDHQr8n2QF2CnNCf4VLUMTTMc9id6rSDESTCs7u4OYBUGs3DD94C0CKaZNQaUYuL3e9bzEHORno5MOnTvqr800gGGF0EQN");


export const handleBookTour = async(tourId) => {
    
        const response = await fetch(`https://natours-e3yq.onrender.com/api/v1/bookings/checkout-session/${tourId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        const data = await response.json()
        if (data && data.session) {
            const sessionId = data.session;
            console.log('Session ID:', sessionId);
            
            // Redirect to Stripe Checkout
            // Assume you have Stripe.js loaded and stripe variable is Stripe instance
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({
                sessionId: sessionId,
            });
        } else {
            // Handle case where we don't get a session ID
            console.error('Session ID not received from the server.');
        }
    
   

}