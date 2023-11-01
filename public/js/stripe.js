import Stripe from 'stripe';
const stripe = Stripe("pk_test_51Mp9HDHQr8n2QF2CnNCf4VLUMTTMc9id6rSDESTCs7u4OYBUGs3DD94C0CKaZNQaUYuL3e9bzEHORno5MOnTvqr800gGGF0EQN")
import axios from "axios"
import { showAlert } from './alerts';

export const bookTour = async tourId => {
    try{
        //Get the session from the server
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`, )
    console.log(session)

    //Create a checkout form + charge credit card
    
    }catch(e)  {
            showAlert("error", e)
    }
    

}