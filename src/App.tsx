import './App.css'
import { Login } from './Login';
import { PageLayout } from './PageLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { Signup } from './Signup';
import { RouterProvider,createBrowserRouter,} from "react-router-dom";
import { Tasks } from './Task';
import { Settings } from './Setting';
const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/tasks/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
          element: <Tasks />,
        },
        ]
      },
      {
        path: "/users/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
          element: <Settings />,
        },
        ]
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
