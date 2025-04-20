import { useContext, useEffect, useState } from 'react'
import { useSearchTasksRequest, useGetAllTasks } from '../../../app/api/'
import { TasksContext } from '../../../app/context/TasksContext'
import styles from './searchTask.module.scss'

export const SearchTask = () => {
    const { mutate, data } = useSearchTasksRequest();
    const { setTasks } = useContext(TasksContext);
    const { data: tasksData } = useGetAllTasks();

    const [title, setTitle] = useState('');

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (title.trim() !== '') {
                mutate(title);
            } else {
                if (tasksData) {
                    setTasks(Array.isArray(tasksData) ? tasksData : [])
                }
            }
        }, 1000)

        return () => clearTimeout(debounce)
    }, [title, tasksData])

    useEffect(() => {
        if (data !== undefined) {
            const normalizedData = Array.isArray(data) ? data : data ? [data] : []
            if (normalizedData.length === 0 && tasksData) {
                setTasks(Array.isArray(tasksData) ? tasksData : [])
            } else {
                setTasks(normalizedData)
            }
        }
    }, [data, tasksData, setTasks])

    return (
        <div className={styles.form}>
            <input
                type="text"
                name="title"
                id="title"
                placeholder="Введите текст для поиска"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
    );
};