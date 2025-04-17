import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const deleteTaskLabelRequest = async ({ task_id, label_id }: { task_id: number; label_id: number }) => {
  const response = await axios.post(import.meta.env?.VITE_BASE_URL, {
    query: `
      mutation RemoveTaskLabel($task_id: Int!, $label_id: Int!) {
        delete_task_labels(
          where: {
            task_id: { _eq: $task_id },
            label_id: { _eq: $label_id }
          }
        ) {
          affected_rows
        }
      }
    `,
    variables: {
      task_id,
      label_id,
    },
  })
  return response.data.data.delete_task_labels
}

export const useDeleteTaskLabel = () => {
  return useMutation<{ affected_rows: number }, Error, { task_id: number; label_id: number }>({
    mutationFn: deleteTaskLabelRequest,
  })
}