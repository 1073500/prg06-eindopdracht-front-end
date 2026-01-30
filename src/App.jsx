import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout.jsx";
import Home from "./components/Home.jsx"
import Notes from "./components/DrawingPrompts.jsx"
import Create from "./components/Create.jsx"
import Detail from "./components/Detail.jsx"
import Edit from "./components/Edit.jsx"


const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/drawingprompts",
                element: <Notes />,
            },
            {
                path: "/drawingprompts/create",
                element: <Create />,
            },

            {
                path: "/drawingprompts/:id",
                element: <Detail />,
            },

            {
                path: "/drawingprompts/:id/edit",
                element: <Edit />,
            },
        ],
    },
]);

//notes webapi data

function App() {
    return <RouterProvider router={router} />;
}

export default App;