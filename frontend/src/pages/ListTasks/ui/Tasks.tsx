import { ListTasks, CreateUser, CreateMark, CreateTask } from '../../../widgets/'
import { useGetAllMarks } from '../../../widgets/CreateMark/model/api/getAllLabels'
import { useGetAllTasks } from '../../../widgets/ListTasks/model/api/getAllTasks'

export const Tasks = () => {

  const { data, refetch } = useGetAllTasks()
  const { data: marksData, refetch: marksRefetch } = useGetAllMarks()

  return (
    <>
      <CreateMark refetch={marksRefetch} />
      <CreateTask refetch={refetch} />
      <CreateUser />
      {data &&
        <ListTasks data={data} marks={marksData} />
      }
    </>
  )
}