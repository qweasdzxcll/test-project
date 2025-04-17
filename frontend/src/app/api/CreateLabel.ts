import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { IMark } from '../../widgets/CreateMark/model/types/types';

const createLabelRequest = async (data: Omit<IMark, 'id'>) => {
  const response = await axios.post(import.meta.env?.VITE_BASE_URL, {
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

export const useCreateLabel = () => {
  return useMutation<IMark, Error, Omit<IMark, 'id'>>({
    mutationFn: createLabelRequest,
  })
}