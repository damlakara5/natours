import React, { useEffect,  useState } from 'react'
import { useUser } from '../context/userContext'
import { Form, NavLink } from 'react-router-dom'
import {BsGear, BsHandbag, BsStar, BsCurrencyDollar} from "react-icons/bs"
import Sidebar from './ui/Sidebar'
import Main from './ui/Main'
import GreenButton from './ui/GreenButton'
import FormGroup from './ui/FormGroup'

const User = () => {
    const {user, setUser} = useUser()
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [currentPassword, setCurrentPassword] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setConfirmPassword] = useState()
    const [selectedFile, setSelectedFile] = useState(null);


    useEffect(() => {
        const handleReq = async() => {
            const res = await fetch("https://natours-e3yq.onrender.com/api/v1/users/me", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                }
            })
    
            const data = await res.json()
        }
        handleReq()
    } , [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append("name",name)
        form.append("email",email)
        form.append("photo",selectedFile)
        

        const res = await fetch("https://natours-e3yq.onrender.com/api/v1/users/updateMe", {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: form
        })

        const data = await res.json()
        setUser(data.data.user)
        localStorage.setItem("userData", JSON.stringify(data.data.user))
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setSelectedFile(file);
        }
      };

    const handlePasswordChange = (e) => {
        e.preventDefault()
        const data = {  
            password,
            passwordConfirm,
            passwordCurrent: currentPassword
        }

        const res = fetch("https://natours-e3yq.onrender.com/api/v1/users/updateMyPassword", {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify(data)
        })

        console.log(res)
    }

    if(!user) return <p>Please log in</p>

  return (
        <Main >
            <Sidebar active="Settings" />
            <div class="user-view__content">
                    <div class="user-view__form-container md:px-20 px-10">
                        <h2 class="heading-secondary ma-bt-md">Your account settings</h2>
                        <form class="form form-user-data"  onSubmit={handleSubmit}>
                            
                            <FormGroup  label="Name" handleChange={setName} inputType="text" name="name" value={name}  />
                            <FormGroup  label="Email Address" handleChange={setEmail} inputType="email" name="email" value={email}  />
                            
                            <div class="form__group form__photo-upload">
                                <img class="form__user-photo" src={`https://natours-e3yq.onrender.com/img/users/${user.photo}`} alt="User" />
                                <input class="form__upload" type="file" accept="image/*" id="photo" name="photo" onChange={handleFileChange}/>
                                <label for="photo">Choose new photo</label>
                            </div>
                            <div class="form__group right">
                                <GreenButton label="Save settings" />
                            </div>
                        </form>
                    </div>
                    <div class="line">&nbsp;</div>
                    <div class="user-view__form-container md:px-20 px-10">
                        <h2 class="heading-secondary ma-bt-md">Password change</h2>
                        <form class="form form-user-password" onSubmit={handlePasswordChange}>
                          
                            <FormGroup  label="Current password" handleChange={setCurrentPassword} inputType="password" name="password-current" value={currentPassword} placeholder="••••••••" minLength="8"  />
                            <FormGroup  label="New password" handleChange={setPassword} inputType="password" name="password" value={password} placeholder="••••••••" minLength="8"  />
                            <FormGroup  label="Confirm password" handleChange={setConfirmPassword} inputType="password" name="password" value={passwordConfirm} placeholder="••••••••" minLength="8"  />

                            <div class="form__group right">
                                <GreenButton  label="Save password" />
                            </div>
                        </form>
                    </div>
                </div>
        </Main>
  )
}

export default User