export const signup = async({emailRef, passwordRef, passwordConfirmRef,nameRef}) => {

    
   
    const reqData = {
        email : emailRef.current.value,
        password : passwordRef.current.value,
        passwordConfirm : passwordConfirmRef.current.value,
        name : nameRef.current.value,
    }
    const res = await fetch("https://natours-e3yq.onrender.com/api/v1/users/signup", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(reqData)
    })

    const data = await res.json()

   return data
}
export const login = async(reqData) => {


    const res = await fetch("https://natours-e3yq.onrender.com/api/v1/users/login", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(reqData)
    })

    const data = await res.json()

   return data
}