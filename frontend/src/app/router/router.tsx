import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { Tasks } from "../../pages/ListTasks";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Tasks />
            },
        ]
    },
],
    {
        basename: "/test-project"
    })