import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const searchTasksRequest = async (searchTerm: string) => {
    const response = await axios.post(import.meta.env?.VITE_BASE_URL, {
        query: `
            query SearchTasks($searchTerm: String!) {
                tasks(where: {
                    title: { _ilike: $searchTerm }
                }) {
                    id
                    title
                    description
                }
            }
        `,
        variables: {
            searchTerm: `%${searchTerm}%`
        },
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.data.data.tasks
}

export const useSearchTasksRequest = () => {
    return useMutation({
        mutationFn: searchTasksRequest,
    })
}