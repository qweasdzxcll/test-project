import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchAllTasks = async () => {
  const response = await axios.post(import.meta.env?.VITE_BASE_URL, {
    query: `
      query {
        tasks {
          title
          description
          assignee_id
          created_at
          user {
            first_name
            last_name
            bio
          }
          task_labels {
            label {
              id
              caption
              color
            }
          },
        }
      }
    `,
  });
  return response.data.data.tasks
};

export const useGetAllTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchAllTasks,
  })
}