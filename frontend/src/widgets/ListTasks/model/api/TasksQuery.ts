import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../../app/constants';
import { IAddMarktoTask, ITasks, ITask } from '../../../../entities/Task/model/types/types';
import { ITaskData } from '../types/types';
import { useQuery } from '@tanstack/react-query'

/*
  Была проблема с формированием запросов, т.к до этого не работал с такими запросами
*/

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getAllTasks: builder.query<ITasks, void>({
      query: () => ({
        url: '',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
          `
        })
      }),
    }),
    createTask: builder.mutation<ITasks, ITaskData>({
      query: (data) => {
        const taskLabelsData = data.label_id.map((id) => ({ label_id: id }));
        
        return {
          url: '',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              mutation CreateTask (
                $title: String!, 
                $description: String, 
                $labels: [task_labels_insert_input!]!,
              ) {
                insert_tasks_one(object: {
                  title: $title,
                  description: $description,
                  task_labels: { data: $labels },
                }) {
                  id
                  title
                  description
                  assignee_id
                }
              }
            `,
            variables: {
              title: data.title,
              description: data.description,
              labels: taskLabelsData,
            },
          }),
        };
      },
    }),
    addMarkToTask: builder.mutation<IAddMarktoTask, { task_id: number, label_id: number }>({
      query: (data) => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            mutation AddTaskLabel {
              insert_task_labels_one(object: {
                task_id: ${data.task_id},
                label_id: ${data.label_id}
              }) {
                task {
                  title
                }
                label {
                  caption
                }
              }
            }
          `
        })
      })
    }),
    updateTask: builder.mutation<ITask, { id: number; updates: { title: string; description: string } }>({
      query: ({ id, updates }) => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            mutation UpdateTask($id: Int!, $updates: tasks_set_input!) {
              update_tasks_by_pk(
                pk_columns: { id: $id },
                _set: $updates
              ) {
                id
                title
                description
              }
            }
          `,
          variables: {
            id,
            updates: {
              title: updates.title,
              description: updates.description
            }
          }
        })
      })
    }),
    deleteTaskLabel: builder.mutation<{ affected_rows: number }, { task_id: number; label_id: number }>({
      query: ({ task_id, label_id }) => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            mutation RemoveTaskLabel($task_id: Int!, $label_id: Int!) {
              delete_task_labels(
                where: {
                  task_id: { _eq: $task_id },
                  label_id: { _eq: $label_id }
                }
              ) {
                affected_rows
              }
            }
          `,
          variables: {
            task_id,
            label_id
          }
        })
      })
    })
  })
});

export const { useGetAllTasksQuery, useCreateTaskMutation, useAddMarkToTaskMutation, useUpdateTaskMutation, useDeleteTaskLabelMutation} = tasksApi;