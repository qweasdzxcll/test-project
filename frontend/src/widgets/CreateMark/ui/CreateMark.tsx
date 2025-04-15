import React, { useState } from 'react'
import { useCreateMark } from '../model/api/CreateLabel'

export const CreateMark = ({ refetch }: { refetch: () => void }) => {

    const createMark = useCreateMark()

    const [formData, setFormData] = useState({
        caption: '',
        color: ''
    })

    const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const submitForm = (e: any) => {
        e.preventDefault()
        createMark.mutate(formData, {
            onSuccess: () => {
                refetch()
                setFormData({
                    caption: '',
                    color: ''
                })
            }
        })
    }

    return (
        <>
            <h1>CREATE MARK</h1>
            <form onSubmit={submitForm} >
                <input type="text" name='caption' value={formData.caption} placeholder='caption' onChange={changeFormData} required />
                <input type="text" name='color' value={formData.color} placeholder='color' onChange={changeFormData} required />
                <input type="submit" style={{cursor: 'pointer'}} value="Create" />
            </form>
        </>
    )
}
