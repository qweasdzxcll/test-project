import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchAllLabels = async () => {
  const response = await axios.post(import.meta.env?.VITE_BASE_URL, {
    query: `
      query {
        labels {
          id
          caption
          color
        }
      }
    `,
  })
  return response.data.data.labels
}

export const useGetAllLabels = () => {
  return useQuery({
    queryKey: ['marks'],
    queryFn: fetchAllLabels,
  })
}