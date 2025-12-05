import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Loading from "../Pages/Loading";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    hydrateFallbackElement: <Loading></Loading>,
    children: [
        {
            index: true,
            element: <Home></Home>        
        },
        {
          path: '/login',
          element: <Login></Login> 
        },
        {
          path: "/register",
          element: <Register></Register>
        },
    ]
  },
]);
export default router;