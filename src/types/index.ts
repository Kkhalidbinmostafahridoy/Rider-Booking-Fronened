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

export interface Ride {
  _id: string;
  pickupLocation: { address: string };
  destinationLocation: { address: string };
  fare: number;
  status: "Pending" | "Accepted" | "Cancelled" | "Completed";
  driverName?: string;
  createdAt: string;
}

export type TRole = "ADMIN" | "USER" | "RIDER" | "DRIVER";
