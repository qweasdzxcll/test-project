import { useState } from "react"
import { useUpdateTaskMutation } from "../../ListTasks/model/api/TasksQuery";
import { IUpdateTaskProps } from "../model/types/types";


export const UpdateTask = ({ id }: IUpdateTaskProps) => {

    const [updateTask] = useUpdateTaskMutation()

    /*
        Не разобрался в чем проблема, но при обновлении задачи, просто создается новая
    */

    const [formData, setFormData] = useState({
        id: id,
        updates: {
            title: '',
            description: '',
            label_id: [] as number[]
        }
    })

    const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            updates: {
                ...prev.updates,
                [name]: value
            }
        }));
    };

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault()
        updateTask(formData)
    }

    return (
        <>
            <form onSubmit={submitForm} style={{ marginTop: '30px' }} >
                <input type="text" name='title' value={formData.updates.title} placeholder='title' onChange={changeFormData} />
                <input type="text" name='description' value={formData.updates.description} placeholder='description' onChange={changeFormData} />
                <input type="submit" value="Update" />
            </form>
        </>
    )
}
