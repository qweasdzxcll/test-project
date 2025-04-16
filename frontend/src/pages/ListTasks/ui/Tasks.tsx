import { useContext, useEffect } from 'react'
import { ListTasks, CreateUser, CreateMark, CreateTask } from '../../../widgets/'
import { useGetAllMarks } from '../../../widgets/CreateMark/model/api/getAllLabels'
import { useGetAllTasks } from '../../../widgets/ListTasks/model/api/getAllTasks'
import { TasksContext } from '../../../app/context/TasksContext'

export const Tasks = () => {
  const { tasks, setTasks } = useContext(TasksContext)
  const { data, refetch } = useGetAllTasks()
  const { data: marksData, refetch: marksRefetch } = useGetAllMarks()

  useEffect(() => {
    if (data) {
      setTasks(data)
    }
  }, [data])

  console.log(data)

  console.log(tasks)

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