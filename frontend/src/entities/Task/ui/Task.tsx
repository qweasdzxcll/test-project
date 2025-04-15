import { ITaskProps } from '../'
import { useState } from 'react'
import { UpdateTask } from '../../../widgets/UpdateTask/ui/UpdateTask'
import { useDeleteTaskLabel } from '../../../widgets/ListTasks/model/api/DeleteTaskLabel'
import { useAddMarkToTask } from '../../../widgets/ListTasks/model/api/addMarkToTask'

export const Task = ({ task, marks }: ITaskProps) => {

    const deleteTaskLabel = useDeleteTaskLabel()

    const addMarkToTask = useAddMarkToTask()

    const [ isOpen, setIsOpen ] = useState(false)

    const [ taskState, setTaskState ] = useState(task)

    const [activeOption, setActiveOption] = useState('')
    
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setActiveOption(event.target.value)
    }

    const labelOnClick = (task_id: number, label_id: number) => {
        deleteTaskLabel.mutate({task_id, label_id})
        setTaskState(prev => ({
            ...prev,
            task_labels: prev.task_labels.filter(item => item.label.id !== label_id)
          }))
    }

    const addLabel = () => {
        addMarkToTask.mutate({ task_id: taskState.assignee_id, label_id: Number(activeOption) })
    
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
        <>
            <h2>{taskState.title}</h2>
            <p>{taskState.description}</p>
            {
                taskState.task_labels.map(item => <span style={{ color: 'white', marginRight: '10px', padding: '10px', backgroundColor: item.label.color, borderRadius: '8px', cursor: 'pointer' }} key={item.label.id} onClick={() => labelOnClick(taskState.assignee_id, item.label.id)}>{item.label.caption}</span>)
            }
            <select onChange={handleSelectChange}>
                <option>Выберите метку</option>
                {marks &&
                    marks.map(item => <option key={item.id} value={item.id}>{item.caption}</option>)
                }
            </select>
            <button style={{marginLeft: '15px', cursor: 'pointer'}} onClick={() => addLabel()}>Добавить</button>
            <button style={{marginLeft: '15px', cursor: 'pointer'}} onClick={() => setIsOpen(!isOpen)} >Update</button>
            {isOpen &&
                <UpdateTask id={task.assignee_id} />
            }
        </>
    )
}