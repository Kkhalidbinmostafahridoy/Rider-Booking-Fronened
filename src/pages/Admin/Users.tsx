// import { useState, useEffect } from "react";
// import { useUserBlockMutation } from "../User/userApi";

// function Users() {
//   const [triggerUserBlock, { data, isLoading, error }] = useUserBlockMutation();
//   const [userId, setUserId] = useState("");
//   const [blocked, setBlocked] = useState(false);
//   const [blockStatus, setBlockStatus] = useState(true); // true = block, false = unblock

//   const handleFetchUser = () => {
//     if (!userId.trim()) return;

//     // Send both _id and block status
//     triggerUserBlock({ _id: userId, block: blockStatus });
//   };

//   useEffect(() => {
//     if (data) {
//       console.log("User data:", data);
//       // Update blocked state based on backend response
//       // Adjust if your backend returns isActive or isBlocked
//       setBlocked(!data.isActive);
//     }
//   }, [data]);

//   return (
//     <div>
//       <h1>Fetch & Block/Unblock User</h1>

//       <input
//         type="text"
//         placeholder="Enter user ID"
//         value={userId}
//         onChange={(e) => setUserId(e.target.value)}
//         className="border p-2 mr-2"
//       />
//       <label className="mr-2">
//         <input
//           type="checkbox"
//           checked={blockStatus}
//           onChange={() => setBlockStatus(!blockStatus)}
//         />{" "}
//         Block User
//       </label>
//       <button onClick={handleFetchUser} className="p-2 bg-blue-500 text-white">
//         Submit
//       </button>

//       {isLoading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>Error updating user</p>}
//       {blocked && <p style={{ color: "red" }}>This user is blocked!</p>}
//       {data && !blocked && <pre>{JSON.stringify(data, null, 2)}</pre>}
//     </div>
//   );
// }

// export default Users;

import { useState } from "react";
import {
  useLazyFetchUserQuery,
  useToggleBlockUserMutation,
} from "../User/userApi";

function Users() {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState<{
    _id: string;
    isActive: boolean;
  } | null>(null);

  const [fetchUser, { isLoading: isFetching, error: fetchError }] =
    useLazyFetchUserQuery();
  const [toggleBlockUser, { isLoading: isUpdating, error: updateError }] =
    useToggleBlockUserMutation();

  // Fetch user by ID
  const handleFetchUser = async () => {
    if (!userId.trim()) return;

    try {
      const res: any = await fetchUser(userId).unwrap();
      setUserData(res);
    } catch (err) {
      console.error("Fetch user error:", err);
      setUserData(null);
    }
  };

  // Toggle block/unblock
  const handleToggleBlock = async () => {
    if (!userData) return;

    try {
      const res: any = await toggleBlockUser({
        _id: userId,
        block: userData.isActive,
      }).unwrap();
      setUserData(res); // update local state
    } catch (err) {
      console.error("Update block error:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Block/Unblock Management</h1>

      <input
        type="text"
        placeholder="Enter user ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={handleFetchUser}
        className="p-2 bg-blue-500 text-white mr-2"
      >
        Fetch User
      </button>

      {(isFetching || isUpdating) && <p>Loading...</p>}
      {fetchError && <p className="text-red-500">Error fetching user</p>}
      {updateError && <p className="text-red-500">Error updating status</p>}

      {userData && (
        <div className="mt-4">
          <p>
            User ID: <strong>{userData._id}</strong>
          </p>
          <p>
            Status:{" "}
            <strong
              className={userData.isActive ? "text-green-500" : "text-red-500"}
            >
              {userData.isActive ? "Active" : "Blocked"}
            </strong>
          </p>
          <button
            onClick={handleToggleBlock}
            className={`p-2 text-white mt-2 ${
              userData.isActive ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {userData.isActive ? "Block User" : "Unblock User"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Users;
