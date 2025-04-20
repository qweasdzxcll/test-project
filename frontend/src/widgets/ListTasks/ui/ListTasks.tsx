import { Task } from '../../../entities/'
import { ITasks } from '../../../entities/Task'
import { useContext } from 'react'
import { TasksContext } from '../../../app/context/TasksContext'
import styles from './ListTasks.module.scss'

export const ListTasks = ({ marks }: ITasks) => {

  const { tasks } = useContext(TasksContext)

  return (
    <div className={styles.list_tasks}>
      {tasks && marks &&
        tasks.map(task => <Task marks={marks} task={task} key={task.title} />)
      }
    </div>
  )
}
