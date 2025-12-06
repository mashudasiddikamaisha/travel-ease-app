import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Loading from "../Pages/Loading";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "../Provider/PrivateRoute";
import MyBookings from "../Pages/MyBookings";
import AddVehicle from "../Pages/AddVehicle";
import MyVehicles from "../Pages/MyVehicles";
import VehicleDetails from "../Pages/VehicleDetails";
import UpdateVehicle from "../Pages/UpdateVehicle";
import AllVehicles from "../Pages/AllVehicles";

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
        {
            path: "/my-bookings",
            element: <PrivateRoute>
                <MyBookings></MyBookings>
            </PrivateRoute>
        },
        {
            path: "/add-vehicle",
            element: <PrivateRoute>
                <AddVehicle></AddVehicle>
            </PrivateRoute>
        },
        {
            path: "/my-vehicles",
            element: <PrivateRoute>
                <MyVehicles></MyVehicles>
            </PrivateRoute>
        },
        {
            path: "/vehicleDetails/:id",
            element: <PrivateRoute>
                <VehicleDetails></VehicleDetails>
            </PrivateRoute>
        },
        {
            path: "/updateVehicle/:id",
            element: <PrivateRoute>
                <UpdateVehicle></UpdateVehicle>
            </PrivateRoute>
        },
        {
            path: "/vehicles",
            element: <AllVehicles></AllVehicles>
        },
    ]
  },
]);
export default router;