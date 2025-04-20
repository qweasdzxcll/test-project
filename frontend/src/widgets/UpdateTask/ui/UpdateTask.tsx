import { useContext, useState } from "react"
import { useUpdateTask } from "../../../app/api";
import { IUpdateTaskProps } from "../";
import { TasksContext } from "../../../app/context/TasksContext";
import styles from './UpdateTask.module.scss'


export const UpdateTask = ({ id, task }: IUpdateTaskProps) => {

    const updateTask = useUpdateTask()

    const { setTasks } = useContext(TasksContext)

    const [formData, setFormData] = useState({
        id: id,
        updates: {
            title: task.title,
            description: task.description,
            assignee_id: task.assignee_id
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
        }))
    }

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault()
        updateTask.mutate(formData, {
            onSuccess: () => setTasks((prev) => prev.map(item => item.id == id ? { ...item, ...formData.updates } : item))
        })
    }

    return (
        <>
            <form onSubmit={submitForm} className={styles.form} >
                <input type="text" name='title' value={formData.updates.title} placeholder='title' onChange={changeFormData} />
                <input type="text" name='description' value={formData.updates.description} placeholder='description' onChange={changeFormData} />
                <input type="number" name='assignee_id' placeholder='User' value={formData.updates.assignee_id} onChange={changeFormData} />
                <input type="submit" style={{ cursor: 'pointer' }} value="Update" />
            </form>
        </>
    )
}
