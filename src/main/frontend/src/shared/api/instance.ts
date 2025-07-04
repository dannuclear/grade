import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { ApiPaths } from "./schema";

export const fetchClient = createFetchClient<ApiPaths>({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include"
})

export const rqClient = createClient(fetchClient);