import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_URL } from '../../../../app/constants'
import { ITasks } from '../../../../entities/Task/model/types/types'

const fetchAllTasks = async () => {
  const response = await axios.post(BASE_URL, {
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
          }
          task_labels {
            label {
              id
              caption
              color
            }
          }
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