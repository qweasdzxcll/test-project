import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { ITasks } from '../../entities/Task'
import { ITaskData } from '../../widgets/ListTasks/model/types/types'

const createTaskRequest = async (data: ITaskData) => {
  const taskLabelsData = data.label_id.map((id) => ({ label_id: id }));

  const response = await axios.post(import.meta.env?.VITE_BASE_URL, {
    query: `
      mutation CreateTask(
        $title: String!,
        $description: String,
        $labels: [task_labels_insert_input!]!,
        $userId: Int!
      ) {
        insert_tasks_one(object: {
          title: $title,
          description: $description,
          task_labels: { data: $labels },
          assignee_id: $userId
        }) {
          id
          title
          description
          assignee_id
          user {
            id
            first_name
            last_name
          }
        }
      }
    `,
    variables: {
      title: data.title,
      description: data.description,
      labels: taskLabelsData,
      userId: data.user
    },
  });

  return response.data.data.insert_tasks_one;
};

export const useCreateTask = () => {
  return useMutation<ITasks, Error, ITaskData>({
    mutationFn: createTaskRequest,
  })
}