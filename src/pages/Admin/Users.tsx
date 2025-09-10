// import { useState, useEffect } from "react";
// import { useUserUpdateMutation } from "../User/userApi";

// function Users() {
//   const [triggerUserBlock, { data, isLoading, error }] =
//     useUserUpdateMutation();
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
