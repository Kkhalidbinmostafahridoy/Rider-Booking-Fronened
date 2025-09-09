import { useState, useEffect } from "react";
import {
  useGetDriverQuery,
  useUpdateDriverProfileMutation,
  useUpdateDriverStatusMutation,
} from "@/redux/driverApi";

interface EditProfileProps {
  driverId: string;
}

function EditDriverProfile({ driverId }: EditProfileProps) {
  // --- Fetch driver data ---
  const { data: driverData, isLoading: isFetching } =
    useGetDriverQuery(driverId);

  // --- API mutations ---
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateDriverProfileMutation();
  const [updateStatus, { isLoading: isUpdatingStatus }] =
    useUpdateDriverStatusMutation();

  // --- Local form state ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [availability, setAvailability] = useState<"online" | "offline">(
    "offline"
  );

  // --- Pre-fill form when data is fetched ---
  useEffect(() => {
    if (driverData) {
      setName(driverData.name);
      setEmail(driverData.email);
      setPhone(driverData.phone);
      setAddress(driverData.address);
      setLicenseNumber(driverData.licenseNumber);
      setVehicleMake(driverData.vehicleInfo.make);
      setVehicleModel(driverData.vehicleInfo.model);
      setPlateNumber(driverData.vehicleInfo.plateNumber);
      setAvailability(driverData.availability);
    }
  }, [driverData]);

  // --- Handlers ---
  const handleProfileUpdate = async () => {
    try {
      await updateProfile({
        _id: driverId,
        profile: {
          name,
          phone,
          address,
          vehicleInfo: { make: vehicleMake, model: vehicleModel, plateNumber },
        },
      }).unwrap();
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Profile update failed");
    }
  };

  const handleStatusToggle = async () => {
    const newStatus = availability === "online" ? "offline" : "online";
    try {
      await updateStatus({ _id: driverId, availability: newStatus }).unwrap();
      setAvailability(newStatus);
      alert(`Driver is now ${newStatus}`);
    } catch (err) {
      console.error("Status update failed:", err);
      alert("Status update failed");
    }
  };

  if (isFetching) return <p>Loading driver data...</p>;

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Edit Driver Profile</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        disabled
        className="border p-2 w-full bg-gray-100 cursor-not-allowed"
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="License Number"
        value={licenseNumber}
        onChange={(e) => setLicenseNumber(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Vehicle Make"
        value={vehicleMake}
        onChange={(e) => setVehicleMake(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Vehicle Model"
        value={vehicleModel}
        onChange={(e) => setVehicleModel(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Plate Number"
        value={plateNumber}
        onChange={(e) => setPlateNumber(e.target.value)}
        className="border p-2 w-full"
      />

      <button
        onClick={handleProfileUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        disabled={isUpdatingProfile}
      >
        {isUpdatingProfile ? "Updating..." : "Update Profile"}
      </button>

      <button
        onClick={handleStatusToggle}
        className={`px-4 py-2 rounded w-full ${
          availability === "online" ? "bg-green-500" : "bg-gray-500"
        } text-white`}
        disabled={isUpdatingStatus}
      >
        {isUpdatingStatus
          ? "Updating..."
          : availability === "online"
          ? "Go Offline"
          : "Go Online"}
      </button>
    </div>
  );
}

export default EditDriverProfile;
