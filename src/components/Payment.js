import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Payment =() => {
    const navigate = useNavigate()

    useEffect( () => {
        const params = new URLSearchParams(window.location.search);
        const tour = params.get('tour');
        const user = params.get('user');
        const price = params.get('price');
        const handleFetch = async() => {
            if (tour && user && price) {
                const res = await  fetch(`https://natours-e3yq.onrender.com/api/v1/bookings/my-tours?tour=${tour}&user=${user}&price=${price}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                    }
                })
                const data = await res.json()
                if(data.status === "success"){
                    navigate("/my-bookings")
                }

            }
        }
        handleFetch()
    } , [navigate])
 
}

export default Payment