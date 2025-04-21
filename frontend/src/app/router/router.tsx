import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { Tasks } from "../../pages/Tasks";

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