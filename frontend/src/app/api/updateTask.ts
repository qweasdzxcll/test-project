import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { ITask } from '../../entities/Task'

const updateTaskRequest = async ({
  id,
  updates,
}: {
  id: number
  updates: { title: string; description: string, assignee_id: number }
}) => {
  const response = await axios.post(import.meta.env?.VITE_BASE_URL, {
    query: `
      mutation UpdateTask($id: Int!, $updates: tasks_set_input!) {
        update_tasks_by_pk(
          pk_columns: { id: $id },
          _set: $updates
        ) {
          id
          title
          description
          assignee_id
        }
      }
    `,
    variables: {
      id,
      updates: {
        title: updates.title,
        description: updates.description,
        assignee_id: updates.assignee_id
      },
    },
  });
  return response.data.data.update_tasks_by_pk;
}

export const useUpdateTask = () => {
  return useMutation<ITask, Error, { id: number; updates: { title: string; description: string, assignee_id: number } }>({
    mutationFn: updateTaskRequest,
  })
}