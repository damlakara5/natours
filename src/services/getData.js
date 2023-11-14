export const getAllTours = async() => {
    const res = await fetch(`https://natours-e3yq.onrender.com/api/v1/tours`, {
        headers: {
            'Content-Type': 'application/json',
            'Content-Encoding' : "gzip",
            'Authorization':  localStorage.getItem("jwt")
          },
    })
    let data;
    if(res.status === 200){

        data = await res.json()
    }
   
    return data
}

export const getTour = async(id) => {
    const res = await fetch(`https://natours-e3yq.onrender.com/api/v1/tours/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Content-Encoding' : "gzip",
            'Authorization':  localStorage.getItem("jwt")
          },
    })
    let data;
    if(res.status === 200){

        data = await res.json()
    }
   
    return data
}
export const getReviews = async({ queryKey }) => {
    const [_, id] = queryKey

    const res = await fetch(`https://natours-e3yq.onrender.com/api/v1/users/${id}/reviews`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    })

    let data
    if(res.status === 200){

        data = await res.json()
    }
   
    return data
}

export const getTopFive = async() => {
    const res = await fetch(`https://natours-e3yq.onrender.com/api/v1/tours/top-5-cheap`, {
        headers: {
            'Content-Type': 'application/json',
            'Content-Encoding' : "gzip",
            'Authorization':  localStorage.getItem("jwt")
          },
    })
    let data;
    if(res.status === 200){

        data = await res.json()
    }
   
    return data
}

export const getWithin = async(params) => {
    const res = await fetch(`https://natours-e3yq.onrender.com/api/v1/tours/tours-within/${params.distance}/center/${params.location}/unit/${params.unit || "mi"}`, {
        headers: {
            'Content-Type': 'application/json',
            'Content-Encoding' : "gzip",
            'Authorization':  localStorage.getItem("jwt")
          },
    })
    let data;
    if(res.status === 200){

        data = await res.json()
    }
   
    return data
}

export const getBookings = async() => {
    const res = await fetch(`https://natours-e3yq.onrender.com/api/v1/bookings/my-tours`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    })
    let data;
    if(res.status === 200){

        data = await res.json()
    }
   
    return data
}
export const getFavs = async() => {
    const res = await fetch(`https://natours-e3yq.onrender.com/api/v1/favorites`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    })
    let data;
    if(res.status === 200){

        data = await res.json()
    }
   
    return data
}


export const setFavs = async(id) => {
  
    const res = await  fetch(`https://natours-e3yq.onrender.com/api/v1/favorites/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    })
    const data = await res.json()

                
    return data
}
export const createReviewOnTour = async({id, reqData}) => {
  
    const res = await  fetch(`https://natours-e3yq.onrender.com/api/v1/tours/${id}/reviews`, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${localStorage.getItem("jwt")}`
          },
        body: JSON.stringify(reqData)
    })
    let data;
    if(res.status === 200){

        data = await res.json()
    }
   
    return data
}
export const editReview = async({id, reqData}) => {
  
    const res = await  fetch(`https://natours-e3yq.onrender.com/api/v1/reviews/${id}`, {
        method:"PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${localStorage.getItem("jwt")}`
          },
        body: JSON.stringify(reqData)
    })
    let data;
    if(res.status === 200){

        data = await res.json()
    }
   
    return data
}
export const deleteReview = async({id}) => {
  
    const res = await  fetch(`https://natours-e3yq.onrender.com/api/v1/reviews/${id}`, {
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${localStorage.getItem("jwt")}`
          },
    })
    let data;
    if(res.status === 200){

        data = await res.json()
    }
   
    return data
}