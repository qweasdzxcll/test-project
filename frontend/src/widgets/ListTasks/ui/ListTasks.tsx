import { Task } from '../../../entities/Task/ui/Task'
import { ITasks } from '../../../entities/Task'
import { useContext } from 'react'
import { TasksContext } from '../../../app/context/TasksContext'

export const ListTasks = ({ marks }: ITasks) => {

  const { tasks } = useContext(TasksContext)

  return (
    <>
      {tasks && marks &&
        tasks.map(task => <Task marks={marks} task={task} key={task.title} />)
      }
    </>
  )
}
