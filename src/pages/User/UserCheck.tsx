import { useState } from "react";
import { useGetUserCheckQuery, useUserUpdateMutation } from "./userApi";

const UserCheck = () => {
  const [userId, setUserId] = useState("");
  const [searchId, setSearchId] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch user by ID
  const { data, isLoading, error, refetch } = useGetUserCheckQuery(searchId, {
    skip: !searchId,
  });

  const [updateUserBlock, { isLoading: loadingBlock }] =
    useUserUpdateMutation();

  const handleSearch = () => {
    if (userId?.trim()) {
      setSearchId(userId.trim());
      setSuccessMsg("");
    }
  };

  const userData = data?.data;
  const isBlocked = userData?.isActive === "BLOCK";

  const toggleBlockStatus = async () => {
    if (!searchId) {
      alert("User ID is missing");
      return;
    }

    try {
      const newStatus = isBlocked ? "ACTIVE" : "BLOCK";
      await updateUserBlock({
        _id: userData?._id,
        isActive: newStatus,
      }).unwrap();
      refetch();
      setSuccessMsg(`User is now ${newStatus}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update user status. Make sure you are Admin.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-muted shadow-lg rounded-xl border border-muted">
      <h1 className="text-2xl font-bold mb-6 text-center">
        User Status Checker
      </h1>

      {/* Search */}
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Enter user ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          disabled={!userId.trim()}
          className={`px-4 py-2 rounded-r-lg font-semibold ${
            !userId.trim()
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Search
        </button>
      </div>

      {/* Loading / error */}
      {isLoading && <p className="text-gray-500">Loading user...</p>}
      {searchId && !isLoading && !userData && !error && (
        <p className="text-red-500 font-medium">User not found</p>
      )}

      {/* User Info */}
      {userData && (
        <div className="space-y-4">
          <p>
            <span className="font-medium">Name:</span> {userData.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {userData.email}
          </p>
          <p>
            <span className="font-medium">Role:</span> {userData.role}
          </p>
          <p>
            <span className="font-medium">Verified:</span>{" "}
            {userData.isVerified ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-medium">Status:</span> {userData.isActive}
          </p>

          {successMsg && <p className="text-blue-600">{successMsg}</p>}

          {/* Block / Active button */}
          <button
            onClick={toggleBlockStatus}
            disabled={loadingBlock}
            className={`w-full px-4 py-2 rounded-lg font-semibold text-white ${
              isBlocked
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            } ${loadingBlock ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loadingBlock ? "Updating..." : isBlocked ? "Activate" : "Block"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCheck;
