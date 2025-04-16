import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_URL } from '../../../../app/constants'
import { IUser } from '../types/types'

const createUserRequest = async (data: Omit<IUser, 'id'>) => {
    const response = await axios.post(BASE_URL, {
        query: `
            mutation CreateUser($object: users_insert_input!) {
                insert_users_one(object: $object) {
                    id
                    first_name
                    last_name
                    bio
                }
            }
    `,
        variables: {
            object: {
                first_name: data.first_name,
                last_name: data.last_name,
                bio: data.bio
            }
        }
    });
    return response.data.data.insert_labels_one
}

export const useCreateUser = () => {
  return useMutation<IUser, Error, Omit<IUser, 'id'>>({
    mutationFn: createUserRequest,
  });
};