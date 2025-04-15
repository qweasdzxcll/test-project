import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_URL } from '../../../../app/constants'
import { ITasks } from '../../../../entities/Task/model/types/types'
import { ITaskData } from '../types/types'

const createTaskRequest = async (data: ITaskData) => {
  const taskLabelsData = data.label_id.map((id) => ({ label_id: id }));

  const response = await axios.post(BASE_URL, {
    query: `
      mutation CreateTask(
        $title: String!,
        $description: String,
        $labels: [task_labels_insert_input!]!
      ) {
        insert_tasks_one(object: {
          title: $title,
          description: $description,
          task_labels: { data: $labels },
        }) {
          id
          title
          description
          assignee_id
        }
      }
    `,
    variables: {
      title: data.title,
      description: data.description,
      labels: taskLabelsData,
    },
  });
  return response.data.data.insert_tasks_one
}

export const useCreateTask = () => {
  return useMutation<ITasks, Error, ITaskData>({
    mutationFn: createTaskRequest,
  })
}