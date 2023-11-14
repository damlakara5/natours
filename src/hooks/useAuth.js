import { useMutation } from "@tanstack/react-query"
import { login as loginApi, signup as signupApi} from "../services/authApi"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useUser } from "../context/userContext"

export const useAuth = () => {
    const navigate = useNavigate()
    const { setUser } = useUser();


    const { mutate: signup} = useMutation({
        mutationFn: signupApi,
        mutationKey: ["signup"],
        onSuccess: (data) => {
            localStorage.setItem("jwt", data.token)
            localStorage.setItem('userData', JSON.stringify(data.data.user));
            setUser(data.data.user)
        },
        onError: () => toast.error("Incorrect email or password")

    })
    const { mutate:login} = useMutation({
        mutationFn: (reqData) => loginApi(reqData),
        mutationKey: ["login"],
        onSuccess: (data) => {
            localStorage.setItem("jwt", data.token)
            localStorage.setItem('userData', JSON.stringify(data.data.user));
            setUser(data.data.user)
            navigate("/")
        },
        onError: () => toast.error("Incorrect email or password")

    })

    return {signup, login}
}