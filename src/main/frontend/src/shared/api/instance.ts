import createFetchClient, { Middleware } from "openapi-fetch";
import createClient from "openapi-react-query";
import { ApiPaths } from "./schema";

export const fetchClient = createFetchClient<ApiPaths>({
    baseUrl: `${window.location.protocol}//${window.location.hostname}:8080`,
    //baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include"
})

const middleware: Middleware = {
    async onResponse({ response }) {
        if (response.status != 401)
            return undefined
        console.log('redirect');
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
        return undefined
    }
};
fetchClient.use(middleware)

export const rqClient = createClient(fetchClient);