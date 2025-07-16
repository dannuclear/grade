import { Box, Grid } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { rqClient } from "@shared/api/instance";
import qr from 'assets/img/bot.png';

export const Component = () => {
    const { data } = rqClient.useQuery("get", "/api/v1/stats/grades")
    const preparedData = data?.map(el => {
        return {
            value: (el.value as number) ?? "",
            label: (el.label as string) ?? ""
        }
    })
    return (
        <Grid container>
            <Grid size={12}>
                < div>API_BASE_URL: {import.meta.env.VITE_API_BASE_URL}</div >
                < div>BASE_URL: {import.meta.env.BASE_URL}</div >
            </Grid>
            <Grid size={4}>
                <PieChart series={[{ data: preparedData ?? [], innerRadius: 30 }]}></PieChart>
            </Grid>
            <Grid size={4}></Grid>
            <Grid size={4}>
                <Box
                    component="img"
                    sx={{
                        height: 200,
                        width: 200,
                    }}
                    src={qr}
                />
            </Grid>
        </Grid>
    )
}