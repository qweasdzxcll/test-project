import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_URL } from '../../../../app/constants'

const fetchAllMarks = async () => {
  const response = await axios.post(BASE_URL, {
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

export const useGetAllMarks = () => {
  return useQuery({
    queryKey: ['marks'],
    queryFn: fetchAllMarks,
  })
}