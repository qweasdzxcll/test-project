import { Task } from '../../../entities/Task/ui/Task'
import { ITasks } from '../../../entities/Task'
import { useGetAllMarks } from '../../CreateMark/model/api/getAllLabels'

export const ListTasks = ({ data, marks }: ITasks) => {

  return (
    <>
      {data && marks &&
        data.map(task => <Task marks={marks} task={task} key={task.title} />)
      }
    </>
  )
}
