import { configureStore } from '@reduxjs/toolkit'
import { tasksApi } from '../../widgets/ListTasks/model/api/TasksQuery'
import { usersApi } from '../../widgets/CreateUser/model/api/UserQuery'
import { marksApi } from '../../widgets/CreateMark/model/api/MarksQuery'
export const store = configureStore({
    reducer: {
        [tasksApi.reducerPath]: tasksApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [marksApi.reducerPath]: marksApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            tasksApi.middleware,
            usersApi.middleware,
            marksApi.middleware,
        ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
