
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const API_URI = "http://localhost:8800/api";
const API_URI = import.meta.env.VITE_APP_BASE_URL

// Base Query Configuration:
const baseQuery = fetchBaseQuery({ baseUrl: API_URI + "/api" })


export const apiSlice = createApi({
    baseQuery,
    tagTypes: [],
    endpoints: (builder) => ({}),
});





// this code sets up a configuration for making API requests using the Redux Toolkit Query library.It's a common pattern used in modern React applications for managing API interactions efficiently and with minimal boilerplate code.


// export const apiSlice expalin .......................................
// The createApi function is used to create an API slice.It takes an object with various options:

// baseQuery: This specifies the base query function to use for making API requests.
//     tagTypes: This specifies any tag types to be used for caching and invalidation.In this example, it's an empty array, indicating that no tag types are used.
// endpoints: This specifies the API endpoints to be created.In this example, it's an empty function, indicating that no endpoints are defined yet.