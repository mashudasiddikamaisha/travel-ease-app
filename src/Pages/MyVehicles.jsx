import React, { useEffect, useState, use } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router";

const MyVehicles = () => {
  const { user } = use(AuthContext);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/vehicles?userEmail=${user.email}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setVehicles(data);
        });
    }
  }, [user]);

  const handleDeleteVehicle = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the vehicle permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/vehicles/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire("Deleted!", "Vehicle has been removed.", "success");

              const remaining = vehicles.filter((v) => v._id !== _id);
              setVehicles(remaining);
            }
          });
      }
    });
  };

  return (
    <div className="p-5 max-w-full">
      <h3 className="text-xl md:text-2xl font-bold mb-4">
        My Vehicles: {vehicles.length}
      </h3>

      {/* ----------------- TABLE (Desktop & Tablet) ----------------- */}
      <div className="hidden md:block overflow-x-auto w-full">
        <table className="table w-full min-w-[650px]">
          <thead>
            <tr>
              <th>#</th>
              <th>Vehicle</th>
              <th>Category</th>
              <th>Price/Day</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={vehicle._id}>
                <td>{index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={vehicle.coverImage} alt="vehicle" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{vehicle.vehicleName}</div>
                      <div className="text-sm opacity-50">
                        Owner: {vehicle.owner}
                      </div>
                    </div>
                  </div>
                </td>

                <td>{vehicle.category}</td>
                <td>${vehicle.pricePerDay}</td>
                <td>{vehicle.location}</td>

                <td className="flex gap-2 flex-wrap">
                  <Link to={`/vehicleDetails/${vehicle._id}`}>
                    <button className="px-6 py-2 rounded-lg font-semibold text-white bg-[#6b756a] hover:bg-[#586158] transition">
                      View
                    </button>
                  </Link>

                  <Link to={`/update-vehicle/${vehicle._id}`}>
                    <button className="px-6 py-2 rounded-lg font-semibold text-white bg-[#6b756a] hover:bg-[#586158] transition">
                      Update
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDeleteVehicle(vehicle._id)}
                    className="px-6 py-2 rounded-lg font-semibold text-white bg-[#6b756a] hover:bg-[#586158] transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ----------------- CARD VIEW (Mobile) ----------------- */}
      <div className="md:hidden space-y-4 mt-4">
        {vehicles.map((vehicle, index) => (
          <div
            key={vehicle._id}
            className="p-4 rounded-xl shadow-md bg-white border"
          >
            <div className="flex gap-3">
              <img
                src={vehicle.coverImage}
                className="w-24 h-24 rounded-lg object-cover"
                alt="vehicle"
              />

              <div className="flex flex-col justify-between">
                <h2 className="text-lg font-semibold">{vehicle.vehicleName}</h2>
                <p className="text-sm opacity-70">Owner: {vehicle.owner}</p>

                <p className="text-sm">
                  <span className="font-semibold">Category:</span>{" "}
                  {vehicle.category}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Price/Day:</span> $
                  {vehicle.pricePerDay}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Location:</span>{" "}
                  {vehicle.location}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex flex-col gap-2">
              <Link to={`/vehicleDetails/${vehicle._id}`}>
                <button className="w-full py-2 rounded-lg font-semibold text-white bg-[#6b756a] hover:bg-[#586158] transition">
                  View
                </button>
              </Link>

              <Link to={`/update-vehicle/${vehicle._id}`}>
                <button className="w-full py-2 rounded-lg font-semibold text-white bg-[#6b756a] hover:bg-[#586158] transition">
                  Update
                </button>
              </Link>

              <button
                onClick={() => handleDeleteVehicle(vehicle._id)}
                className="w-full py-2 rounded-lg font-semibold text-white bg-[#6b756a] hover:bg-[#586158] transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVehicles;
