import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { ITasks } from '../../../../entities/Task/model/types/types'
import { ITaskData } from '../types/types'

const createTaskRequest = async (data: ITaskData) => {
  const taskLabelsData = data.label_id.map((id) => ({ label_id: id }));

  const response = await axios.post(import.meta.env?.VITE_BASE_URL, {
    query: `
      mutation CreateTask(
        $title: String!,
        $description: String,
        $labels: [task_labels_insert_input!]!,
        $user: users_obj_rel_insert_input!
      ) {
        insert_tasks_one(object: {
          title: $title,
          description: $description,
          task_labels: { data: $labels },
          user: $user
        }) {
          id
          title
          description
          assignee_id
          user
        }
      }
    `,
    variables: {
      title: data.title,
      description: data.description,
      labels: taskLabelsData,
      user: data.user
    },
  });
  return response.data.data.insert_tasks_one
}

export const useCreateTask = () => {
  return useMutation<ITasks, Error, ITaskData>({
    mutationFn: createTaskRequest,
  })
}