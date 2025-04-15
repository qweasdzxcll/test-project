import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_URL } from '../../../../app/constants'
import { IMark } from '../types/types'

const createMarkRequest = async (data: Omit<IMark, 'id'>) => {
  const response = await axios.post(BASE_URL, {
    query: `
      mutation CreateMark($object: labels_insert_input!) {
        insert_labels_one(object: $object) {
          id
          caption
          color
        }
      }
    `,
    variables: {
      object: {
        caption: data.caption,
        color: data.color,
      },
    },
  });
  return response.data.data.insert_labels_one
}

export const useCreateMark = () => {
  return useMutation<IMark, Error, Omit<IMark, 'id'>>({
    mutationFn: createMarkRequest,
  })
}