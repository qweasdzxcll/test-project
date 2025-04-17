import { useContext, useEffect } from 'react'
import { ListTasks, CreateUser, CreateMark, CreateTask } from '../../../widgets/'
import { useGetAllLabels, useGetAllTasks } from '../../../app/api'
import { TasksContext } from '../../../app/context/TasksContext'

export const Tasks = () => {
  const { tasks, setTasks } = useContext(TasksContext)
  const { data, refetch } = useGetAllTasks()
  const { data: marksData, refetch: marksRefetch } = useGetAllLabels()

  useEffect(() => {
    if (data) {
      setTasks(data)
    }
  }, [data])

  return (
    <>
      <CreateMark refetch={marksRefetch} />
      <CreateTask refetch={refetch} />
      <CreateUser />
      {marksData &&
        <ListTasks marks={marksData} />
      }
    </>
  )
}