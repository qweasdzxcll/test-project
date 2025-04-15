import { Task } from '../../../entities/Task/ui/Task'
import { ITasks } from '../../../entities/Task'

export const ListTasks = ({ data, marks }: ITasks) => {

  return (
    <>
      {data && marks &&
        data.map(task => <Task marks={marks} task={task} key={task.title} />)
      }
    </>
  )
}
