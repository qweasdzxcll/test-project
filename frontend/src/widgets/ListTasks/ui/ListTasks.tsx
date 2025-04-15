import React from 'react'
import { Task } from '../../../entities/Task/ui/Task'
import { ITasks } from '../../../entities/Task'
import { useGetAllMarksQuery } from '../../CreateMark/model/api/MarksQuery'

export const ListTasks: React.FC<ITasks> = ({ data }) => {
  const { data: marksData } = useGetAllMarksQuery()
  
  return (
    <>
      {data && data.tasks && marksData &&
        data.tasks.map(task => <Task marks={marksData} task={task} key={task.title} />)
      }
    </>
  )
}
