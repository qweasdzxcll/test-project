import { ITaskProps } from '../'
import { useState } from 'react'
import { UpdateTask } from '../../../widgets/UpdateTask/ui/UpdateTask'
import { useDeleteTaskLabel, useAddMarkToTask } from '../../../app/api'
import styles from './task.module.scss'

export const Task = ({ task, marks }: ITaskProps) => {

    const [ isOpenDelete, setIsOpenDelete ] = useState(false)
    const [ deleteLabel, setDeleteLabel ] = useState({ id: 0, title: '' })
    const deleteTaskLabel = useDeleteTaskLabel()
    const addMarkToTask = useAddMarkToTask()
    const [isOpen, setIsOpen] = useState(false)
    const [taskState, setTaskState] = useState(task)
    const [activeOption, setActiveOption] = useState('')
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setActiveOption(event.target.value)
    }

    const confirmDelete = () => {
        if (isOpenDelete) {
            deleteTaskLabel.mutate({ task_id: task.id, label_id: deleteLabel.id }, {
                onSuccess: () => {
                    setIsOpenDelete(false)
                    setTaskState(prev => ({
                        ...prev,
                        task_labels: prev.task_labels.filter(item => item.label.id !== deleteLabel.id)
                    }))
                }
            })
        }
    }

    const clickLabel = (id: number, title: string) => {
        setIsOpenDelete(true)
        setDeleteLabel({ id, title})
    }

    const addLabel = () => {
        addMarkToTask.mutate({ task_id: taskState.id ? taskState.id : 0, label_id: Number(activeOption) })
        const newLabel = marks.find(label => label.id === Number(activeOption))
        if (newLabel) {
            setTaskState((prev: any) => ({
                ...prev,
                task_labels: [
                    ...prev.task_labels,
                    { label: newLabel }
                ]
            }))
        }
    }

    return (
        <div className={styles.task}>
            <h2>{taskState.title} - {taskState.user && taskState.user.last_name} {taskState.user && taskState.user.first_name}</h2>
            <p>{taskState.description}</p>
            {
                taskState.task_labels.map(item => <span className={styles.label} style={{ backgroundColor: item.label.color }} key={item.label.id} onClick={() => clickLabel(item.label.id, item.label.caption)}>{item.label.caption}</span>)
            }
            <select onChange={handleSelectChange}>
                <option>Выберите метку</option>
                {marks &&
                    marks.map(item => <option key={item.id} value={item.id}>{item.caption}</option>)
                }
            </select>
            <button style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => addLabel()}>Добавить</button>
            <button style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)} >Update</button>
            {isOpenDelete &&
                <div className={styles.delete_form}>
                    <h2>Вы точно хотите удалить {deleteLabel.title}?</h2>
                    <button style={{marginRight: '20px'}} onClick={() => {setIsOpenDelete(false), confirmDelete()}}>Да</button>
                    <button onClick={() => setIsOpenDelete(false)}>Нет</button>
                </div>
            }
            {isOpen &&
                <UpdateTask id={task.id} task={taskState} />
            }
        </div>
    )
}