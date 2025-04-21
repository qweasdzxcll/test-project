import { useContext, useEffect } from 'react'
import { ListTasks, Header } from '../../../widgets'
import { useGetAllLabels, useGetAllTasks } from '../../../app/api'
import { TasksContext } from '../../../app/context/TasksContext'
import styles from './ListTasks.module.scss'

export const Tasks = () => {
  const { setTasks } = useContext(TasksContext)
  const { data, refetch } = useGetAllTasks()
  const { data: marksData, refetch: marksRefetch } = useGetAllLabels()

  useEffect(() => {
    if (data) {
      setTasks(data)
    }
  }, [data])

  return (
    <div className={styles.container}>
      <Header marksRefetch={marksRefetch} refetch={refetch} />
      {marksData &&
        <ListTasks marks={marksData} />
      }
    </div>
  )
}