import React from 'react'
import { ListTasks, CreateUser, CreateMark, CreateTask } from '../../../widgets/'
import { useGetAllTasksQuery } from '../../../widgets/ListTasks/model/api/TasksQuery'

export const Tasks: React.FC = () => {

  const { data, refetch } = useGetAllTasksQuery()

  return (
    <>
      <CreateMark />
      <CreateTask refetch={refetch} />
      <CreateUser />
      {data &&
        <ListTasks data={data.data} />
      }
    </>
  )
}