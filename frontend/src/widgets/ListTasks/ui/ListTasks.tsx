import { Task } from '../../../entities/'
import { ITasks } from '../../../entities/Task'
import { useContext } from 'react'
import { TasksContext } from '../../../app/context/TasksContext'

export const ListTasks = ({ marks }: ITasks) => {

  const { tasks } = useContext(TasksContext)

  return (
    <div>
      {tasks && marks &&
        tasks.map(task => <Task marks={marks} task={task} key={task.title} />)
      }
    </div>
  )
}
