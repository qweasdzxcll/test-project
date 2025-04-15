import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../../app/constants';
import { IMark } from '../types/types';
import { IAddMarktoTask } from '../../../../entities/Task';

export const marksApi = createApi({
    reducerPath: 'marksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ['Mark'],
    endpoints: (builder) => ({
        createMark: builder.mutation<IMark, Omit<IMark, 'id'>>({
            query: (data) => ({
                url: '',
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
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
                        }
                    }
                })
            }),
            invalidatesTags: ['Mark']
        }),
        getAllMarks: builder.query<IAddMarktoTask, void>({
            query: () => ({
                url: '',
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    query: `
                        query {
                            labels {
                                id,
                                caption,
                                color
                            }
                        }
                    `
                })
            })
        })
    })
});

export const { useCreateMarkMutation, useGetAllMarksQuery } = marksApi;