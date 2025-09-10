/* eslint-disable @typescript-eslint/no-explicit-any */
// authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "ADMIN" | "DRIVER" | "RIDER" | "USER";

export interface User {
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = { user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

export interface IResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  success: boolean;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    Component: React.ComponentType<any>;
  }[];
  icon?: React.ComponentType<any>;
  isActive?: boolean;
  url: string;
  Component?: React.ComponentType<any>;
}

// export interface Ride {
//   _id: string;
//   pickupLocation: { address: string };
//   destinationLocation: { address: string };
//   fare: number;
//   status: "Pending" | "Accepted" | "Cancelled" | "Completed";
//   driverName?: string;
//   createdAt: string;
// }

// types.ts
export interface Location {
  coordinates: [number, number];
  address: string;
}

export interface Ride {
  _id: string;
  rider?: { name: string } | string;
  driver?: { name: string; vehicle: string } | string;
  pickupLocation: Location;
  destinationLocation: Location;
  paymentMethod: "cash" | "card";
  fare: number;
  status: "requested" | "accepted" | "rejected" | "completed" | "cancelled";
  createdAt: string;
}

export interface GetRidesResponse {
  rides: Ride[];
  total: number;
  page: number;
  limit: number;
}

export type TRole = "ADMIN" | "USER" | "RIDER" | "DRIVER";
