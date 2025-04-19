import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { IAddMarktoTask } from '../../entities/Task';

const addMarkToTaskRequest = async ({ task_id, label_id }: { task_id: number; label_id: number }) => {
  const response = await axios.post(import.meta.env?.VITE_BASE_URL, {
    query: `
      mutation AddTaskLabel {
        insert_task_labels_one(object: {
          task_id: ${task_id},
          label_id: ${label_id}
        }) {
          task {
            title
          }
          label {
            caption
          }
        }
      }
    `,
  });
  return response.data.data.insert_task_labels_one
};

export const useAddMarkToTask = () => {
  return useMutation<IAddMarktoTask, Error, { task_id: number; label_id: number }>({
    mutationFn: addMarkToTaskRequest,
  })
}