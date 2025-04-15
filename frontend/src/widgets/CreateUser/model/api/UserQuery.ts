import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../../app/constants';
import { IUser } from '../types/types';

export const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        createUser: builder.mutation<IUser, Omit<IUser, 'id'>>({
            query: (userData) => ({
                url: '',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
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
                            first_name: userData.first_name,
                            last_name: userData.last_name,
                            bio: userData.bio
                        }
                    }
                })
            }),
        }),
    })
})

export const { useCreateUserMutation } = usersApi;