import type { Ride } from ".";

// Utility functions
const randomItem = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const randomDate = () => {
  const now = new Date();
  const past = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return new Date(
    past.getTime() + Math.random() * (now.getTime() - past.getTime())
  ).toISOString();
};

// Array of rides
export const mockRides: Ride[] = Array.from({ length: 20 }, (_, i) => {
  const pickupLocations = [
    "Banani, Dhaka",
    "Gulshan, Dhaka",
    "Mirpur, Dhaka",
    "Dhanmondi, Dhaka",
    "Uttara, Dhaka",
    "Jatrabari, Dhaka",
    "Motijheel, Dhaka",
    "Bashundhara, Dhaka",
  ];

  const destinationLocations = [
    "Gulshan, Dhaka",
    "Motijheel, Dhaka",
    "Uttara, Dhaka",
    "Bashundhara, Dhaka",
    "Banani, Dhaka",
    "Mirpur, Dhaka",
  ];

  const drivers = [
    "Rakib Hasan",
    "Tariq Ahmed",
    "Shakil Khan",
    "Rahat Hossain",
    "Imran Ali",
  ];

  const statuses: Ride["status"][] = ["Pending", "Completed", "Cancelled"];

  return {
    _id: `ride${i + 1}`,
    pickupLocation: {
      address: randomItem(pickupLocations),
      coordinates: [90 + Math.random() * 0.05, 23 + Math.random() * 0.05],
    },
    destinationLocation: {
      address: randomItem(destinationLocations),
      coordinates: [90 + Math.random() * 0.05, 23 + Math.random() * 0.05],
    },
    driverName: randomItem(drivers),
    fare: Math.floor(Math.random() * 300 + 50),
    status: randomItem(statuses),
    createdAt: randomDate(),
  };
});
