import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  // fetchBaseQuery({ baseUrl: "http://localhost:5000/api" })
  tagTypes: ["USER"],
  endpoints: () => ({}),
});
