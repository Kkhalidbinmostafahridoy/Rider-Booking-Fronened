/**
 *
 *
 *
 */

import { useState, useEffect } from "react";
import { useDriverStatusMutation } from "./DriverApi";

interface Driver {
  _id: string;
  name: string;
  vehicle: string;
  status: "online" | "offline";
}

const ActiveRiders = () => {
  const [driver, setDriver] = useState<Driver>({
    _id: "",
    name: "",
    vehicle: "",
    status: "offline",
  });

  const [updateStatus] = useDriverStatusMutation();

  // Load driver from localStorage
  useEffect(() => {
    const storedDriver = localStorage.getItem("driverProfile");
    if (storedDriver) {
      const parsed = JSON.parse(storedDriver);
      setDriver({
        _id: parsed?._id,
        name: parsed?.name,
        vehicle: `${parsed.vehicleInfo.make} ${parsed.vehicleInfo.model}`,
        status: parsed?.availability || "offline",
      });
    }
  }, []);

  const toggleAvailability = async () => {
    const newStatus = driver?.status === "online" ? "offline" : "online";
    setDriver({ ...driver, status: newStatus });

    // Update backend
    try {
      const result = await updateStatus({
        _id: driver._id,
        availability: newStatus,
      }).unwrap();

      console.log(result);

      localStorage.setItem(
        "driverProfile",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("driverProfile") || "{}"),
          availability: newStatus,
        })
      );
    } catch (err) {
      console.error("Failed to update availability", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Active Driver</h1>

      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            {driver?.name}
          </h2>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              driver?.status === "online"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {driver?.status}
          </span>
        </div>
        <p className="text-gray-600">
          Vehicle: {driver?.vehicle || "Unknown Vehicle"}
        </p>
        <button
          onClick={toggleAvailability}
          className={`mt-4 px-3 py-1 rounded text-white transition ${
            driver.status === "online"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Set {driver?.status === "online" ? "Offline" : "Online"}
        </button>
      </div>
    </div>
  );
};

export default ActiveRiders;
