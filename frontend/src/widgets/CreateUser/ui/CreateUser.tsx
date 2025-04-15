import React, { useState } from 'react'
import { useCreateUserMutation } from '../model/api/UserQuery'


export const CreateUser = () => {
  
    const [createUser] = useCreateUserMutation()
    
    const [ formData, setFormData ] = useState({
        first_name: '',
        last_name: '',
        bio: ''
    })

    const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const submitForm = async (e: any) => {
        e.preventDefault()
        createUser(formData)
    }

    return (
        <>
            <h1>CREATE USER</h1>
            <form onSubmit={submitForm}>
                <input type="text" name='first_name' value={formData.first_name} placeholder='First name' onChange={changeFormData} />
                <input type="text" name='last_name' value={formData.last_name} placeholder='Last name' onChange={changeFormData} />
                <input name='bio' value={formData.bio} placeholder='bio' onChange={changeFormData} />
                <input type="submit" style={{cursor: 'pointer'}} value="Create" />
            </form>
        </>
  )
}