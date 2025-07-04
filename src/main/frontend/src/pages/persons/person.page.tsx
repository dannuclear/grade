import { Button } from "@mui/material";
import { rqClient } from "../../shared/api/instance";

export const Component = () => {
    const response = rqClient.useQuery("get", "/api/v1/users")

    return (<>
        < div>API_BASE_URL: {import.meta.env.VITE_API_BASE_URL}</div >
        < div>BASE_URL: {import.meta.env.BASE_URL}</div >
    </>)
}